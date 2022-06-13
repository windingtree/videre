import { verifyMessage, createSignedMessage, SignedMessage } from './signing';
import * as constants from './constants';
import * as auth from './auth';
import {
  generateTopic,
  getH3ShardFromTopic,
  polyQuery,
  radiusQuery
} from './topics';
import { Timestamp } from '../proto/timestamp';
export type { SignedMessage };
export {
  verifyMessage,
  createSignedMessage,
  constants,
  auth,
  generateTopic,
  getH3ShardFromTopic,
  polyQuery,
  radiusQuery
};

export function getCurrentTimestamp(): Timestamp {
  const timeMS = Date.now();

  return {
    seconds: BigInt(Math.floor(timeMS / 1000)),
    nanos: (timeMS % 1000) * 1e6
  };
}