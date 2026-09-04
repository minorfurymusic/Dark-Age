import {PreludeCard} from '../prelude/PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';

export class CO2Reducers extends PreludeCard {
  constructor() {
    super({
      name: CardName.CO2_REDUCERS,
      tags: [Tag.BRUXARIA, Tag.COMÉRCIO],

      behavior: {
        production: {megacredits: 3},
        drawCard: {count: 2, tag: Tag.BRUXARIA},
      },

      metadata: {
        cardNumber: 'PfP03',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(3)).br;
          b.cards(2, {secondaryTag: Tag.BRUXARIA});
        }),
        description: 'Increase your M€ production 3 steps. Draw 2 cards with a microbe tag.',
      },
    });
  }
}

