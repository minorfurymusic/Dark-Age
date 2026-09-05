import {Tag} from '../../../common/cards/Tag';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Card} from '../Card';
import {IProjectCard} from '../IProjectCard';

export class MiningQuota extends Card implements IProjectCard {
  constructor() {
    super({
      name: CardName.MINING_QUOTA,
      type: CardType.AUTOMATED,
      tags: [Tag.CONSTRUÇÃO],
      cost: 5,

      behavior: {
        production: {steel: 2},
      },

      requirements: [{tag: Tag.COMÉRCIO}, {tag: Tag.DIPLOMACIA}, {tag: Tag.ENGENHO}],
      metadata: {
        cardNumber: '239',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.steel(2));
        }),
        description: 'Requires Venus, Earth and Jovian tags. Increase your steel production 2 steps.',
      },
    });
  }
}
