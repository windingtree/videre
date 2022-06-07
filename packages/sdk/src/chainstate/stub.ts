import { BidTerm } from '../proto/bidask';
import { ERC20Native } from '../proto/token';

export type StubState = {
  which: Uint8Array;
  params: Uint8Array;
  items: Uint8Array[];
  terms: BidTerm[];
  cost: ERC20Native;
};
