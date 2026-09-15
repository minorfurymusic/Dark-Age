import {Space} from './Space';
import {IPlayer} from '../IPlayer';
import {TileType} from '../../common/TileType';

/**
 * Calculates Chebyshev distance (max of absolute differences in coordinates)
 * Approximates hex grid distance for combat purposes.
 */
export function calculateDistance(from: Space, to: Space): number {
  if (from.x === -1 || from.y === -1 || to.x === -1 || to.y === -1) {
    return 999; // Invalid or off-board spaces (like colonies) can't be targeted
  }
  return Math.max(Math.abs(from.x - to.x), Math.abs(from.y - to.y));
}

/**
 * Calculates Guerrear cost to attack a feudo based on distance.
 * Adjacente (0) = 2, +1 per space distance.
 */
export function getAttackCost(distance: number): number {
  if (distance < 0 || distance === 999) return 999; // Invalid
  if (distance === 0) return 2; // Adjacente
  return Math.min(2 + distance, 6); // Max 6 Guerrear cost
}

/**
 * Checks if attacker has an Estandarte aura within 3 tiles of target.
 * Returns +1 bonus if true, 0 otherwise.
 */
export function getEstandarteAuraBonus(attacker: IPlayer, targetSpace: Space, allSpaces: ReadonlyArray<Space>): number {
  const estandartes = allSpaces.filter((space) =>
    space.tile?.tileType === TileType.ESTANDARTE && space.player === attacker);

  for (const estandarte of estandartes) {
    const distToTarget = calculateDistance(estandarte, targetSpace);
    if (distToTarget <= 3 && distToTarget !== 999) {
      return 1;
    }
  }
  return 0;
}
