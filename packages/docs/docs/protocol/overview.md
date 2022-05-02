---
sidebar_position: 1
title: Overview
---

This specification describes how *real-world* service providers and consumers interact using the Videre Protocol to effect an exchange of a service.

This allows any service provider to create an *industry-specific* marketplace on which to advertise their inventory in a permissionless, decentralised manner.

## Design requirements

- *Anonymity*: Consumers who are searching for inventory should not have any identifying information conveyed to the service provider.
- *Transparency*: All actors bearing witness to the exchange must be able to see clearly the terms by which services are exchanged.
- *Data ownership*: Service providers must be able to completely control their inventory. This control may be delegated.
- *Decentralised*: The protocol must be permissionless, relying on no centralised infrastructure.

## Rationale

- Anonymity as protection against an adversarial business targetting users with aggressive pricing strategies.
- Transparency allowing all in the marketplace to see the prices being offered and settled (akin to an L2 orderbook).
- Data ownership to prevent vendor lock-in and subsequent rent extraction techniques.

## Terminology

*Service provider* refers to an entity providing an **intangible** act for which another party is willing to pay for.

*Consumer* refers to the party purchasing the intangible act.

*Voucher* represents a service owed by the service provider to the consumer subject to terms.

*Messaging system* refers to the chosen protocol on which the service provider and consumer have agreed to communicate.

*Personally identifiable information* (PII) refers to any piece of data that can be used to uniquely identify a user. For example, the signature verification key, and the has of one's static IP address are unique for each user and hence count as PII.

## User stories

1. Search for providers by location.
2. Search for services by location matching specified parameters.

