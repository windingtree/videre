import { TypedDataField } from '@ethersproject/abstract-signer';
import { ERC20Native } from './token';
import { BidTerm } from './bidask';

export const StubState: Record<string, TypedDataField[]> = {
  StubState: [
    { name: 'which', type: 'bytes32' },
    { name: 'params', type: 'bytes32' },
    { name: 'items', type: 'bytes32[]' },
    { name: 'terms', type: 'BidTerm[]' },
    { name: 'cost', type: 'ERC20Native' }
  ]
};
StubState['BidTerm'] = BidTerm.BidTerm;
StubState['ERC20Native'] = ERC20Native.ERC20Native;
