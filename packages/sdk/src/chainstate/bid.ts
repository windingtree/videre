import { BigNumberish } from "ethers";
import { BidOptions, BidTerm } from "../proto/bidask";
import { ERC20Native } from "../proto/token";

export type Bid = {
  salt: Uint8Array,
  limit: BigNumberish,
  expiry: BigNumberish,
  which: Uint8Array,
  params: Uint8Array,
  items: Uint8Array[],
  terms: BidTerm[],
  options: BidOptions,
  cost: ERC20Native[]
}