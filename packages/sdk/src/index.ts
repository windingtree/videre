import * as chainstate from './chainstate';
import * as eip712 from './eip712';
import * as utils from './utils';

export type Topics = 'bid' | 'ask' | 'ping' | 'pong';

export interface VidereConfig {
  line: string;
  version: number;
}

export interface VidereTopic {
  topic: Topics;
}

export type VidereConfigTopic = VidereConfig & VidereTopic;

export { chainstate, eip712, utils };
