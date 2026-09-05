import {IPlayer} from '../../IPlayer';
import {PreludeCard} from '../prelude/PreludeCard';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {Tag} from '../../../common/cards/Tag';

export class PlanetaryAlliance extends PreludeCard {
  constructor() {
    super({
      name: CardName.PLANETARY_ALLIANCE,
      tags: [Tag.DIPLOMACIA, Tag.ENGENHO, Tag.COMÉRCIO],

      behavior: {
        tr: 2,
      },

      metadata: {
        cardNumber: 'P56',
        renderData: CardRenderer.builder((b) => {
          b.tr(2).cards(1, {secondaryTag: Tag.ENGENHO}).cards(1, {secondaryTag: Tag.COMÉRCIO});
        }),
        description: 'Raise your TR 2 steps. Draw 1 Jovian card and 1 Venus card.',
      },
    });
  }

  public override bespokePlay(player: IPlayer) {
    player.drawCard(1, {tag: Tag.ENGENHO});
    player.drawCard(1, {tag: Tag.COMÉRCIO});
    return undefined;
  }
}
