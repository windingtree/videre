import { Waku, WakuMessage, utils as wakuUtils } from "js-waku";
import { PrivateMessage, PublicKeyMessage } from "./proto/chat_message";

import { StaysFacility, StaysFacility__factory } from "../typechain"

import { ethers, providers, utils, Wallet } from "ethers";
import { equals } from "uint8arrays/equals";
import { TypedDataDomain } from "@ethersproject/abstract-signer";

import 'dotenv/config'
import { Ping, Pong, Ask, Bid } from "./proto/stays";

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
const facility = utils.keccak256(utils.toUtf8Bytes("facilityA")) // TODO: pull facility details from the provider for geohash
const location = "u173zwu5w"  // geohash
const locationMaxResolution = 5 // 5 chars prefix for geohash
const locationMinResolution = 3 // 3 chars prefix for geohash

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
  const facility = await registry.callStatic.registerFacility(
    utils.keccak256(utils.toUtf8Bytes("facilityA")), 
    {active: true, dataURI: 'tesd', geohash: 'sadflkj'}
  )
  console.log(`Registering facility: ${facility}...`)
  const tx = await registry.registerFacility(
    utils.keccak256(utils.toUtf8Bytes("facilityA")), 
    {active: true, dataURI: 'test', geohash: 'sadflkj'}
  )
  const receipt = await tx.wait()

  if (receipt.status == 1) {
    console.log(`...Successfully registered facility ${facility} in tx ${receipt.transactionHash}`)
  }

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
    log('PING: Received')

    // Received a ping, so we should respond with a pong
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

  // Process incoming 'PublicKeyMessage' messages
  /*const processIncomingPublicKeyMessage = (wakuMessage: WakuMessage) => {
    // No need to attempt to decode a message if the payload is absent
    if (!wakuMessage.payload) return;

    const msg: PublicKeyMessage = PublicKeyMessage.fromBinary(wakuMessage.payload)

    console.log('PublicKeyMessage Received...')

    if (validatePublicKeyMessage(msg)) {
      const eth0xAddress = "0x" + wakuUtils.bytesToHex(msg.ethAddress)

      console.log(`${eth0xAddress} public encryption key: ${wakuUtils.bytesToHex(msg.encryptionPublicKey)}`)
      addrs.set(eth0xAddress, msg.encryptionPublicKey)
    } else {
      console.log("Failed to verify public key message")
    }
  };

  waku.relay.addObserver(processIncomingPublicKeyMessage, ["/eth-pm-wallet/1/encryption-public-key/proto"]);*/

  /*
  // Process incoming 'PrivateMessage'
  const processIncomingPrivateMessage = (wakuMessage: WakuMessage) => {
    // No need to attempt to decode a message if the payload is absent
    if (!wakuMessage.payload) return;

    const msg: PrivateMessage = PrivateMessage.fromBinary(wakuMessage.payload)

    console.log('PrivateMessage Received...')
    console.log(msg)
  };

  waku.relay.addObserver(processIncomingPrivateMessage, ["/eth-pm-wallet/1/private-message/proto"])*/

  const payload = await createPublicKeyMessage(wallet)
  const wakuMessage = await WakuMessage.fromBytes(PublicKeyMessage.toBinary(payload), "/eth-pm-wallet/1/encryption-public-key/proto");
  await waku.relay.send(wakuMessage);
}

/**
 * Validate that the Encryption Public Key was signed by the holder of the given Ethereum address.
 */
function validatePublicKeyMessage(msg: PublicKeyMessage): boolean {
  console.log("Attempting to validate:");
  console.log(msg);
  const expectedSignerAddress = msg.ethAddress;
  console.log("ethereum address: 0x" + wakuUtils.bytesToHex(msg.ethAddress))
  console.log("public key: " + wakuUtils.bytesToHex(msg.encryptionPublicKey))
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

    console.log("Recovered", recovered);
    console.log("ethAddress", "0x" + wakuUtils.bytesToHex(msg.ethAddress));

    return equals(utils.arrayify(recovered), msg.ethAddress)
  } catch (e: unknown) {
    console.log(e)
    return false
  }
}

function buildMsgParams(encryptionPublicKey: Uint8Array, fromAddress: string) {
  const domain: TypedDataDomain = {
    name: "Ethereum Private Message over Waku",
    version: "1"
  };
  const message = {
    message:
      "By signing this message you certify that messages addressed to `ownerAddress` must be encrypted with `encryptionPublicKey`",
    encryptionPublicKey: wakuUtils.bytesToHex(encryptionPublicKey),
    ownerAddress: fromAddress,
  }
  const PublishEncryptionPublicKey = [
    { name: "message", type: "string" },
    { name: "encryptionPublicKey", type: "string" },
    { name: "ownerAddress", type: "string" },
  ]
  return { domain, message, PublishEncryptionPublicKey }
}

export async function createPingMessage(
  signer: Wallet
): Promise<Ping> {
  const types = {
    Ping: 
    { name: "timestamp", type: "uint64" }
  }
}

/**
 * Sign the encryption public key with Web3. This can then be published to let other
 * users know to use this encryption public key to encrypt messages for the
 * Ethereum Address holder.
 */
export async function createPublicKeyMessage(
  signer: Wallet
): Promise<PublicKeyMessage> {

  const types = {
    PublishEncryptionPublicKey: [
      { name: "message", type: "string" },
      { name: "encryptionPublicKey", type: "string" },
      { name: "ownerAddress", type: "string" },
    ]
  }

  const values = {
    message: "By signing this message you certify that messages addressed to `ownerAddress` must be encrypted with `encryptionPublicKey`",
    encryptionPublicKey: wakuUtils.bytesToHex(utils.arrayify(signer.publicKey)),
    ownerAddress: "0x" + wakuUtils.bytesToHex(utils.arrayify(signer.address))
  }

  console.log(values)

  console.log("Asking wallet to sign Public Key Message");
  const signature = await signer._signTypedData(domain, types, values)
  console.log("Public Key Message signed");

  return {
    encryptionPublicKey: utils.arrayify(signer.publicKey),
    ethAddress: utils.arrayify(signer.address),
    signature: utils.arrayify(signature),
  };
}

/*export async function signEncryptionKey(
  encryptionPublicKey: Uint8Array,
  fromAddress: string,
  signer: Wallet
): Promise<Uint8Array> {
  const msgParams = buildMsgParams(encryptionPublicKey, fromAddress);

  const result = await signer.signMessage(msgParams)
  const result = await providerRequest({
    method: "eth_signTypedData_v4",
    params: [fromAddress, msgParams],
    from: fromAddress,
  });

  console.log("TYPED SIGNED:" + JSON.stringify(result));

  return utils.hexToBytes(result);
}*/

main()



// --- new


/**
 * Return an array of topics to pass to waku
 * @param contentTopic The protocol specific topic this relates to 
 */
function generateTopics(contentTopic: string): string[] {
  const topics = []
  for (let i = locationMinResolution; i <= locationMaxResolution; i++) {
    const geohashPrefix = location.substring(0, i)
    topics.push(`${dappName}/${version}/${contentTopic}/${geohashPrefix}/proto`)
  }
  return topics
}
