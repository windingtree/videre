---
sidebar_position: 5
title: Storage (Off-chain)
---

## Storage System

The protocol is designed to be storage system agnostic. For the quick-start and proof-of-concept implementations, the data storge system used is [IPFS](https://ipfs.io). IPFS meets the design requirements of *decentralised* and *data ownership*. A requirement for pinning nodes in IPFS requires further analysis to make sure that the data remains available for dapp usage.


## Generic Payloads

### Service Provider Info / Items / Terms

The initial design is for service provider data to be stored monolithically, excluding images. The payloads are generic in nature, with payloads designed to be extended by industry-specific implementations.

Each payload is placed in a `SignedPayloadWrapper`, with an authorised API signer having signed a hash of the payload which is subsequently placed in `SignedPayloadWrapper.signature`. This provides 

```protobuf
message SignedPayloadWrapper {
  // ServiceProvider.data
  bytes payload = 1;
  // signed hash of payload by ServiceProvider API signer
  bytes signature = 2;
}

message ServiceItemData {
  // primitive item.id
  bytes item = 1;
  // industry-specific payload describing item
  bytes payload = 2;
}

message ServiceTermData {
  // primitive term.id
  bytes term = 1;
  // industry-specific payload describing term
  bytes payload = 2;
  // smart contract address that implements ITerm interface
  string implementation = 3;
}

message ServiceProviderData {
  // primitive serviceProvider.id
  bytes serviceProvider = 1;
  // services (items) provided by this service provider
  repeated ServiceItemData items = 2;
  // terms that may be applicable to services provided
  repeated ServiceTermData terms = 3;
}
```

## Stays Payloads

### Accommodation Provider

```protobuf
message AccommodationProvider {
  string name = 1;
  string description = 2;
  google.type.LatLng location = 3;
}
```

### Item Info

```protobuf
message AccommodationItem {
  string name = 1;
  string description = 2;
}
```

### Terms Info

```protobuf
message AccommodationTerm {
  string name = 1;
  string description = 2;
}
```
