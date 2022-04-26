import { ethers, Wallet, providers, utils } from "ethers";
import { TypedDataDomain, TypedDataField } from "@ethersproject/abstract-signer";

interface SignedMessage {
  signature: Uint8Array
}

// logging
const log = console.log;

/**
 * Get a connected wallet from a derived path on a mnemonic.
 * @param index in derivation path for private key 
 * @param provider to connect the wallet to
 * @returns A connected signing wallet
 */
export function getWalletByMnemonicIndex(index: number, provider: providers.Provider): Wallet {
  return ethers.Wallet.fromMnemonic(
    process.env.MNEMONIC ? process.env.MNEMONIC : "", `m/44'/60'/0'/0/${index}`)
    .connect(provider)
}

/**
 * Generics utility function for EIP712 signing of protobuf messages.
 * @param domain for EIP712 signature
 * @param types used within the data structure
 * @param values of data being signed
 * @param callback to construct the return message for protobuf
 * @param signer of the signature
 * @returns a protobuf message with the signature placed as per callback
 */
 export async function createSignedMessage<T, U>(
  domain: TypedDataDomain,
  types: Record<string, TypedDataField[]>,
  values: T,
  callback: (signature: string) => U,
  signer: Wallet
): Promise<U> {
  try {
    log("Asking wallet to sign...");
    const signature = await signer._signTypedData(domain, types, values);
    log("Signed");

    return callback(signature)
  } catch(e) {
    throw e
  }
}

/**
 * Generics utility function for verifying EIP712 signing of protobuf messages.
 * @param domain for EIP712 signature verification
 * @param msg being verified
 * @param types used within the data structure
 * @param values of data that was signed from a callback function
 * @param verifier callback function to assert truthfullness
 * @returns true if message is verified, false otherwise
 */
export async function verifyMessage<T extends SignedMessage>(
  domain: TypedDataDomain,
  msg: T,
  types: Record<string, TypedDataField[]>,
  values: (msg: T) => Record<string, any>,
  verifier: (signer: string) => Promise<boolean>
): Promise<boolean> {
  try {
    // get the signing key
    return await verifier(
      utils.verifyTypedData(domain, types, values(msg), msg.signature)
    )
  } catch(e) {
    log(e)
    return false
  }
}
