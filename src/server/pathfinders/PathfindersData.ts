import {PlayerId} from '../../common/Types';
import {Tag} from '../../common/cards/Tag';
import {SerializedPathfindersData} from './SerializedPathfindersData';

/**
 * The possible tags with planetary tracks.
 *
 * The order of this list matches the order of the list displayed in the UI.
 */
export const PLANETARY_TAGS = [Tag.COMÉRCIO, Tag.DIPLOMACIA, Tag.MARS, Tag.ENGENHO, Tag.MOON] as const;
export type PlanetaryTag = typeof PLANETARY_TAGS[number];


export function isPlanetaryTag(tag: Tag): tag is PlanetaryTag {
  return PLANETARY_TAGS.includes(tag as PlanetaryTag);
}

export type PathfindersData = Record<PlanetaryTag, number> & {
  vps: Array<{id: PlayerId, tag: PlanetaryTag, points: number}>;
}

export namespace PathfindersData {
  export function serialize(pathfindersData: PathfindersData | undefined): SerializedPathfindersData | undefined {
    if (pathfindersData === undefined) {
      return undefined;
    }
    return {
      venus: pathfindersData[Tag.COMÉRCIO],
      earth: pathfindersData[Tag.DIPLOMACIA],
      mars: pathfindersData[Tag.MARS],
      jovian: pathfindersData[Tag.ENGENHO],
      moon: pathfindersData[Tag.MOON],
      vps: pathfindersData.vps,
    };
  }

  export function deserialize(pathfindersData: SerializedPathfindersData): PathfindersData {
    return {
      [Tag.COMÉRCIO]: pathfindersData.venus,
      [Tag.DIPLOMACIA]: pathfindersData.earth,
      [Tag.MARS]: pathfindersData.mars,
      [Tag.ENGENHO]: pathfindersData.jovian,
      [Tag.MOON]: pathfindersData.moon,
      vps: pathfindersData.vps,
    };
  }
}
