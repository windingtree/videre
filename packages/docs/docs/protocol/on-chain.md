---
sidebar_position: 6
title: Execution (On-Chain)
---

## Registries

There is a need for a *source of truth* for what can be trusted in the Videre protocol. The registries broadly cover the areas of of *authorised signers* and *document timestamps*.

:::tip
For initial development of Videre, addresses will require whitelisting so that they may register a service provider. There will be a hard limit set of 6 months at which the whitelist requirement will automatically be cancelled.
:::

:::warning
The system currently does **NOT** provide reputation based scoring, or other information that may assist a consumer in determining a service provider's trustworthiness. As raised in [process](./process) documentation, the Videre protocol will **NOT** initially support immediate transfer of funds to service providers without intervention / consent from the consumer.
:::

### Industries

This registry provides a canonical source for industry-specific state transition contracts that allow for the issuance of vouchers, and subsequent state changes. 

The registry shall contain a bytes32 to address mapping for the industry-specific code (eg. "STAYS") to the implementing contract. The registry shall also contain a mapping of industry to service provider to uint256. This is to be interpreted as a `can`, essentially indcating that the service provider providers a service in the specific industry, and the industry-specific terms they agree to are governed by the implementation.

Additionally, the service provider registry shall provide a lookup function to gather the information required from service providers. This is to allow migration from a custom-rolled service provider, through to ORG.iD pending review.

:::caution
It is a requirement that the service provider has agreed to the industry-specific terms / life-cycle. If they cease to agree, and exit the industry, no **NEW** voucher issuance may take place, but old vouchers and their terms remain effective.
:::

:::tip
The above method opens up the possibility to have sub-industry, or locale specific industry implementations, such as `STAYS-JP` for accommodation providers in Japan.
:::

### Service Providers

The service provider registry allows consumers to:

1. Find where to get industry-specific information about the service provider.
2. Determine who is authorised to act in what role on behalf of the service provider.
3. Determine when an authorised party was authorised, and if their authorisation is revoked, when that was revoked.

### Document Timestamps

Service providers store their information offline, saving on costly gas and allowing the system to remain storage system agnostic. In doing so, there is a need to determine the time at which a specific document was published.

The document timestamp registry allows actors on the protocol to:

1. Determine the time at which a document was created.

:::caution
Proof of ownership of the document is outside the scope of the timestamp registry.
:::

## Accounting

Accounting of funds is handled by a centralised accounting contract, similar to the `vat` system as used in MakerDAO. The actual funds are held by *joiner* contracts. This allows for the system to limit the types of collateral / tokens that may be used to pay for vouchers. There are three types of accounts that own funds in Videre's `vat`:

1. Service providers
2. Vouchers
3. The protocol

Funds are specified in a mapping of `address` to `token` to `balance`. The address zero `token` may be implemented and represent the native unit of account. 

:::tip
As vouchers may be resold on secondary markets, any monetary value that is attached to them should be accounted by voucher. 
:::

Ownership of vouchers is handled through a `voucher` to `address` mapping.

Similar to MakerDAO's `vat`, root administrative contracts can be attached to the `vat` to allow movement of funds and voucher ownership. This allows for future use cases such as a ProxyContract that implements zk ownership of a voucher.

Also, similar to MakerDAO's `vat` contract, the system itself will have an account in this contract, and it's at this account where the system will accrue any protocol fees.

Additionally, the protocol fee is to be specified in this contract in basis points on a public variable.

## State Transition

Every voucher issued follows a defined life-cycle, the simplest being a ticket to an event which is either `issued`, or `clipped`. It is the job of industry contracts to implement the `ILifeCycle` interface to define the industry-specific life-cycle rules for vouchers.

### Terms

A `term` is a business logic primitive for Videre, and may be called by either party, depending on the `term`. For example there may be a `NO_REFUND_AFTER_CHECKIN` term where upon the `consumer` checks into the accommodation facility, the `service provider` may call the term to have the whole balance of funds transferred to themselves.

Another example may be a `48HR_RAINCHECK` by which the voucher may be fully refundable. The `consumer` could then call the `term` which would refund their payment provided the conditions were met.

:::caution
Careful consideration should be given to terms and the privacy implications that they may have.
:::

## Utility

These are contracts that help with usability / specific cases.

### NFT Wrapper

A `voucher` holder can transfer their `voucher` to the NFTWrapper which then subsequently becomes the owner of the `voucher` in the `vat`, though the respective NFT `tokenId` that is issued is minted to the voucher holder.

The wrapper would contain a `tokenId` to `voucher` mapping, and `tokenId` to `owner` mapping. This wrapper should also proxy the `ILifeCycle` interface so that calls can just be forwarded directly from the token owner to the industry-specific life-cycle implementation.