import {CorporationCard} from '../corporation/CorporationCard';
import {ICorporationCard} from '../corporation/ICorporationCard';
import {Tag} from '../../../common/cards/Tag';
import {IPlayer} from '../../IPlayer';
import {CardName} from '../../../common/cards/CardName';
import {CardRenderer} from '../render/CardRenderer';
import {IActionCard, ICard} from '../ICard';
import {CardResource} from '../../../common/CardResource';
import {ColoniesHandler} from '../../colonies/ColoniesHandler';
import {SelectColony} from '../../inputs/SelectColony';
import {IColonyTrader} from '../../colonies/IColonyTrader';
import {IColony} from '../../colonies/IColony';
import {AddResourcesToCard} from '../../deferredActions/AddResourcesToCard';
import {message} from '../../logs/MessageBuilder';
import {digit} from '../Options';

function tradeCost(player: IPlayer) {
  return Math.max(0, 3 - player.colonies.tradeDiscount);
}
export class CollegiumCopernicus extends CorporationCard implements ICorporationCard, IActionCard {
  constructor() {
    super({
      name: CardName.COLLEGIUM_COPERNICUS,
      tags: [Tag.ERUDIÇÃO, Tag.DIPLOMACIA],
      startingMegaCredits: 33,
      resourceType: CardResource.DATA,

      firstAction: {
        text: 'Draw 2 cards with a science tag',
        drawCard: {count: 2, tag: Tag.ERUDIÇÃO},
      },

      metadata: {
        cardNumber: 'PfC16',
        description: 'You start with 33 M€. As your first action, draw 2 cards with a science tag.',
        renderData: CardRenderer.builder((b) => {
          b.br;
          b.megacredits(33).cards(2, {secondaryTag: Tag.ERUDIÇÃO}).br;
          b.effect('When you play a card with a science tag (including this) Add 1 data to ANY card.', (eb) => {
            eb.tag(Tag.ERUDIÇÃO).asterix().startEffect.resource(CardResource.DATA).asterix();
          }).br;
          b.resource(CardResource.DATA, {amount: 3, digit}).arrow().trade().plainText('Action: Spend 3 data from this card to trade.', true);
        }),
      },
    });
  }

  public onCardPlayed(player: IPlayer, card: ICard): void {
    if (player.tags.cardHasTag(card, Tag.ERUDIÇÃO) && player.tableau.has(this.name)) {
      player.game.defer(new AddResourcesToCard(player, CardResource.DATA, {count: 1}));
    }
  }

  public canAct(player: IPlayer) {
    return player.colonies.canTrade() && this.resourceCount >= tradeCost(player);
  }

  public action(player: IPlayer) {
    const game = player.game;
    player.defer(
      new SelectColony('Select colony tile to trade with', 'Select', ColoniesHandler.tradeableColonies(game))
        .andThen((colony) => {
          tradeWithColony(this, player, colony);
          return undefined;
        }),
    );
    return undefined;
  }
}

export function tradeWithColony(card: ICard, player: IPlayer, colony: IColony) {
  const cost = tradeCost(player);
  card.resourceCount -= cost;
  player.game.log('${0} spent ${1} data from ${2} to trade with ${3}', (b) => b.player(player).number(cost).card(card).colony(colony));
  colony.trade(player);
}
export class TradeWithCollegiumCopernicus implements IColonyTrader {
  private collegiumCopernicus: ICard | undefined;

  constructor(private player: IPlayer) {
    this.collegiumCopernicus = player.tableau.get(CardName.COLLEGIUM_COPERNICUS);
  }

  public canUse() {
    return (this.collegiumCopernicus?.resourceCount ?? 0) >= tradeCost(this.player) &&
      !this.player.actionsThisGeneration.has(CardName.COLLEGIUM_COPERNICUS);
  }

  public optionText() {
    return message('Pay ${0} data (use ${1} action)', (b) => b.number(tradeCost(this.player)).cardName(CardName.COLLEGIUM_COPERNICUS));
  }

  public trade(colony: IColony) {
    this.player.actionsThisGeneration.add(CardName.COLLEGIUM_COPERNICUS);
    if (this.collegiumCopernicus !== undefined) {
      tradeWithColony(this.collegiumCopernicus, this.player, colony);
    }
  }
}
