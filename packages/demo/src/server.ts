import { Waku, WakuMessage, utils as wakuUtils } from "js-waku";
import { PrivateMessage, PublicKeyMessage } from "./proto/chat_message";

import { StaysFacility, StaysFacility__factory } from "../typechain"

import { BigNumber, ethers, providers, utils, Wallet } from "ethers";
import { equals } from "uint8arrays/equals";
import { TypedDataDomain } from "@ethersproject/abstract-signer";

import 'dotenv/config'
import { Ping, Pong, Ask, Bid } from "./proto/stays";
import { EIP712PongTypes } from "./utils/EIP712Types";

/**
 * Videre Engine - To see the market 🌳🦉.
 * 
 * Stays server instance
 */

// Logging
const log = console.log

// Settings
const keyIndex = process.env.SERVER_KEY_INDEX ? process.env.SERVER_KEY_INDEX : 0;
const provider = new providers.JsonRpcProvider(process.env.RPC_URL)
const wallet = ethers.Wallet.fromMnemonic(
  process.env.MNEMONIC ? process.env.MNEMONIC : "", `m/44'/60'/0'/0/${keyIndex}`).connect(provider)
let facility: string
const _location = "u173zwu5w"  // geohash
const locationMaxResolution = 5 // 5 chars prefix for geohash
const locationMinResolution = 3 // 3 chars prefix for geohash
const _dataURI = "test"

const dappName = "videre-stays"
const version = "1"

log(`Using ethereum address: ${wallet.address}`)
log(`Public key: ${wallet.publicKey}`)

let domain: TypedDataDomain

async function main() {
  // local variables
  let lastPong = 0;

  // Init
  domain = {
    name: dappName,
    version: version,
    chainId: (await provider.getNetwork()).chainId
  }
  log("EIP-712 signing domain:")
  log(domain)

  const balance = utils.formatEther(await wallet.getBalance())
  log(`Account balance: ${balance} XDAI`)

  // Setup the facility
  const registry: StaysFacility = StaysFacility__factory.connect('0x29b67856f9ca63df5e688454b17f70afd5071aa0', wallet)
  facility = await registry.callStatic.registerFacility(
    utils.keccak256(utils.toUtf8Bytes("facilityA")), 
    {active: true, dataURI: _dataURI, geohash: _location}
  )
  console.log(`Registering facility: ${facility}...`)
  const tx = await registry.registerFacility(
    utils.keccak256(utils.toUtf8Bytes("facilityA")), 
    {active: true, dataURI: _dataURI, geohash: _location}
  )
  const receipt = await tx.wait()

  if (receipt.status == 1) {
    console.log(`...Successfully registered facility ${facility} in tx ${receipt.transactionHash}`)
  }

  // now also add this wallet as a bidder
  /*const bidderRole = utils.keccak256(
    utils.solidityPack(
      [ "bytes32", "enum"], 
      [facility, BigNumber.from(2)]
    )
  )*/
  // log(`Bidder role: ${bidderRole}`)
  // log(`RPC bidder role: ${await registry.role(facility, 2)}`)
  const bidderRole = await registry.role(facility, 2)
  await registry.grantRole(bidderRole, wallet.address)

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
  waku.relay.addObserver(processIncomingPingMessage, generateTopics('ping'))

  // Process incoming 'Ask' messages
  const processIncomingAskMessage = (wakuMessage: WakuMessage) => {
    // No need to attempt to decode a message if the payload is absent
    if (!wakuMessage.payload) return;

    const msg: Ask = Ask.fromBinary(wakuMessage.payload)
    // Received an ask, so we should respond with a bid if we can
  }
  waku.relay.addObserver(processIncomingAskMessage, generateTopics('ask'))
}

/**
 * Validate that the Encryption Public Key was signed by the holder of the given Ethereum address.
 */
/*function validatePublicKeyMessage(msg: PublicKeyMessage): boolean {
  log("Attempting to validate:");
  log(msg);
  const expectedSignerAddress = msg.ethAddress;
  log("ethereum address: 0x" + wakuUtils.bytesToHex(msg.ethAddress))
  log("public key: " + wakuUtils.bytesToHex(msg.encryptionPublicKey))
  try {
    const recovered = utils.verifyTypedData(
      domain,
      {
        PublishEncryptionPublicKey: [
          { name: "message", type: "string" },
          { name: "encryptionPublicKey", type: "string" },
          { name: "ownerAddress", type: "string" },
        ]
      },
      {
        message: "By signing this message you certify that messages addressed to `ownerAddress` must be encrypted with `encryptionPublicKey`",
        encryptionPublicKey: wakuUtils.bytesToHex(msg.encryptionPublicKey),
        ownerAddress: "0x" + wakuUtils.bytesToHex(msg.ethAddress)
      },
      msg.signature
    )

    log("Recovered", recovered);
    log("ethAddress", "0x" + wakuUtils.bytesToHex(msg.ethAddress));

    return equals(utils.arrayify(recovered), msg.ethAddress)
  } catch (e: unknown) {
    console.log(e)
    return false
  }
}*/

export async function createPongMessage(
  signer: Wallet
): Promise<Pong> {
  // floor prevents future timestamped pings
  const timestamp = Math.floor(Date.now() / 1000)

  const values = {
    facilityHash: facility,
    geohash: _location,
    timestamp: timestamp
  }

  try {
    log("Asking wallet to sign PONG");
    const signature = await signer._signTypedData(domain, EIP712PongTypes, values)
    log("PONG signed");

    return {
      facilityHash: utils.arrayify(facility),
      geohash: _location,
      timestamp: BigInt(timestamp),
      signature: utils.arrayify(signature)
    };  
  } catch(e) {
    throw e
  }
}

/**
 * Return an array of topics to pass to waku
 * @param contentTopic The protocol specific topic this relates to 
 */
function generateTopics(contentTopic: string): string[] {
  const topics = []
  for (let i = locationMinResolution; i <= locationMaxResolution; i++) {
    const geohashPrefix = _location.substring(0, i)
    const newTopic = `/${dappName}/${version}/${contentTopic}/${geohashPrefix}/proto`
    console.log(`monitoring topic: ${newTopic}`)
    topics.push(newTopic)
  }
  return topics
}

function getLocationShard(contentTopic: string): string | undefined {
  const regex = /\/([\w\-]*)\/([\d]+)\/([\w\-]*)\/([\w]*)\/([\w]*)/;
  const m = contentTopic.match(regex)
  return (m ? m[4] : undefined)
}

main()