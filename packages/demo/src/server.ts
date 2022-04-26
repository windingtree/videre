import 'dotenv/config'

import { BigNumber, constants, providers, utils, Wallet } from "ethers";
import { TypedDataDomain } from "@ethersproject/abstract-signer";
import { Waku, WakuMessage } from "js-waku";

import { EIP712AskResponseTypes, EIP712BidLineTypes, EIP712PongTypes } from "./utils/EIP712Types";
import { generateTopics, getLocationShard } from "./utils/topics";
import { createSignedMessage, getWalletByMnemonicIndex } from "./utils/crypto";

import { StaysFacility, StaysFacility__factory } from "../typechain"
import { Ping, Pong, Ask, BidLine, Bid } from "./proto/stays";
import { Date as DateMsg } from "./proto/date";

/**
 * Videre Engine - To see the market 🌳🦉.
 * 
 * Server 🖥️ instance
 *
 * @author <mfw78> mfw78@protonmail.com
 */

// Logging
const log = console.log

// Settings
const KEY_INDEX = process.env.SERVER_KEY_INDEX ? process.env.SERVER_KEY_INDEX : 0;
const PROVIDER = new providers.JsonRpcProvider(process.env.RPC_URL)
const wallet = getWalletByMnemonicIndex(Number(KEY_INDEX), PROVIDER)
const evilWallet = getWalletByMnemonicIndex(Number(KEY_INDEX)*2, PROVIDER)
const REGISTRY_ADDRESS = process.env.REGISTRY_ADDRESS as string
let facilityHash: string
const _location = process.env.FACILITY_LOCATION ? process.env.FACILITY_LOCATION : "u173z"  // geohash
const _salt = utils.keccak256(utils.toUtf8Bytes(process.env.FACILITY_NAME ? process.env.FACILITY_NAME : "Testing Facility"))
const _dataURI = process.env.FACILITY_DATA_URI ? process.env.FACILITY_DATA_URI : "http://fill-me-in/"
const _facilityData = {active: true, dataURI: _dataURI, geohash: _location}

const dappName = process.env.VIDERE_DAPP_NAME ? process.env.VIDERE_DAPP_NAME : "videre"
const version = process.env.VIDERE_DAPP_VERSION ? process.env.VIDERE_DAPP_VERSION : "1"
const topicGenerator = (topic: string) => {
  return generateTopics(dappName, version, topic, [_location])
}

const spaces: string[] = []

log(`Using ethereum address: ${wallet.address}`)
log(`Public key: ${wallet.publicKey}`)

let domain: TypedDataDomain

async function main() {
  // local variables
  // TODO: handle pong flooding
  let lastPong = 0;

  // Init
  domain = {
    name: dappName,
    version: version.toString(),
    chainId: (await PROVIDER.getNetwork()).chainId,
    verifyingContract: REGISTRY_ADDRESS
  }
  log("EIP-712 signing domain:")
  log(domain)

  const balance = utils.formatEther(await wallet.getBalance())
  log(`Account balance: ${balance} XDAI`)

  // Setup the facility
  const registry: StaysFacility = StaysFacility__factory.connect(REGISTRY_ADDRESS, wallet)
  facilityHash = await registry.callStatic.registerFacility(_salt, _facilityData)
  log(`Registering facility: ${facilityHash}...`)
  const tx = await registry.registerFacility(_salt, _facilityData)
  const receipt = await tx.wait()

  if (receipt.status == 1) {
    log(`...Successfully registered facility ${facilityHash} in tx ${receipt.transactionHash}`)
  }

  // now also add this wallet as a bidder
  const bidderRole = utils.solidityKeccak256(
    [ "bytes32", "uint256" ], 
    [facilityHash, 2]
  )
  //const bidderRole = await registry.calcRole(facility, 2)
  await registry.grantRole(bidderRole, wallet.address)

  // add some spaces
  for (let i = 0; i < 5; i++) {
    const tx = await registry.registerSpace(
      facilityHash, 
      { facilityId: facilityHash, active: true, dataURI: `space${i}` }
    )
    const receipt = await tx.wait()

    if (receipt.events) {
      const args = receipt.events[0].args
      if (args) spaces.push(args[1])
    }
  }

  log(spaces)

  // watch for any `Deal` events for this facility
  registry.on(registry.filters.Deal(facilityHash), async (...vals) => {
    log(await vals[6].getTransactionReceipt())
  })

  // Connect to Waku
  log("Connecting to Waku...")
  const waku = await Waku.create({ bootstrap: { default: true } });
  await waku.waitForRemotePeer();

  log("...Connected");

  /**
   * Message processing
   */

  // Process incoming 'Ping' messages
  const processIncomingPingMessage = (wakuMessage: WakuMessage) => {
    // No need to attempt to decode a message if the payload is absent
    if (!wakuMessage.payload) return;

    const msg: Ping = Ping.fromBinary(wakuMessage.payload)

    // safe provided server only monitors conforming topics
    // TODO: refactor all subscriptions to one function and check topic.
    const locShard = getLocationShard(wakuMessage.contentTopic as string)
    log(`PING: Received in ${locShard}`)
    log(msg)

    // Received a ping, so we should respond with a pong
    createPongMessage(wallet).then((pong) => {
      const topic = `/${dappName}/${version}/pong/${locShard}/proto`
      WakuMessage.fromBytes(Pong.toBinary(pong), topic).then((pongMsg) => {
        waku.relay.send(pongMsg).then(() => {
          log(`PONG message sent to ${topic}`)
        })
      })
    })
  }
  waku.relay.addObserver(processIncomingPingMessage, topicGenerator('ping'))

  // Process incoming 'Ask' messages
  const processIncomingAskMessage = (wakuMessage: WakuMessage) => {
    // No need to attempt to decode a message if the payload is absent
    if (!wakuMessage.payload) return;

    const locShard = getLocationShard(wakuMessage.contentTopic as string) as string

    const msg: Ask = Ask.fromBinary(wakuMessage.payload)
    log('ASK: Received')
    log(msg)

    // Received an ask, so we should respond with a bid if we can
    auctioneer(msg, locShard).then((bid) => { 
      const topic = `/${dappName}/${version}/bid/${locShard}/proto`
      WakuMessage.fromBytes(Bid.toBinary(bid), topic).then((bidMsg) => {
        waku.relay.send(bidMsg).then(() => {
          log(`BID message sent to ${topic}`)
        })
      })
    })
  }
  waku.relay.addObserver(processIncomingAskMessage, topicGenerator('ask'))
}

