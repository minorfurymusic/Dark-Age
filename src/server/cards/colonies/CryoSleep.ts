import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {Card} from '../Card';
import {CardRenderer} from '../render/CardRenderer';

export class CryoSleep extends Card implements IProjectCard {
  constructor() {
    super({
      cost: 10,
      tags: [Tag.ERUDIÇÃO],
      name: CardName.CRYO_SLEEP,
      type: CardType.ACTIVE,
      victoryPoints: 1,

      metadata: {
        cardNumber: 'C07',
        renderData: CardRenderer.builder((b) => {
          b.effect('Your trade routes gain +1 defense against attacks.', (be) => {
            be.text('route defense').startEffect.text('+1');
          });
        }),
        description: 'Trade routes you control gain +1 defense against attacks.',
      },
    });
  }
}
