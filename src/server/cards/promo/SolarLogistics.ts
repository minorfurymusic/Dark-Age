import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {all} from '../Options';
import {IProjectCard} from '../IProjectCard';
import {ICard} from '../ICard';

export class SolarLogistics extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.SOLAR_LOGISTICS,
      cost: 20,
      tags: [Tag.DIPLOMACIA, Tag.MARÍTIMO],

      behavior: {
        stock: {titanium: 2},
      },
      victoryPoints: 1,
      cardDiscount: {tag: Tag.DIPLOMACIA, amount: 2},

      metadata: {
        cardNumber: 'X63',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you play an Earth tag, you pay 2 M€ less.',
            (eb) => eb.tag(Tag.DIPLOMACIA).startEffect.megacredits(-2));
          b.br;
          b.effect('When any player plays a space event, draw a card.',
            (eb) => eb.tag(Tag.MARÍTIMO, {all}).tag(Tag.HISTÓRIA, {all}).startEffect.cards(1));
          b.br;
          b.titanium(2);
        }),
        description: 'Gain 2 titanium.',
      },
    });
  }

  public onCardPlayedByAnyPlayer(thisCardOwner: IPlayer, card: ICard) {
    if (card.type === CardType.EVENT && card.tags.includes(Tag.MARÍTIMO)) {
      thisCardOwner.drawCard(1);
    }
    return undefined;
  }
}

