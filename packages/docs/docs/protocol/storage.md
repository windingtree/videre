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
  // industry-specific payload describing service provider
  bytes payload = 4;
  // signed hash by ServiceProvider `api` signer
  bytes signature = 5;
}
```

## Stays Payloads

### Accommodation Facility

```protobuf
// ServiceProviderData.payload
message Facility {
  // name of facility
  string name = 1;
  // description
  string description = 2;
  // check-in / check-out times
  Policies policies = 14;
  // service provider's URL
  string website = 5;
  // location
  google.type.LatLng location = 6;
  // photos of the entire facility (not space-specific)
  repeated videre.type.Photo photos = 7;
  // connectivity
  optional Connectivity connectivity = 21;
}
```

### Item Info

```protobuf
// an item may be something like a space (ie. queen room)
// or it may be something like 'breakfast'.
message Item {
  // name of the item. Target <50 chars for English
  string name = 1;
  // description
  string description = 2;
  // what type of item this is
  ItemType type = 3;
  // photos applicable to the item
  repeated videre.type.Photo photos = 4;
  // the payload describing the item (line specific)
  // eg. may be Space message
  optional bytes payload = 5;
}
```
