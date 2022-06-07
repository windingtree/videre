import { TypedDataField } from '@ethersproject/abstract-signer';
import { Timestamp } from './timestamp';
import { pingpong } from '../proto';

export type UnsignedPong = Omit<pingpong.Pong, 'signature'>;

export const Ping: Record<string, TypedDataField[]> = {
  Ping: [{ name: 'timestamp', type: 'Timestamp' }]
};
Ping['Timestamp'] = Timestamp.Timestamp;

export const Pong: Record<string, TypedDataField[]> = {
  Pong: [
    { name: 'serviceProvider', type: 'bytes32' },
    { name: 'loc', type: 'bytes' },
    { name: 'timestamp', type: 'Timestamp' }
  ]
};
Pong['Timestamp'] = Timestamp.Timestamp;
