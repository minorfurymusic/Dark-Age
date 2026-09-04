import {DeferredAction} from './DeferredAction';
import {IPlayer} from '../IPlayer';
import {IOath} from '../oaths/IOath';
import {PlayerInput} from '../PlayerInput';

export class SelectOathsDeferred extends DeferredAction<IOath> {
  constructor(player: IPlayer) {
    super(player);
  }

  public override execute(): PlayerInput | undefined {
    const oathDealer = this.player.game.oathDealer;
    if (!oathDealer) {
      return undefined; // Oath system not initialized
    }

    // Draw 3 oaths from the dealer
    const drawnOaths = oathDealer.drawCards(3);

    if (drawnOaths.length === 0) {
      return undefined;
    }

    // For Phase 13, use the first oath as temporary selection
    // TODO: Phase 3 - Implement proper oath selection UI
    const selectedOath = drawnOaths[0];
    this.player.oaths.push(selectedOath);

    // Return unselected oaths to the dealer
    const returnedOaths = drawnOaths.filter(oath => oath !== selectedOath);
    oathDealer.returnCards(returnedOaths);

    this.cb(selectedOath);
    return undefined;
  }
}
