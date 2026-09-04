import {IProjectCard} from '../IProjectCard';
import {IPlayer} from '../../IPlayer';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {isPlanetaryTag, PlanetaryTag} from '../../pathfinders/PathfindersData';
import {PathfindersExpansion} from '../../pathfinders/PathfindersExpansion';
import {Tag} from '../../../common/cards/Tag';
import {Size} from '../../../common/cards/render/Size';
import {PathfindersData} from '../../pathfinders/PathfindersData';
import {PLANETARY_TRACKS} from '@/common/pathfinders/PlanetaryTracks';

export class EconomicHelp extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.EVENT,
      name: CardName.ECONOMIC_HELP,
      cost: 9,

      behavior: {
        production: {megacredits: 1},
      },

      metadata: {
        cardNumber: 'Pf42',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(1)).nbsp.nbsp;
          b.planetaryTrack().text('3').asterix().br;
          b.tag(Tag.COMÉRCIO, {size: Size.SMALL}).or(Size.TINY)
            .tag(Tag.DIPLOMACIA, {size: Size.SMALL}).or(Size.TINY)
            .tag(Tag.MARS, {size: Size.SMALL}).or(Size.TINY)
            .tag(Tag.ENGENHO, {size: Size.SMALL}).or(Size.TINY)
            .tag(Tag.MOON, {size: Size.SMALL});
        }),
        description: 'Raise the lowest non-completed planetary influence track 3 steps. When tied, raise all lowest tracks 2 steps. ' +
         'Increase your M€ production 1 step',
      },
    });
  }

  private trackOffset(tag: PlanetaryTag, data: PathfindersData): number {
    const value = data[tag];
    const maxValue = PLANETARY_TRACKS[tag].spaces.length - 1;
    return maxValue === value ? -1 : value;
  }

  public override bespokePlay(player: IPlayer) {
    const data = player.game.pathfindersData;
    if (data === undefined) {
      return undefined;
    }
    const tags = player.game.tags.filter(isPlanetaryTag);
    const values = tags.map((tag) => this.trackOffset(tag, data));

    // Filter any maximized track.
    // Filter out -1.
    const lowest = Math.min(...(values.filter((v) => v >= 0)));
    const count = values.filter((v) => v === lowest).length;
    const increment = (count === 1) ? 3 : 2;
    if (data[Tag.DIPLOMACIA] === lowest) {
      PathfindersExpansion.raiseTrack(Tag.DIPLOMACIA, player, increment);
    }
    if (data[Tag.ENGENHO] === lowest) {
      PathfindersExpansion.raiseTrack(Tag.ENGENHO, player, increment);
    }
    if (data[Tag.MARS] === lowest) {
      PathfindersExpansion.raiseTrack(Tag.MARS, player, increment);
    }
    if (data[Tag.MOON] === lowest && player.game.gameOptions.moonExpansion === true) {
      PathfindersExpansion.raiseTrack(Tag.MOON, player, increment);
    }
    if (data[Tag.COMÉRCIO] === lowest && player.game.gameOptions.venusNextExtension === true) {
      PathfindersExpansion.raiseTrack(Tag.COMÉRCIO, player, increment);
    }
    return undefined;
  }
}
