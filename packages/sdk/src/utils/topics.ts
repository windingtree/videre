import { geoToH3, kRing, polyfill } from 'h3-js';
import { constants } from '.';
import { VidereConfigTopic } from '..';

// eslint-disable-next-line no-useless-escape
const TOPIC_REGEX = /\/videre\/([\w\-]*)\/([\d]+)\/([\w\-]*)\/([\w]*)\/([\w]*)/;

/**
 * Get sharded content topics within a radius of a point
 * @param config for the videre protocol
 * @param lat latitude of geo point
 * @param lng longitude of geo point
 * @param ringSize in units that h3 understands
 * @param res resolution in units that h3 understands
 * @returns an array of content topics sharded by h3 indexes at res resolution within ringsize of lat / lng
 */
export function radiusQuery(
  config: VidereConfigTopic,
  lat: number,
  lng: number,
  ringSize?: number,
  res?: number
): string[] {
  const h3 = geoToH3(lat, lng, res || constants.DefaultH3Resolution);
  return kRing(h3, ringSize || constants.DefaultRingSize).map((h) =>
    generateTopic(config, h)
  );
}

/**
 * Get sharded content topics within a polygon
 * @param config for the videre protocol
 * @param coords of the polygon to base the shards
 * @param res resolution in units that h3 understands
 * @returns an array of content topics sharded by h3 indexes at res resolution within the polygon bounds
 */
export function polyQuery(
  config: VidereConfigTopic,
  coords: number[][],
  res?: number
): string[] {
  return polyfill(coords, res || constants.DefaultH3Resolution).map((h) =>
    generateTopic(config, h)
  );
}

/**
 * Generate a content topic with specified config
 * @param config for the videre protocol
 * @param shard h3 index
 * @returns a formatted content topic
 */
export function generateTopic(config: VidereConfigTopic, shard: string) {
  return `/videre/${config.line}/${config.version}/${config.topic}/${shard}/proto`;
}

/**
 * Get the location (h3) from the correctly formatted content topic
 * @param contentTopic to decode
 * @returns the h3 shard contained within this content topic, or undefined
 */
export function getH3ShardFromTopic(contentTopic: string): string | undefined {
  const matches = contentTopic.match(TOPIC_REGEX);
  return matches ? matches[4] : undefined;
}
