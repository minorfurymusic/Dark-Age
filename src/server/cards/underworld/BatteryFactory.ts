import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {IProjectCard} from '../IProjectCard';
import {CardType} from '../../../common/cards/CardType';
import {ActionCard} from '../ActionCard';

export class BatteryFactory extends ActionCard implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.BATTERY_FACTORY,
      cost: 8,
      tags: [Tag.PODER, Tag.CONSTRUÇÃO],

      action: {
        spend: {energy: 1},
        stock: {megacredits: {tag: Tag.PODER}},
      },

      metadata: {
        cardNumber: 'U075',
        renderData: CardRenderer.builder((b) => {
          b.action('Spend 1 energy to gain 1 M€ for each power tag you have.',
            (ab) => ab.energy(1).startAction.megacredits(1).slash().tag(Tag.PODER));
        }),
      },
    });
  }
}

