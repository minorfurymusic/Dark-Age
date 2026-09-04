import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class TectonicStressPower extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.TECTONIC_STRESS_POWER,
      tags: [Tag.PODER, Tag.CONSTRUÇÃO],
      cost: 18,

      behavior: {
        production: {energy: 3},
      },
      victoryPoints: 1,

      requirements: {tag: Tag.ERUDIÇÃO, count: 2},
      metadata: {
        cardNumber: '145',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.energy(3));
        }),
        description: 'Requires 2 science tags. Increase your energy production 3 steps.',
      },
    });
  }
}
