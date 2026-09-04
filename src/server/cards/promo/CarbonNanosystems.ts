import {IProjectCard} from '../IProjectCard';
import {Tag} from '../../../common/cards/Tag';
import {Card} from '../Card';
import {CardType} from '../../../common/cards/CardType';
import {IPlayer} from '../../IPlayer';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {CardResource} from '../../../common/CardResource';
import {Size} from '../../../common/cards/render/Size';
import {ICard} from '../ICard';

export class CarbonNanosystems extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.ACTIVE,
      name: CardName.CARBON_NANOSYSTEMS,
      tags: [Tag.ERUDIÇÃO, Tag.CONSTRUÇÃO],
      cost: 14,
      victoryPoints: 1,
      resourceType: CardResource.GRAPHENE,

      metadata: {
        cardNumber: 'X52',
        renderData: CardRenderer.builder((b) => {
          b.effect('When you play a science tag, including this, add a graphene resource here.', (eb) => eb.tag(Tag.ERUDIÇÃO).startEffect.resource(CardResource.GRAPHENE)).br;
          b.effect('When playing a space or city tag, graphenes may be used as 4 M€ each.', (eb) => eb.tag(Tag.MARÍTIMO).or().tag(Tag.FEUDO, {size: Size.MEDIUM}).startEffect.resource(CardResource.GRAPHENE).equals().megacredits(4)).br;
        }),
      },
    });
  }

  public onCardPlayed(player: IPlayer, card: ICard) {
    const qty = player.tags.cardTagCount(card, Tag.ERUDIÇÃO);
    player.addResourceTo(this, {qty: qty, log: true});
    return undefined;
  }
  public onNonCardTagAdded(player: IPlayer, tag: Tag) {
    if (tag === Tag.ERUDIÇÃO) {
      player.addResourceTo(this, {qty: 1, log: true});
    }
  }
}
