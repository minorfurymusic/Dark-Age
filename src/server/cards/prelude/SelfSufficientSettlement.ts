import {Tag} from '../../../common/cards/Tag';
import {PreludeCard} from './PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';

export class SelfSufficientSettlement extends PreludeCard implements IProjectCard {
  constructor() {
    super({
      name: CardName.SELF_SUFFICIENT_SETTLEMENT,
      tags: [Tag.CONSTRUÇÃO, Tag.FEUDO],

      behavior: {
        production: {megacredits: 2},
        city: {},
      },

      metadata: {
        cardNumber: 'P29',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(2)).city();
        }),
        description: 'Increase your M€ production 2 steps. Place a city tile.',
      },
    });
  }
}
