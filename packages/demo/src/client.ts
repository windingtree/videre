import 'dotenv/config'

import { BigNumber, ethers, providers, utils, constants } from "ethers";
import { TypedDataDomain } from "@ethersproject/abstract-signer";
import { Waku, WakuMessage } from "js-waku";

import { EIP712AskResponseTypes, EIP712PongTypes } from "./utils/EIP712Types";
import { generateTopics, getLocationShard } from "./utils/topics";

import { StaysFacility, StaysFacility__factory } from "../typechain"
import { Ping, Pong, Bid, Ask } from "./proto/stays";
import { verifyMessage } from './utils/crypto';

/**
 * Videre Engine - To see the market 🌳🦉.
 * 
 * Client 👨🏾 instance
 * 
 * @author <mfw78> mfw78@protonmail.com
 */

// Logging
const log = console.log

// Settings
const keyIndex = process.env.CLIENT_KEY_INDEX ? process.env.CLIENT_KEY_INDEX : 0;
const provider = new providers.JsonRpcProvider(process.env.RPC_URL)
const wallet = ethers.Wallet.fromMnemonic(
  process.env.MNEMONIC ? process.env.MNEMONIC : "", `m/44'/60'/0'/0/${keyIndex}`).connect(provider)
const REGISTRY_ADDRESS = process.env.REGISTRY_ADDRESS as string
const registry: StaysFacility = StaysFacility__factory.connect(REGISTRY_ADDRESS, wallet)

const _location = process.env.FACILITY_LOCATION ? process.env.FACILITY_LOCATION : "u173z"  // geohash

const dappName = process.env.VIDERE_DAPP_NAME ? process.env.VIDERE_DAPP_NAME : "videre"
const version = process.env.VIDERE_DAPP_VERSION ? process.env.VIDERE_DAPP_VERSION : "1"


const topicGenerator = (topic: string) => {
  return generateTopics(dappName, version, topic, [_location])
}

log(`Using ethereum address: ${wallet.address}`)
log(`Public key: ${wallet.publicKey}`)

let domain: TypedDataDomain

