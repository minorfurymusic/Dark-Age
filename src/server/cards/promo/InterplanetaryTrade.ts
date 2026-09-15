import {IProjectCard} from '../IProjectCard';
import {Card} from '../Card';
import {CardName} from '../../../common/cards/CardName';
import {CardType} from '../../../common/cards/CardType';
import {Tag} from '../../../common/cards/Tag';
import {IPlayer} from '../../IPlayer';
import {Resource} from '../../../common/Resource';
import {CardRenderer} from '../../cards/render/CardRenderer';

export class InterplanetaryTrade extends Card implements IProjectCard {
  constructor() {
    super({
      type: CardType.AUTOMATED,
      name: CardName.INTERPLANETARY_TRADE,
      tags: [Tag.MARÍTIMO],
      cost: 27,
      victoryPoints: 1,

      metadata: {
        cardNumber: 'X05',
        renderData: CardRenderer.builder((b) => {
          b.production((pb) => pb.megacredits(1));
          b.slash().diverseTag();
        }),
        description: 'Increase your M€ production 1 step per different tag you have in play, including this.',
      },
    });
  }

  public override bespokePlay(player: IPlayer) {
    const distinctTagCount = player.tags.distinctCount('default', Tag.MARÍTIMO);
    player.production.add(Resource.MEGACREDITS, distinctTagCount, {log: true});
    return undefined;
  }
}
