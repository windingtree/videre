---
sidebar_position: 3
title: Primitives
---

## Data types

`serviceProvider.id`: a hash of a `salt`, and `_msgSender()`.

:::warning
`serviceProvider.id` is deterministic and thus requires hash collision protection.
:::

`item.id`: a hash of `serviceProvider.id` and `name` of the item.

`term.id`: a hash of `serviceProvider.id` and `name` of the term.

:::tip
The end-user facing explanation of what an `item` or `term` corresponds to is handled by the `ServiceProviderData` protobuf. The `URI` to find this protobuf is located in the `ServiceProviderRegistry` under the service provider. Definition of the descriptors is outside of scope for Videre, and is the job of the industry implementation.
:::

