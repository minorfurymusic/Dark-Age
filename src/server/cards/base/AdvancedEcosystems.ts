import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';

export class AdvancedEcosystems extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.ADVANCED_ECOSYSTEMS,
      tags: [Tag.AGRICULTURA, Tag.BRUXARIA, Tag.PECUÁRIA],
      cost: 11,
      victoryPoints: 3,

      requirements: [{tag: Tag.AGRICULTURA}, {tag: Tag.PECUÁRIA}, {tag: Tag.BRUXARIA}],
      metadata: {
        description: 'Requires a plant tag, a microbe tag, and an animal tag.',
        cardNumber: '135',
      },
    });
  }
}
