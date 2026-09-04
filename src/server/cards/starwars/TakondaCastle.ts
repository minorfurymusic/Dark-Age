import {CardType} from '../../../common/cards/CardType';
import {Tag} from '../../../common/cards/Tag';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';

export class TakondaCastle extends Card {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.TAKONDA_CASTLE,
      tags: [Tag.PODER, Tag.AGRICULTURA],
      cost: 2,

      behavior: {
        stock: {megacredits: {tag: [Tag.BRUXARIA, Tag.PECUÁRIA]}},
      },

      metadata: {
        cardNumber: 'SW07',
        renderData: CardRenderer.builder((b) => {
          b.megacredits(1).slash().tag(Tag.BRUXARIA).tag(Tag.PECUÁRIA);
        }),
        description: 'Gain 1 M€ for each of your microbe tags and animal tags.',
      },
    });
  }
}