async function main() {
  // local variables
  let lastPong = 0;

  // Init

  domain = {
    name: dappName,
    version: version.toString(),
    chainId: (await provider.getNetwork()).chainId,
    verifyingContract: registry.address
  }
  log("EIP-712 signing domain:")
  log(domain)

  const balance = utils.formatEther(await wallet.getBalance())
  log(`Account balance: ${balance} XDAI`)

  // Connect to Waku
  log("Connecting to Waku...")
  const waku = await Waku.create({ bootstrap: { default: true } });
  await waku.waitForRemotePeer();

  log("...Connected");

  /**
   * Message processing
   */

  // Process incoming 'Pong' messages
  const processIncomingPongMessage = (wakuMessage: WakuMessage) => {
    // No need to attempt to decode a message if the payload is absent
    if (!wakuMessage.payload) return;

    const msg: Pong = Pong.fromBinary(wakuMessage.payload)
    log('PONG: Received')
    log(msg)

    // Received a pong, authenticate it
    validatePongMessage(msg).then((isValid) => {
      if (isValid) {
        log(`PONG: Verified`)
        const locShard = getLocationShard(wakuMessage.contentTopic as string)

        // TODO: Filter out spamming Eves who are advertising despite their
        // location not being in this shard.

        // TODO: Place salt in lookup queue to filter bids

        // make a query
        const payload: Ask = {
          salt: utils.toUtf8Bytes("salty"),
          checkIn: { year: 2022, month: 4, day: 27 },
          checkOut: { year: 2022, month: 4, day: 29 },
          numPaxAdult: 2,
          numSpacesReq: 1
        }
        const topic = `/${dappName}/${version}/ask/${locShard}/proto`
        WakuMessage.fromBytes(Ask.toBinary(payload), topic).then((pongMsg) => {
          waku.relay.send(pongMsg).then(() => {
            log(`ASK message sent to ${topic}`)
          })
        })
      } else {
        log(`PONG: INVALID SIGNER`)
      }
    })
  }
  waku.relay.addObserver(processIncomingPongMessage, topicGenerator('pong'))

  // Process incoming 'Bid' messages
  const processIncomingBidMessage = (wakuMessage: WakuMessage) => {
    // No need to attempt to decode a message if the payload is absent
    if (!wakuMessage.payload) return;

    const msg: Bid = Bid.fromBinary(wakuMessage.payload)
    // Received an ask, so we should respond with a bid if we can
    // TODO: Only selectively listen to 'bid' channel afer a bid has been made
    log(msg)
    // Received a bid, authenticate it
    validateBidMessage(msg).then((isValid) => {
      if (isValid) {
        log(`BID: Verified, showing first bidline`)
        const bidline = msg.bids[0]
        log(`Facility: ${utils.hexlify(msg.facilityHash)}`)
        log(`Space: ${utils.hexlify(bidline.spaceHash)}`)
        log(`Terms: ${utils.hexlify(bidline.termsHash)}`)
        log(`AskDigest: ${utils.hexlify(msg.askDigest)}`)
        log(`costToken: ${bidline.cost!.token ? utils.hexlify(bidline.cost!.token) : constants.AddressZero}`)
        log(`costAtoms: ${utils.defaultAbiCoder.decode( ["uint256"], bidline.cost!.atoms)}`)
        const expiry = new Date(Number(bidline.expiry!.seconds) * 1000)
        log(`Expiry timestamp: ${Number(bidline.expiry!.seconds)}`)
        log(`Expiry: ${expiry}`)
      
        // let's buy it!
        registry.deal(
          {
            facilityHash: utils.hexlify(msg.facilityHash),
            spaceHash: utils.hexlify(bidline.spaceHash),
            termsHash: utils.hexlify(bidline.termsHash),
            askDigest: utils.hexlify(msg.askDigest),
            expiry: bidline.expiry!.seconds,
            costToken: bidline.cost!.token ? utils.hexlify(bidline.cost!.token) : constants.AddressZero,
            costAtoms: bidline.cost!.atoms
          },
          bidline.signature,
          {
            value: bidline.cost?.atoms
          }
        ).then((tx) => {
          tx.wait().then((receipt) => {
            log('Deal done!')
            log(receipt)
          })
        })
      } else {
        log(`BID message not verified!`)
      }
    })
  }
  waku.relay.addObserver(processIncomingBidMessage, topicGenerator('bid'))

  // First send out a Ping to get all 
  const payload: Ping = {
    timestamp: (BigNumber.from(Math.floor(Date.now() / 1000))).toBigInt()
  }
  const topic = `/${dappName}/${version}/ping/${_location.substring(0, 5)}/proto`
  log(`sending PING to: ${topic}`)
  const wakuMessage = await WakuMessage.fromBytes(Ping.toBinary(payload), topic);
  await waku.relay.send(wakuMessage);
}

async function isBidder(which: Uint8Array, who: string) {
  return await registry.isBidder(which, who);
}

async function validatePongMessage(msg: Pong): Promise<boolean> {
  return await verifyMessage(
    domain,
    msg,
    EIP712PongTypes,
    (msg: Pong) => {
      // TODO: define typescript types for EIP712 signing values
      return {
        facilityHash: msg.facilityHash,
        geohash: msg.geohash,
        timestamp: msg.timestamp?.seconds
      }
    },
    async (signer: string) => {
      return await isBidder(msg.facilityHash, signer)
    }
  )
}

async function validateBidMessage(msg: Bid): Promise<boolean> {
  // TODO: Record askDigest to monitor for and filter against spam
  return await verifyMessage(
    domain,
    msg,
    EIP712AskResponseTypes,
    (msg: Bid) => {
      // TODO: define typescript types for EIP712 signing values
      return {
        facilityHash: msg.facilityHash,
        askDigest: msg.askDigest,
        bids: msg.bids.map((bid) => { return { signature: bid.signature }})
      }
    },
    async (signer: string) => {
      return await isBidder(msg.facilityHash, signer)
    }
  )
}

main()
