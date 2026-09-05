import {Tag} from '../../../common/cards/Tag';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';
import {IProjectCard} from '../IProjectCard';

export class VenusGovernor extends Card implements IProjectCard {
  constructor() {
    super({
      name: CardName.VENUS_GOVERNOR,
      type: CardType.AUTOMATED,
      tags: [Tag.COMÉRCIO, Tag.COMÉRCIO],
      cost: 4,

      requirements: {tag: Tag.COMÉRCIO, count: 2},

      behavior: {
        production: {megacredits: 2},
      },

      metadata: {
        cardNumber: '255',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(2));
        }),
        description: 'Requires 2 Venus tags. Increase your M€ production 2 steps.',
      },
    });
  }
}
