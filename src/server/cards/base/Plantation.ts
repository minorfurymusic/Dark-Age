import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class Plantation extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.PLANTATION,
      tags: [Tag.AGRICULTURA],
      cost: 15,

      behavior: {
        greenery: {},
      },

      requirements: {tag: Tag.ERUDIÇÃO, count: 2},
      metadata: {
        cardNumber: '193',
        renderData: CardRenderer.builder((b) => {
          b.greenery();
        }),
        description: 'Requires 2 science tags. Place a greenery tile and raise oxygen 1 step.',
      },
    });
  }
}
