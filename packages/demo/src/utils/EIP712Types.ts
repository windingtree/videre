export const EIP712PongTypes = {
  Pong: [
    { name: "facilityHash", type: "bytes" },
    { name: "geohash", type: "string" },
    { name: "timestamp", type: "uint64" }
  ]
}

export const EIP712BidTypes = {
  BidLine: [
    { name: "spaceHash", type: "bytes" },
    { name: "cost", type: "uint32" },
    { name: "termsHash", type: "bytes" },
    { name: "expiry", type: "uint64" },
    { name: "signature", type: "bytes" }
  ],
  Bid: [
    { name: "facilityHash", type: "bytes" },
    { name: "askDigest", type: "bytes" },
    { name: "bids", type: "BidLine[]" }
  ]
}