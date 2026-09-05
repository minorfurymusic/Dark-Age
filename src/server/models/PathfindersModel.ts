import {PathfindersModel} from '../../common/models/PathfindersModel';
import {IGame} from '../IGame';
import {Tag} from '../../common/cards/Tag';

export function createPathfindersModel(game: IGame): PathfindersModel | undefined {
  if (game.pathfindersData === undefined) {
    return undefined;
  }
  const pathfindersData = game.pathfindersData;
  return {
    venus: pathfindersData[Tag.COMÉRCIO],
    earth: pathfindersData[Tag.DIPLOMACIA],
    mars: pathfindersData[Tag.MARS],
    jovian: pathfindersData[Tag.ENGENHO],
    moon: pathfindersData[Tag.MOON],
  };
}
