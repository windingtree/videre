import { Wallet, utils, BigNumber } from 'ethers';
import {
  TypedDataDomain,
  TypedDataField
} from '@ethersproject/abstract-signer';
import { eip712 } from '..';
import { BidLine, BidOptions, BidTerm } from '../proto/bidask';

export interface SignedMessage {
  signature: Uint8Array;
}

/**
 * Generics utility function for EIP712 signing of protobuf messages.
 * @dev This method will throw if the EIP-712 signing fails
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
  const values: Omit<T, 'signature'> = msg;
  const signature = await signer._signTypedData(domain, types, values);
  return {
    ...msg,
    signature: utils.arrayify(signature)
  };
}

/**
 * Generics utility function for verifying EIP712 signing of protobuf messages.
 * @dev This method will eat the potential throw from `verifyTypedData`
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
    const values: Omit<T, 'signature'> = msg;
    // get the signing key
    const who = utils.verifyTypedData(domain, types, values, msg.signature);
    // now pass the signer and value to a function to verify
    return verifier(which, who);
  } catch (e) {
    return false;
  }
}

/**
 * Create a BidLine message to convey a signed Bid
 * @dev This method will throw if the EIP-712 signing fails
 * @param domain The EIP-712 signing domain for the industry in which the bid is being made
 * @param wallet that signs the bid
 * @param salt from the `AskWrapper`
 * @param which service provider this bid is being signed for
 * @param params as a hashstruct of the Ask
 * @param items that this bid is offering
 * @param terms that this bid is offering
 * @param options that this bid is offering
 * @param limit number of times that this bid may be dealt
 * @param expiry in unix epoch at which this bid becomes invalid
 * @param gem the ERC20 token that this bid must be paid with if dealt
 * @param wad the amount in atomic units of the ERC20 token that must pay for this bid
 * @returns a signed BidLine
 */
export async function createBidLine(
  domain: TypedDataDomain,
  wallet: Wallet,
  salt: string,
  which: string,
  params: string,
  items: string[],
  terms: BidTerm[],
  options: BidOptions,
  limit: number,
  expiry: number,
  gem: string,
  wad: BigNumber
): Promise<BidLine> {
  return {
    limit: limit,
    expiry: expiry,
    items: items.map(v => utils.arrayify(v)),
    terms: terms,
    options: options,
    cost: [
      {
        gem: gem,
        wad: wad.toString()
      }
    ],
    signature: utils.arrayify(
      await wallet._signTypedData(domain, eip712.bidask.Bid, {
        salt: salt,
        limit: limit,
        expiry: expiry,
        which: which,
        params: params,
        items: items,
        terms: terms,
        options: options,
        cost: [
          {
            gem: gem,
            wad: wad
          }
        ]
      })
    )
  };
}
