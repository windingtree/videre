import { utils } from 'ethers';
import {
  ServiceProviderRegistry,
  ServiceProviderRegistry__factory
} from '../typechain';
import { LineRegistry } from '../typechain/LineRegistry';

export type AuthQueryPair = {
  which: string;
  who: string;
};

const AccessRoles = {
  ADMIN_ROLE: 0,
  API_ROLE: 1,
  BIDDER_ROLE: 2,
  MANAGER_ROLE: 3,
  STAFF_ROLE: 4,
  WRITE_ROLE: 5
};

/**
 * Shortcut function to determine validity of a bidder
 * @param registry to use as the source of truth
 * @param which service provider's auth store is being checked
 * @param who is asserting themselves to be a bidder
 * @returns true if who is a bidder for which service provider
 */
async function isBidder(
  registry: ServiceProviderRegistry,
  which: string,
  who: string
): Promise<boolean> {
  return registry.can(which, AccessRoles.BIDDER_ROLE, who);
}

/**
 * Shortcut function to determine validity of an API signer
 * @param registry to use as the source of truth
 * @param which service provider's auth store is being checked
 * @param who is asserting themselves to be an api
 * @returns true if who is an api signer for which service provider
 */
async function isApi(
  registry: ServiceProviderRegistry,
  which: string,
  who: string
): Promise<boolean> {
  return registry.can(which, AccessRoles.API_ROLE, who);
}

/**
 * An array / batch call equivalent of 'can'
 * @param registry to use as the source of truth
 * @param role of requested authentication
 * @param whom is requesting to be allowed
 * @returns an array of boolean determining whether whom has role
 */
async function areAuthRole(
  registry: ServiceProviderRegistry,
  role: number,
  whom: AuthQueryPair[]
): Promise<boolean[]> {
  const queries: string[] = [];
  for (const who of whom) {
    queries.push(
      ServiceProviderRegistry__factory.createInterface().encodeFunctionData(
        'can',
        [who.which, role, who.who]
      )
    );
  }

  const results = await registry.callStatic.multicall(queries);
  return results.map((v) => utils.defaultAbiCoder.decode(['bool'], v)[0]);
}

async function multiIsApi(
  registry: ServiceProviderRegistry,
  whom: AuthQueryPair[]
): Promise<boolean[]> {
  return areAuthRole(registry, AccessRoles.API_ROLE, whom);
}

async function multiIsBidder(
  registry: ServiceProviderRegistry,
  whom: AuthQueryPair[]
): Promise<boolean[]> {
  return areAuthRole(registry, AccessRoles.BIDDER_ROLE, whom);
}

/**
 * Determine if a facility / service provider agrees to be bound by the line industry implementation
 * @param registry to use as a source of truth
 * @param line industry implementation to assert agreement of terms
 * @param which service provider is being queried about agreement
 * @returns true if which service provider agrees with line terms
 */
async function agrees(
  registry: LineRegistry,
  line: string,
  which: string
): Promise<boolean> {
  return registry.can(line, which);
}

async function multiAgrees(
  registry: LineRegistry,
  line: string,
  whom: string[]
): Promise<boolean[]> {
  const results: boolean[] = [];
  for (let index = 0; index < whom.length; index++) {
    const who = whom[index];
    results.push(await registry.can(line, who));
  }
  return results;
}

export {
  AccessRoles,
  isBidder,
  isApi,
  areAuthRole,
  multiIsApi,
  multiIsBidder,
  agrees,
  multiAgrees
};
