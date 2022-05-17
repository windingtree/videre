import { TypedDataField } from "@ethersproject/abstract-signer";

export const ERC20Native: Record<string, TypedDataField[]> = {
  ERC20Native: [
    { name: "gem", type: "address" },
    { name: "wad", type: "uint256" }
  ]
}
