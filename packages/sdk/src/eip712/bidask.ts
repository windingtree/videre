import { TypedDataField } from "@ethersproject/abstract-signer";
import { ERC20Native } from "./token"
import { bidask } from "../proto";

export type UnsignedBidWrapper = Omit<bidask.BidWrapper, "signature">
export type UnsignedBidOptionItem = Omit<bidask.BidOptionItem, "signature">
export type UnsignedBidOptionTerm = Omit<bidask.BidOptionTerm, "signature">
export type UnsignedBidLine = Omit<bidask.BidLine, "signature">

export const AskWrapper: Record<string, TypedDataField[]> = {
  AskWrapper: [
    { name: "salt", type: "bytes32" },
    { name: "payload", type: "bytes" }
  ]
}

export const BidWrapper: Record<string, TypedDataField[]> = {
  BidWrapper: [
    { name: "serviceProvider", type: "bytes32" },
    { name: "askDigest", type: "bytes32" },
    { name: "payload", type: "bytes" }
  ]
}

export const BidTerm: Record<string, TypedDataField[]> = {
  BidTerm: [
    { name: "term", type: "bytes32" },
    { name: "impl", type: "address" },
    { name: "txPayload", type: "bytes" }
  ]
}

export const BidOptionItem: Record<string, TypedDataField[]> = {
  BidOptionItem: [
    { name: "item", type: "bytes32" },
    { name: "cost", type: "ERC20Native[]" }
  ]
}
BidOptionItem["ERC20Native"] = ERC20Native.ERC20Native

export const BidOptionTerm: Record<string, TypedDataField[]> = {
  BidOptionTerm: [
    { name: "term", type: "BidTerm" },
    { name: "cost", type: "ERC20Native[]" }
  ]
}
BidOptionTerm["ERC20Native"] = ERC20Native.ERC20Native

export const BidOptions: Record<string, TypedDataField[]> = {
  BidOptions: [
    { name: "items", type: "BidOptionItem[]" },
    { name: "terms", type: "BidOptionTerm[]" }
  ]
}
BidOptions["BidOptionItem"] = BidOptionItem.BidOptionItem
BidOptions["BidOptionTerm"] = BidOptionTerm.BidOptionTerm

export const Bid: Record<string, TypedDataField[]> = {
  Bid: [
    { name: "salt", type: "bytes32" },
    { name: "limit", type: "uint128" },
    { name: "expiry", type: "uint128" },
    { name: "which", type: "bytes32" },
    { name: "params", type: "bytes32" },
    { name: "items", type: "bytes32[]" },
    { name: "terms", type: "BidTerm[]" },
    { name: "options", type: "BidOptions" },
    { name: "cost", type: "ERC20Native[]" }
  ]
}
Bid["BidTerm"] = BidTerm.BidTerm
Bid["BidOptionItem"] = BidOptionItem.BidOptionItem
Bid["BidOptionTerm"] = BidOptionTerm.BidOptionTerm
Bid["BidOptions"] = BidOptions.BidOptions
Bid["ERC20Native"] = ERC20Native.ERC20Native

export const BidLine: Record<string, TypedDataField[]> = {
  BidLine: [
    { name: "items", type: "bytes32[]" },
    { name: "terms", type: "BidTerm[]" },
    { name: "options", type: "BidOptions" },
    { name: "limit", type: "uint128" },
    { name: "expiry", type: "uint128" },
    { name: "cost", type: "ERC20Native[]" },
    { name: "signature", type: "bytes" }
  ]
}
BidLine["BidTerm"] = BidTerm.BidTerm
BidLine["BidOptionItem"] = BidOptionItem.BidOptionItem
BidLine["BidOptionTerm"] = BidOptionTerm.BidOptionTerm
BidLine["BidOptions"] = BidOptions.BidOptions
BidLine["ERC20Native"] = ERC20Native.ERC20Native

export const Bids: Record<string, TypedDataField[]> = {
  Bids: [
    { name: "bids", type: "BidLine[]" }
  ]
}
Bids["BidLine"] = BidLine.BidLine
Bids["BidTerm"] = BidTerm.BidTerm
Bids["BidOptionItem"] = BidOptionItem.BidOptionItem
Bids["BidOptionTerm"] = BidOptionTerm.BidOptionTerm
Bids["BidOptions"] = BidOptions.BidOptions
Bids["ERC20Native"] = ERC20Native.ERC20Native