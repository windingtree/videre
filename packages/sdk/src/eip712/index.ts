import { ServiceProviderRegistry } from "../typechain"
import * as bidask from "./bidask"
import * as pingpong from "./pingpong"
import * as storage from "./storage"
import * as timestamp from "./timestamp"
import * as token from "./token"
export {
  bidask,
  pingpong,
  storage,
  timestamp,
  token
}

export async function validateProvider(
  which: Uint8Array,
  who: string,
  registry: ServiceProviderRegistry
): Promise<boolean> {
  return await registry.can(which, 3, who);
}
