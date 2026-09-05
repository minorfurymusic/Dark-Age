import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {CardName} from '../../../common/cards/CardName';
import {Card} from '../Card';
import {CardRenderer} from '../render/CardRenderer';
import {SelectColony} from '../../inputs/SelectColony';

export class MarketManipulation extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 1,
      tags: [Tag.DIPLOMACIA],
      name: CardName.MARKET_MANIPULATION,
      type: CardType.EVENT,

      metadata: {
        cardNumber: 'C23',
        renderData: CardRenderer.builder((b) => {
          b.text('Attack an opponent\'s colony without consuming an action.');
        }),
        description: 'Attack a colony (or fortress) belonging to an opponent without using an action.',
      },
    });
  }

  public override bespokeCanPlay(player: IPlayer): boolean {
    return player.game.colonies.filter((c) => c.isActive).length > 0;
  }

  public override bespokePlay(player: IPlayer) {
    const activeColonies = player.game.colonies.filter((c) => c.isActive);

    if (activeColonies.length === 0) {
      player.game.log('${0} cannot attack because there are no active colonies.', (b) => b.player(player));
      return undefined;
    }

    player.defer(
      new SelectColony('Select colony to attack for free', 'Attack', activeColonies)
        .andThen((colony: any) => {
          player.game.log('${0} attacked ${1} via Manipulação do Mercado (no action cost)', (b) => b.player(player).colony(colony));
          colony.trade(player);
          return undefined;
        }),
    );

    return undefined;
  }
}
