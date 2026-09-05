import {expect} from 'chai';
import {testGame} from '../../TestGame';
import {EconomicHelp} from '../../../src/server/cards/pathfinders/EconomicHelp';
import {IGame} from '../../../src/server/IGame';
import {TestPlayer} from '../../TestPlayer';
import {Units} from '../../../src/common/Units';
import {Tag} from '../../../src/common/cards/Tag';

describe('EconomicHelp', () => {
  let card: EconomicHelp;
  let player: TestPlayer;
  let game: IGame;

  beforeEach(() => {
    card = new EconomicHelp();
    [game, player] = testGame(1, {pathfindersExpansion: true, venusNextExtension: true});
  });

  it('Play - one lowest influence tracks', () => {
    expect(player.production.asUnits()).deep.eq(Units.EMPTY);
    game.pathfindersData = {
      [Tag.COMÉRCIO]: 0,
      [Tag.DIPLOMACIA]: 1,
      [Tag.MARS]: 1,
      [Tag.ENGENHO]: 1,
      [Tag.MOON]: -1,
      vps: [],
    };

    card.play(player);

    expect(player.production.asUnits()).deep.eq(Units.of({megacredits: 1}));
    expect(game.pathfindersData).deep.eq({
      [Tag.COMÉRCIO]: 3,
      [Tag.DIPLOMACIA]: 1,
      [Tag.MARS]: 1,
      [Tag.ENGENHO]: 1,
      [Tag.MOON]: -1,
      vps: [],
    });
  });

  it('Play - two lowest influence tracks', () => {
    game.pathfindersData = {
      [Tag.COMÉRCIO]: 2,
      [Tag.DIPLOMACIA]: 1,
      [Tag.MARS]: 1,
      [Tag.ENGENHO]: 2,
      [Tag.MOON]: -1,
      vps: [],
    };

    card.play(player);

    expect(game.pathfindersData).deep.eq({
      [Tag.COMÉRCIO]: 2,
      [Tag.DIPLOMACIA]: 3,
      [Tag.MARS]: 3,
      [Tag.ENGENHO]: 2,
      [Tag.MOON]: -1,
      vps: [],
    });
  });

  it('Play - all influence tracks tied', () => {
    expect(game.pathfindersData).deep.eq({
      [Tag.COMÉRCIO]: 0,
      [Tag.DIPLOMACIA]: 0,
      [Tag.MARS]: 0,
      [Tag.ENGENHO]: 0,
      [Tag.MOON]: -1,
      vps: [],
    });

    card.play(player);

    expect(game.pathfindersData).deep.eq({
      [Tag.COMÉRCIO]: 2,
      [Tag.DIPLOMACIA]: 2,
      [Tag.MARS]: 2,
      [Tag.ENGENHO]: 2,
      [Tag.MOON]: -1,
      vps: [],
    });
  });

  it('Play - ignore maximized tracks', () => {
    game.pathfindersData = {
      [Tag.COMÉRCIO]: 17, // At the maximum
      [Tag.DIPLOMACIA]: 18, // Max is 22
      [Tag.MARS]: 17, // At the maximum
      [Tag.ENGENHO]: 14, // At the maximum
      [Tag.MOON]: -1,
      vps: [],
    };

    card.play(player);

    expect(game.pathfindersData).deep.eq({
      [Tag.COMÉRCIO]: 17,
      [Tag.DIPLOMACIA]: 21,
      [Tag.MARS]: 17,
      [Tag.ENGENHO]: 14,
      [Tag.MOON]: -1,
      vps: [],
    });
  });

  // Economic Help does not correctly raise a planetary influence track when
  // the relevant (lowest) non-completed track is higher than any other already
  // completed track. Example: A non-completed Moon track will not be raised
  // if it is higher than a completed Jovian track.
});
