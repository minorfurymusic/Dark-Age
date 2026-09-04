import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';

export class VenusTradeHub extends Card implements IProjectCard {
  constructor() {
    super({
      name: CardName.VENUS_TRADE_HUB,
      cost: 12,
      tags: [Tag.COMÉRCIO, Tag.MARÍTIMO],
      type: CardType.ACTIVE,
      victoryPoints: 1,
      requirements: [{tag: Tag.COMÉRCIO, count: 2}],

      metadata: {
        cardNumber: 'P90',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you trade, gain 3 M€.', (eb) => eb.trade().startEffect.megacredits(3));
        }),
        description: 'Requires 2 Venus tags.',
      },
    });
  }
}
