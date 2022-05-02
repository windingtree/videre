---
sidebar_position: 2
title: Process
---

## Sequence Diagram

```plantuml Your title
@startuml

title Real-world service exchange

actor Consumer as C
queue "Messaging System\n(Off-chain)" as MS
database "Blockchain <&shield>" as BC
actor "Service Provider" as SP

group Query
   C->MS : Search Criteria
   activate MS
   MS->SP : Search Criteria
   activate SP
   return Submit Offers & Options <&key>
   return Offers & Options <&key>
end

group Deal
   C->BC: Deal <&dollar> <&key>
   activate BC
   BC->BC: Transfer funds to Contract <&dollar>
   BC->BC: Create Voucher NFT
   BC-->SP: Event (Deal)
   opt#red #pink If non-refundable <&warning>
   BC->SP: Transfer funds
   end
   deactivate SP
   BC-->C: Event (Deal)
   deactivate BC
end

group Supplementary
   C->MS: Personal Data <&info> <&key>
   activate MS
   MS->SP : Personal Data <&info> <&key>
   activate SP
   return ACK <&key>
   return ACK <&key>
end

@enduml
```

## Verification

[Messages](./messaging) exchanged and [data](./storage) stored are verified using an [on-chain](./on-chain) registry of valid service providers. This registry provides:

1. Role-based authentication to verify signers for the service-provider.
2. Document timestamping for data storage.
