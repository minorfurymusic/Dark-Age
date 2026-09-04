import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';

export class RimFreighters extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 4,
      tags: [Tag.MARÍTIMO],
      name: CardName.RIM_FREIGHTERS,
      type: CardType.ACTIVE,

      metadata: {
        cardNumber: 'C35',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you execute a Trade Route Decree, pay 1 M€ less.', (eb) => {
            eb.text('decree').startEffect.text('−1 M€');
          });
        }),
        description: 'Whenever you execute the "Build a Trade Route" decree, reduce its cost by 1 M€.',
      },
    });
  }
}
