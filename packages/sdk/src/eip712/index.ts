import { ServiceProviderRegistry } from "../typechain"
import { constants } from "../utils"
import * as bidask from "./bidask"
import * as date from "./date"
import * as pingpong from "./pingpong"
import * as storage from "./storage"
import * as stub from "./stub"
import * as timestamp from "./timestamp"
import * as token from "./token"
export {
  bidask,
  date,
  pingpong,
  storage,
  stub,
  timestamp,
  token
}

/**
 * Check if a signatory is valid for a service provider
 * @param which service provider's signer is being validated
 * @param role that the signer should possess
 * @param who is claiming to be an authorized signer
 * @param registry holding all valid service providers to check
 * @returns true if a valid signer, false otherwise
 */
export async function validateSigner(
  which: Uint8Array,
  role: number,
  who: string,
  registry: ServiceProviderRegistry
): Promise<boolean> {
  const roles = constants.AccessRoles
  if (role != roles.API_ROLE || role != roles.BIDDER_ROLE) {
    return new Promise((resolve) => resolve(false) )
  } else {
    return await registry.can(which, constants.AccessRoles.BIDDER_ROLE, who);
  }
}
