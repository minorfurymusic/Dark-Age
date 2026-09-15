import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {PartyName} from '../../../common/turmoil/PartyName';
import {Resource} from '../../../common/Resource';
import {CardRenderer} from '../render/CardRenderer';
import {ICard} from '../ICard';

export class GMOContract extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.GMO_CONTRACT,
      tags: [Tag.BRUXARIA, Tag.ERUDIÇÃO],
      cost: 3,

      requirements: {party: PartyName.GREENS},
      metadata: {
        description: 'Requires that Greens are ruling or that you have 2 delegates there.',
        cardNumber: 'T06',
        renderData: CardRenderer.builder((b) => {
          b.effect('Each time you play a plant, animal or microbe tag, including this, gain 2 M€.', (be) => {
            be.tag(Tag.PECUÁRIA).slash().tag(Tag.AGRICULTURA).slash().tag(Tag.BRUXARIA);
            be.startEffect.megacredits(2);
          });
        }),
      },
    });
  }

  public onNonCardTagAdded(player: IPlayer, tag: Tag): void {
    if (tag === Tag.AGRICULTURA) {
      player.defer(() => player.stock.add(Resource.MEGACREDITS, 2, {log: true}));
    }
  }

  public onCardPlayed(player: IPlayer, card: ICard): void {
    const amount = player.tags.cardTagCount(card, [Tag.PECUÁRIA, Tag.AGRICULTURA, Tag.BRUXARIA]);
    if (amount > 0) {
      player.defer(() => player.stock.add(Resource.MEGACREDITS, amount * 2, {log: true}));
    }
  }
}
