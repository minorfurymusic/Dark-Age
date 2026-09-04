import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {CardType} from '../../../common/cards/CardType';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';

export class FriendsInHighPlaces extends Card {
  constructor() {
    super({
      name: CardName.FRIENDS_IN_HIGH_PLACES,
      type: CardType.ACTIVE,
      tags: [Tag.CRIME, Tag.DIPLOMACIA],
      cost: 10,
      requirements: [{tag: Tag.DIPLOMACIA, count: 2}],

      behavior: {
        underworld: {corruption: 1},
      },

      cardDiscount: {amount: 1},

      metadata: {
        cardNumber: 'U041',
        description: 'Requires 2 Earth tags. Gain 1 corruption.',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you play a card, you pay 1 M€ less for it.', (eb) => {
            eb.empty().startEffect.megacredits(-1);
          }).br;
          b.corruption();
        }),
      },
    });
  }
}
