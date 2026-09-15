import {IPlayer} from '../../IPlayer';
import {PreludeCard} from '../prelude/PreludeCard';
import {IProjectCard} from '../IProjectCard';
import {CardName} from '../../../common/cards/CardName';
import {Turmoil} from '../../turmoil/Turmoil';
import {ChooseRulingPartyDeferred} from '../../turmoil/ChooseRulingPartyDeferred';
import {CardRenderer} from '../render/CardRenderer';
import {ICloneTagCard} from '../pathfinders/ICloneTagCard';
import {Tag} from '../../../common/cards/Tag';
import {DeclareCloneTag} from '../../pathfinders/DeclareCloneTag';

export class ByElection extends PreludeCard implements IProjectCard, ICloneTagCard {
  constructor() {
    super({
      name: CardName.BY_ELECTION,

      metadata: {
        cardNumber: 'Y02',
        renderData: CardRenderer.builder((b) => {
          b.rulingParty().plus().influence();
          b.br;
          b.plainText('Set the ruling party to one of your choice. Gain 1 influence.');
          b.br;
          b.plainText('Choose a tag. This card counts as having that tag.');
        }),
      },
    });
  }

  public cloneTag: Tag = Tag.CLONE;

  public override get tags(): Array<Tag> {
    return [this.cloneTag];
  }
  public override bespokePlay(player: IPlayer) {
    Turmoil.ifTurmoil((player.game), (turmoil) => {
      turmoil.addInfluenceBonus(player);
      player.game.defer(new ChooseRulingPartyDeferred(player, turmoil));
    });
    player.game.defer(new DeclareCloneTag(player, this));

    return undefined;
  }
}