/**
 * Auctioneer that takes an ask for a specific `shard` and possibly makes a bid.
 * @param ask what the consumer wants
 * @param shard where the consumer is
 * @returns a Bid or null if no Bid
 */
async function auctioneer(ask: Ask, shard: string): Promise<Bid> {
  const space = spaces[0]
  const TTL = (20 * 60) // default 20 mins
  const termsHash = utils.keccak256(utils.toUtf8Bytes("NO_TERMS"))
  const expiry = Math.floor(Date.now() / 1000) + TTL
  const costToken = constants.AddressZero
  const costAtoms = utils.parseEther("150")

  // reply with static bid for now
  const bidlineSignature = await signBidLine(
    wallet,
    facilityHash,
    spaces[0],
    ask,
    termsHash,
    BigNumber.from(expiry),
    costToken,
    costAtoms
  )

  const bidLine: BidLine = {
    spaceHash: utils.arrayify(space),
    termsHash: utils.arrayify(termsHash),
    expiry:{
      seconds: BigInt(expiry),
      nanos: 0
    },
    cost: {
      atoms: utils.arrayify(
        utils.defaultAbiCoder.encode(
          ["uint256"], [costAtoms]
        )
      )
    },
    signature: utils.arrayify(bidlineSignature)
  }

  // calculate a digest of the ask
  const askDigest = utils.keccak256(Ask.toBinary(ask))

  const values = {
    facilityHash: facilityHash,
    askDigest: askDigest,
    bids: [bidlineSignature].map((val) => { return { signature: val } })
  }

  const bid: Bid = await createSignedMessage<Object,Bid>(
    domain,
    EIP712AskResponseTypes,
    values,
    (signature): Bid => {
      return {
        facilityHash: utils.arrayify(facilityHash),
        askDigest: utils.arrayify(utils.keccak256(Ask.toBinary(ask))),
        bids: [
          bidLine
        ],
        signature: utils.arrayify(signature)
      }
    }, wallet
  )

  log('Generated Bid:')
  log(bid)

  return bid
}

/**
 * Sign a bid line for a corresponding ask.
 * @param signer to sign the bid with
 * @param facilityHash that this bid is from
 * @param spaceHash that this bid offers
 * @param ask the request that asked for this bid
 * @param termsHash agreed to for this bid
 * @param expiry of this bid (seconds)
 * @param costToken to pay for this bid (address zero = native token)
 * @param costAtoms the cost in `costToken` wei
 * @returns a signature that may be used to execute this deal
 */
export async function signBidLine(
  signer: Wallet,
  facilityHash: string,
  spaceHash: string,
  ask: Ask,
  termsHash: string,
  expiry: BigNumber,
  costToken: string,
  costAtoms: BigNumber
): Promise<string> {
  // calculate a digest of the ask
  const askDigest = utils.keccak256(Ask.toBinary(ask))

  const values = {
    facilityHash: facilityHash,
    spaceHash: spaceHash,
    termsHash: termsHash,
    askDigest: askDigest,
    expiry: expiry,
    costToken: costToken,
    costAtoms: costAtoms
  }

  try {
    return await signer._signTypedData(domain, EIP712BidLineTypes, values);
  } catch(e) {
    throw e
  }
}

export async function signBid(
  signer: Wallet,
  facilityHash: string,
  ask: Ask,
  bids: string[]
): Promise<string> {
  // calculate a digest of the ask
  const askDigest = utils.keccak256(Ask.toBinary(ask))

  const values = {
    facilityHash: facilityHash,
    askDigest: askDigest,
    bids: bids.map((val) => { return { signature: val } })
  }

  try {
    return await signer._signTypedData(domain, EIP712AskResponseTypes, values);
  } catch(e) {
    throw e
  }
}

/**
 * Create a `PONG` reply message and sign.
 * @param signer to be used for EIP712 signature. Must be a `bidder`
 * @returns a pong protobuf reply packet
 */
export async function createPongMessage(
  signer: Wallet
): Promise<Pong> {
    // TODO: Rate limiting on pong messages
    // floor prevents future timestamped pings
    const timestamp = Math.floor(Date.now() / 1000)

    const values = {
      facilityHash: facilityHash,
      geohash: _location,
      timestamp: timestamp
    }

    return createSignedMessage<Object,Pong>(
      domain,
      EIP712PongTypes,
      values,
      (signature): Pong => {
        return {
          facilityHash: utils.arrayify(facilityHash),
          geohash: _location,
          timestamp: {
            seconds: BigInt(timestamp),
            nanos: 0
          },
          signature: utils.arrayify(signature)
        }
      }, signer
    )
}

main()