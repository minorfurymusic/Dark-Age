import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';

export class TradingColony extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 18,
      tags: [Tag.MARÍTIMO],
      name: CardName.TRADING_COLONY,
      type: CardType.ACTIVE,

      behavior: {
        colonies: {
          buildColony: {},
        },
      },

      metadata: {
        cardNumber: 'C47',
        renderData: CardRenderer.builder((b) => {
          b.colonies(1).br;
          b.effect('When you attack a trade route, gain +1 resources stolen.', (eb) => {
            eb.text('attack').startEffect.text('+1');
          });
        }),
        description: 'Place a colony. When you attack a trade route, gain +1 to resources stolen.',
      },
    });
  }
}
