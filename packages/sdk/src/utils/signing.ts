import { Wallet, utils } from "ethers";
import { TypedDataDomain, TypedDataField } from "@ethersproject/abstract-signer";

const log = console.log;

export interface SignedMessage {
  signature: Uint8Array
}

/**
 * Generics utility function for EIP712 signing of protobuf messages.
 * @param domain for EIP712 signature
 * @param types used within the data structure
 * @param msg being signed
 * @param signer of the signature
 * @returns a protobuf message with the signature placed as per callback
 */
 export async function createSignedMessage<T extends SignedMessage>(
  domain: TypedDataDomain,
  types: Record<string, TypedDataField[]>,
  msg: T,
  signer: Wallet
): Promise<T> {
  try {
    const values: Omit<T, "signature"> = msg
    const signature = await signer._signTypedData(domain, types, values);
    return {
      ...msg,
      signature: utils.arrayify(signature)
    }
  } catch(e) {
    throw e
  }
}

/**
 * Generics utility function for verifying EIP712 signing of protobuf messages.
 * @param which service provider to check on chain
 * @param domain for EIP712 signature verification
 * @param types used within the data structure
 * @param msg being verified
 * @param verifier callback function to assert truthfullness
 * @returns true if message is verified, false otherwise
 */
 export async function verifyMessage<T extends SignedMessage, U>(
  which: U, 
  domain: TypedDataDomain,
  types: Record<string, TypedDataField[]>,
  msg: T,
  verifier: (which: U, who: string) => Promise<boolean>
): Promise<boolean> {
  try {
    // get the values excluding the signature
    const values: Omit<T, "signature"> = msg
    // get the signing key
    const who = utils.verifyTypedData(domain, types, values, msg.signature)
    // now pass the signer and value to a function to verify
    return verifier(which, who)
  } catch(e) {
    log(e)
    return false
  }
}
