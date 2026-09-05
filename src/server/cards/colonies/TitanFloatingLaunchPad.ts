import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';
import {SelectColony} from '../../inputs/SelectColony';

export class TitanFloatingLaunchPad extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 18,
      tags: [Tag.MARÍTIMO],
      name: CardName.TITAN_FLOATING_LAUNCHPAD,
      type: CardType.ACTIVE,

      metadata: {
        cardNumber: 'C44',
        renderData: CardRenderer.builder((b) => {
          b.action('Attack a trade route for 1 Guerrear (instead of 2).', (eb) => {
            eb.text('1 Guerrear').startAction.text('attack');
          });
        }),
        description: 'Action: Attack a trade route for 1 Guerrear (reduced cost).',
      },
    });
  }

  public canAct(): boolean {
    return true;
  }

  public action(player: IPlayer) {
    const attackableRoutes = player.game.colonies.filter((c) => c.isActive);

    if (attackableRoutes.length === 0) {
      player.game.log('${0} cannot attack a route because there are no active trade routes.', (b) => b.player(player));
      return undefined;
    }

    player.defer(
      new SelectColony('Select trade route to attack', 'Attack', attackableRoutes)
        .andThen((colony: any) => {
          player.game.log('${0} attacked ${1} for 1 Guerrear via Ladrões da Estrada', (b) => b.player(player).colony(colony));
          colony.trade(player);
          return undefined;
        }),
    );

    return undefined;
  }
}
