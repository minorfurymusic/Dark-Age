import {IOath} from './IOath';
import {Random} from '../../common/utils/Random';
import {inplaceShuffle} from '../utils/shuffle';
import {OathManifests} from './OathManifests';

export class OathDealer {
  private deck: Array<IOath> = [];
  private discard: Array<IOath> = [];

  constructor(private rng: Random) {
    this.resetDeck();
  }

  private resetDeck(): void {
    this.deck = [];
    this.discard = [];

    // Create all oaths from manifests
    for (const manifest of OathManifests.manifests) {
      for (const name of manifest.oathNames) {
        const oath = manifest.factory(name);
        this.deck.push(oath);
      }
    }

    inplaceShuffle(this.deck, this.rng);
  }

  public drawCards(count: number): Array<IOath> {
    const drawn: Array<IOath> = [];

    for (let i = 0; i < count; i++) {
      if (this.deck.length === 0) {
        // Reshuffle discard pile if deck is empty
        if (this.discard.length === 0) {
          this.resetDeck();
        } else {
          this.deck = this.discard;
          this.discard = [];
          inplaceShuffle(this.deck, this.rng);
        }
      }

      const oath = this.deck.pop();
      if (oath) {
        drawn.push(oath);
      }
    }

    return drawn;
  }

  public returnCards(oaths: Array<IOath>): void {
    for (const oath of oaths) {
      this.discard.push(oath);
    }
  }

  public getRemainingCount(): number {
    return this.deck.length + this.discard.length;
  }
}
