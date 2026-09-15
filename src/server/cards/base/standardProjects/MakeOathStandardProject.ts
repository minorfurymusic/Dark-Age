import {IPlayer} from '../../../IPlayer';
import {CardName} from '../../../../common/cards/CardName';
import {CardRenderer} from '../../render/CardRenderer';
import {StandardProjectCard} from '../../StandardProjectCard';
import {SelectOathsDeferred} from '../../../deferredActions/SelectOathsDeferred';

export class MakeOathStandardProject extends StandardProjectCard {
  constructor() {
    super({
      name: CardName.MAKE_OATH_STANDARD_PROJECT,
      cost: 8,
      metadata: {
        cardNumber: 'SP9',
        renderData: CardRenderer.builder((b) =>
          b.standardProject('Spend 8 M€ to draw 3 Oaths, choose 1 to keep (secret), shuffle 2 back.', (eb) => {
            eb.megacredits(8).startAction.text('Draw 3 Oaths, keep 1');
          }),
        ),
      },
    });
  }

  actionEssence(player: IPlayer): void {
    player.game.defer(new SelectOathsDeferred(player));
  }
}
