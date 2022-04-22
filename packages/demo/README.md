# Videre Engine

## API

`dapp-name`:  		      videre-stays
`version`:  		      1
`content-topic-name`:	facilities
`encoding`:		         proto

## User stories

1. Search for facilities by location (no availability)

Options:

a. Use an indexing service like `thegraph`. This may work better for large return data
   sets, though it also assumes that the facility is still operating. How to flag a 
   facility that is no longer functional (ie. the facility ghosts the market).
   
   Could require a stake for this, and the stake gets slashed towards zero, but still
   a bad user experience for someone turning up to non-existing accommodation. Can 
   require confirmation.

b. Use a messaging system, such as `waku`. Broadcast to a topic by location geohash.
   Only facilities running the service will respond, guaranteeing "something" at the
   end of the communication chain.
   
   Query: send "PING". Returns "PONG" signed by facility signer (signer recorded onchain)
   
c. Combination of the above, getting an index from `thegraph`, but query for those that
   are online and taking bookings, ordering these towards the top.

2. Search for facilities by location (with available space between between date x - y)

This is essenially a "bid" for supplying a space for this prospective stay.

Options:

a. Use a messaging system, such as `waku`. Broadcast to a topic by location geohash.

Query sends: 

* date: checkin
* date: checkout
* number: adults
* number: children
* number: rooms

Returns:

* Array [space, cost, checkin, checkout, adults, children, rooms signed by facility
  signer, ttl, termsHash] per facility.
  
  Provided the stay is booked by TTL, the price is locked in. This does place the onus
  on the provider to monitor how many bids they have made versus the amount of inventory
  that they have.

3. Show all spaces with availability for facility (between date x - y)

Query sends:

* date: checkin
* date: checkout
* number: adults
* number: children
* number: rooms

3. Show all availability for a space (between date x - y)

facilities data:

* datetime registered
* datetime updated
* geohash






On chain:

* Facility --> Spaces

Need to enforce: WHAT IS THE STAY. The stay consists of:

* The facility (entity).
* The space (where the stay actually happens).
* Terms and conditions (refundable, transferable, etc).

facility metadata --> stored on IPFS / Swarm CID
space metadata --> stored on IPFS / Swarm CID

Off chain:

* Availability / Inventory



Stores a list of 
