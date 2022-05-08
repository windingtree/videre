---
sidebar_position: 3
title: Primitives
---

## Data types

`serviceProvider.id`: a hash of a `salt`, and `_msgSender()`.

:::warning
`serviceProvider.id` is deterministic and thus requires hash collision protection.
:::

`item.id`: a hash of `serviceProvider.id` and `name` of the item. The explanation of what this item corresponds to is to be handled by the `SignedPayloadWrapper` in [storage](./storage).

`term.id`: a hash of `serviceProvider.id` and `name` of the term. The explanation of what this term corresponds to is to be handled by the `SignedPayloadWrapper` in [storage](./storage).

:::tip
The end-user facing explanation of what an `item` or `term` corresponds to is handled by the `SignedPayloadWrapper` protobuf. The `URI` to find this protobuf is located in the `ServiceProviderRegistry` under the service provider. Definition of the descriptors is outside of scope for Videre, and is the job of the industry implementation.
:::

