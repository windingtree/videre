---
sidebar_position: 6
title: Execution (On-Chain)
---

## Registries

There is a need for a *source of truth* as to what can be trusted in the Videre protocol. The registries broadly cover the areas of:

* [Industries](#industries)
* [Document Timestamps](#document-timestamps)
* [Service Providers](#service-providers)

:::tip
For initial development phase of Videre, addresses will require whitelisting so that they may register a service provider with smart-contract enforced sunset clause for the whitelisting of **180 days** (ie. after which *anyone* may register). 
:::

:::warning
Reputation based scoring / assessment is **OUTSIDE OF SCOPE** for the initial development phase of Videre. During this phase, the Videre protocol will **NOT** support terms that allow for the transfer of funds to service providers without intervention / consent of the consumer. Reputation base scoring / dispute settlement is targetted to be implemented after the cessation of the whitelist timeframe.
:::

### Lines (Industries)

This registry provides a canonical source for line-specific state transition contracts that allow for the issuance of `stubs`, and subsequent state changes.

The registry shall contain a bytes32 to address mapping for the industry-specific code (eg. "STAYS") to the implementing contract. The registry shall also contain a mapping of industry to service provider to uint256. This is to be interpreted as a `can`, essentially indcating that the service provider providers a service in the specific industry, and the industry-specific terms they agree to are governed by the implementation.

Additionally, the service provider registry shall provide a lookup function to gather the information required from service providers. This is to allow migration from a custom-rolled service provider, through to ORG.iD pending review.

Protocol fees for the specific industry are stored within this contract.

:::caution
It is a requirement that the service provider has agreed to the industry-specific terms / life-cycle. If they cease to agree, and exit the industry, no **NEW** stub issuance may take place, but old stubs and their terms remain effective.
:::

:::tip
The above method opens up the possibility to have sub-industry, or locale specific industry implementations, such as `STAYS-JP` for accommodation providers in Japan.
:::

### Service Providers

The service provider registry allows consumers to:

1. Find where to get industry-specific information about the service provider.
2. Determine who is authorised to act in what role on behalf of the service provider.
3. Determine when an authorised party was authorised, and if their authorisation is revoked, when it was revoked.

### Document Timestamps

Service providers store their information offline, saving on costly gas and allowing the system to remain storage system agnostic. In doing so, there is a need to determine the time at which a specific document was published.

The document timestamp registry allows actors on the protocol to:

1. Determine the time at which a document was created.

:::caution
Proof of ownership of the document is outside the scope of the timestamp registry.
:::

## Accounting

Accounting of funds is handled by a centralised accounting contract, similar to the `vat` system as used in MakerDAO. The actual funds are held by *joiner* contracts. This allows for the system to limit the types of collateral / tokens that may be used to pay for stubs. There are three types of accounts that may own collateral managed within the `vat`:

1. Service Providers (`bytes32`)
2. Stubs (`bytes32`)
3. Ethereum addresses (`address`)

Funds are specified in mappings such that:

1. For `bytes32` accounts: `mapping (bytes32 => mapping (address => uint256))`
2. For `address` accounts: `mapping (address => mapping (address => uint256))`

The zero address `token` MAY be implemented and represent the deployment chain's native unit of account.

:::tip
As stubs may be resold on secondary markets, any collateral attached to them should move simultaneously, therefore the stub represents an account itself.
:::

Ownership of stubs is handled through a `stub` to `address` mapping:

* `mapping (bytes32 => address)`

Similar to MakerDAO's `vat`, root administrative contracts can be attached to the `vat` to allow custom movement of funds / stub ownership. This allows for future use cases such as a ProxyContract that implements zk ownership of a stub.

Industrial lines (such as `stays`) will have an account within the `vat`. This account will be an *ethereum address* corresponding to the contract's deployment address. This allows for the system to accrue protocol fees, and to account for these fees on a *per industry basis*, allowing the case of different protocol fees depending on an industry.

## Stubs

When a service provider and consumer come to an agreement, they make a `deal`. The result of this `deal` is a *stub* (voucher) that represents a future service to be delivered by the service provider to the consumer. This future service (*items*) is subject to *terms* and carries a specified *cost*. It is the role of the line (industry) contract to implement rules defining the *lifecycle* of their issued stubs.

### Items

An `item` array, in the [primitive](./primitives) sense.

### Terms

A `term` is a business logic primitive for Videre, and may be called by either party, depending on the `term`. For example there may be a `NO_REFUND_AFTER_CHECKIN` term where upon the `consumer` checks into the accommodation facility, the `service provider` may call the term to have the whole balance of funds transferred to themselves.

Another example may be a `48HR_RAINCHECK` by which the stub may be fully refundable. The `consumer` could then call the `term` which would refund their payment provided the conditions were met.

:::caution
Careful consideration should be given to terms and the privacy implications that they may have.
:::

## Utility

These are contracts that help with usability / specific cases.

### NFT Wrapper

A `stub` holder can transfer their `stub` to the NFTWrapper which then subsequently becomes the owner of the `stub` in the `vat`, though the respective NFT `tokenId` that is issued is minted to the stub holder.

The wrapper would contain a `tokenId` to `stub` mapping, and `tokenId` to `owner` mapping. This wrapper should also proxy the `ILifeCycle` interface so that calls can just be forwarded directly from the token owner to the industry-specific life-cycle implementation.