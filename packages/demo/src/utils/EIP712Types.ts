// Use to derive the signature for the Pong protobuf
export const EIP712PongTypes = {
  Pong: [
    { name: "facilityHash", type: "bytes32" },
    { name: "geohash", type: "string" },
    { name: "timestamp", type: "uint64" }
  ]
}

// Use to derive the signature of respective bidlines
export const EIP712BidLineTypes = {
  Bid: [
    { name: "facilityHash", type: "bytes32" },
    { name: "spaceHash", type: "bytes32" },
    { name: "askDigest", type: "bytes32" },
    { name: "termsHash", type: "bytes32" },
    { name: "expiry", type: "uint64" },
    { name: "costToken", type: "address" },
    { name: "costAtoms", type: "uint256" }
  ]
}

// Use to derive the signature for Bid protobuf
export const EIP712AskResponseTypes = {
  BidLine: [
    { name: "signature", type: "bytes" }  // signature of EIP712BidLineTypes
  ],
  Bid: [
    { name: "facilityHash", type: "bytes32" },
    { name: "askDigest", type: "bytes32" },
    { name: "bids", type: "BidLine[]" }
  ]
}
