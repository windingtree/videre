import { TypedDataField } from '@ethersproject/abstract-signer';

export const Date: Record<string, TypedDataField[]> = {
  Date: [
    { name: 'year', type: 'uint256' },
    { name: 'month', type: 'uint256' },
    { name: 'day', type: 'uint256' }
  ]
};
