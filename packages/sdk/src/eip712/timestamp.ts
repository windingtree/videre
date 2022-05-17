import { TypedDataField } from "@ethersproject/abstract-signer";

export const Timestamp: Record<string, TypedDataField[]> = {
  Timestamp: [
    { name: "seconds", type: "uint256" },
    { name: "nanos", type: "uint256" }
  ]
}
