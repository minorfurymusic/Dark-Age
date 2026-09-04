import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';
import {digit} from '../Options';

export class PublicSpaceline extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.PUBLIC_SPACELINE,
      cost: 18,
      tags: [Tag.DIPLOMACIA, Tag.DIPLOMACIA, Tag.ENGENHO, Tag.ENGENHO, Tag.COMÉRCIO, Tag.COMÉRCIO, Tag.MARS, Tag.MARS],

      requirements: {tag: Tag.MARÍTIMO, count: 5},

      behavior: {
        production: {megacredits: 2},
      },

      metadata: {
        cardNumber: 'U077',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(2)).plainText('Increase your M€ production 2 steps.', true).br;
          b.tag(Tag.DIPLOMACIA, {amount: 2, digit}).tag(Tag.ENGENHO, {amount: 2, digit});
          b.tag(Tag.COMÉRCIO, {amount: 2, digit}).tag(Tag.MARS, {amount: 2, digit});
        }),
        description: 'Requires 5 space tags. This card has 2 Earth tags, 2 Jovian tags, 2 Venus tags, and 2 Mars tags.',
      },
    });
  }
}
