import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {CardName} from '../../../common/cards/CardName';
import {BuildColony} from '../../deferredActions/BuildColony';
import {Card} from '../Card';
import {CardRenderer} from '../render/CardRenderer';
import {SelectColony} from '../../inputs/SelectColony';

export class HuygensObservatory extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 27,
      tags: [Tag.ERUDIÇÃO, Tag.MARÍTIMO],
      name: CardName.HUYGENS_OBSERVATORY,
      type: CardType.AUTOMATED,
      victoryPoints: 1,

      behavior: {
        colonies: {
          buildColony: {allowDuplicates: true},
        },
        tr: 1,
      },

      metadata: {
        cardNumber: 'Pf61',
        renderData: CardRenderer.builder((b) => {
          b.colonies(1).br;
          b.effect('Then attack a trade route for free (no Guerrear cost). Gain 1 TR.', (eb) => {
            eb.text('free attack').startEffect.tr(1);
          });
        }),
        description: 'Place a colony (may duplicate). Then attack a trade route without spending Guerrear. Gain 1 TR.',
      },
    });
  }

  public override bespokePlay(player: IPlayer) {
    const game = player.game;
    const activeRoutes = game.colonies.filter((c) => c.isActive);

    if (activeRoutes.length === 0) {
      game.log('${0} cannot attack because there are no active trade routes.', (b) => b.player(player));
      return undefined;
    }

    game.defer(new BuildColony(player, {
      allowDuplicate: true,
      title: 'Select colony for Huygens Observatory',
    })).andThen(() => {
      player.defer(
        new SelectColony('Select trade route to attack (free)', 'Attack', activeRoutes)
          .andThen((colony: any) => {
            game.log('${0} attacked ${1} via Huygens Observatory (free)', (b) => b.player(player).colony(colony));
            colony.trade(player);
            return undefined;
          }),
      );
    });

    return undefined;
  }
}

