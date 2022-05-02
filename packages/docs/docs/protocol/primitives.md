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

