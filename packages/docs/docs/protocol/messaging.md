---
sidebar_position: 4
title: Messaging (Off-chain)
---

## Messaging System

The protocol is designed to be messaging system *agnostic*. For the quick-start and proof-of-concept implementations, the messaging system used is [*Waku*](https://waku.org/). Waku fulfills the design requirement for *anonymous, decentralised* messaging. In order to meet the design *transparency* design requirements, no attempts are made to obfuscate / encrypt data. *Authenticity* is asserted using payload signatures verified against a blockchain registry. 

## Content Topics

All clients communicating on the Videre protocol do so on *known* Waku `contentTopic`s. The specification for a `contentTopic` in Videre covers:

* `which` real-world industry the service is conducted in (eg. *stays*) for accommodation.
* A protocol `version` number to allow for graceful handling of protocol upgrades.
* `what` the specific component for the API is (eg. `ping`).
* `where` this interaction is taking place, defined by the industry implementation. For example, `stays` elects to implement this as an [`h3Index`](https://h3geo.org/), whereas aviation may elect for this to be a bytes string such as `JKF-LHR`.
* `how` the protocol is encoded, ie. `proto` for protobuf.

A complete example:

```raw
/videre/stays/1/ping/8928308280fffff/proto

which   = stays
version = 1
what    = ping
where   = 8928308280fffff
how     = proto
```

## Messages

### Discovery

**Content topics _'what'_**: ping, pong

```protobuf
message Ping {
  // timestamp when this ping was sent.
  google.protobuf.Timestamp timestamp = 1;
}

message Pong {
  // primitive serviceProvider.id
  bytes serviceProvider = 1;
  // the location where the services are provided - specified by the industry implementation
  bytes loc = 2;
  // timestamp when the pong was sent.
  google.protobuf.Timestamp timestamp = 3;
  // signature of a bidder signer for the service provider, verifiable on-chain
  bytes signature = 4;
}
```

:::warning
**DO NOT ASSUME THAT TIMESTAMPS SENT VIA THE PROTOCOL ARE TRUSTWORTHY.** 
:::

### Bid / Ask (Generic)

**Content topics _'what'_**: bid, ask

```protobuf
message AskWrapper {
  // random salt used to target bid
  bytes salt = 1;
  // the payload (ask) from the consumer to the service providers
  bytes payload = 2;
}

message BidWrapper {
  // primitive serviceProvider.id
  bytes serviceProvider = 1;
  // keccak(AskWrapper.salt & AskWrapper.payload) for response filtering
  bytes askDigest = 2;
  // the payload (bid) from the service provider to the consumer
  bytes payload = 3;
  // bidder signs hash of fields (1,2,3)
  bytes signature = 4;
}

message BidItem {
  // primitive item.id - service being offered
  bytes itemHash = 1;
}

message BidTerm {
  // primitive term.id - terms by which the service is subject to
  bytes termsHash = 1;
  // the contract address implementing ITerm
  bytes implementation = 2;
  // abi encoded payload that may be passed to a contract implementing ITerm
  optional bytes payload = 3;
}

// an optional item is an item that comes with an additional cost
message BidOptionItem {
  BidItem item = 1;
  repeated videre.type.ERC20Native cost = 2;
  // bidder signs hash of fields (1, 2, askDigest)
  bytes signature = 3;
}

// an optional term is a term that comes with an additional cost
message BidOptionTerm {
  BidTerm term = 1;
  repeated videre.type.ERC20Native cost = 2;
  // bidder signs hash of fields (1, 2, askDigest)
  bytes signature = 3;
}

message BidOptions {
  // optional items and/or terms that may be purchased
  repeated BidOptionItem items = 1;
  repeated BidOptionTerm terms = 2;
}

message BidLine {
  // the item(s) offered in a bundled state, ie. space + breakfast
  repeated BidItem items = 1;
  // the term(s) offered in a bundled state, ie. fully flexible + no cancellation
  repeated BidTerm terms = 2;
  // the option(s) offered, ie. add breakfast, add fully-flexible
  BidOptions options = 3;
  // the maximum number of times this bid authorisation can be used
  uint32 limit = 4;
  // the latest timestamp at which this bid is valid
  google.protobuf.Timestamp expiry = 5;
  // the cost in specified tokens or native unit of account
  // TODO: expand to detailed cost structure
  repeated videre.type.ERC20Native cost = 6; // include the capabilities for negative costs
  // bidder signs hash (serviceProvider.id, askDigest, items, terms, expiry, cost))
  bytes signature = 7;
}

message Bids {
  // bids that match the ask
  repeated BidLine bids = 1;
}
```

:::tip
`AskWrapper.payload` is defined as `bytes` to allow a generic, industry-agnostic bid / ask protocol to be defined. Specific ask parameters are defined in industry-specific protocol implementations of Videre.
:::

:::note
`BidWrapper.payload` is defined as `bytes` for possible future expansion to industry-specific bid replies.
:::

### Stays (Accommodation Implementation)

The quick-start / reference implementation for Videre is targetted at the accommodation industry. Here we define the ask parameters used by *consumers*.

#### Videre Protocol

* Content-topic `where` and `loc` reply: For `stays`, this is implemented as an [`h3Index`](https://h3geo.org/).

#### Messages

```protobuf
message StaysAsk {
  // the date of check-in for the stay
  google.type.Date checkIn = 1;
  // the date of check-out for the stay
  google.type.Date checkOut = 2;
  // the number of adults staying
  uint32 numPaxAdult = 3;
  // the number of children staying
  optional uint32 numPaxChild = 4;
  // the number of spaces (rooms)
  uint32 numSpacesReq = 5;
}
```
