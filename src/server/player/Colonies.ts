import {MAX_FLEET_SIZE} from '../../common/constants';
import {CardName} from '../../common/cards/CardName';
import {ColoniesHandler} from '../colonies/ColoniesHandler';
import {AndOptions} from '../inputs/AndOptions';
import {CanAffordOptions, IPlayer} from '../IPlayer';
import {ENERGY_TRADE_COST, MC_TRADE_COST, TITANIUM_TRADE_COST} from '../../common/constants';
import {IColony} from '../colonies/IColony';
import {SelectPaymentDeferred} from '../deferredActions/SelectPaymentDeferred';
import {Resource} from '../../common/Resource';
import {OrOptions} from '../inputs/OrOptions';
import {SelectOption} from '../inputs/SelectOption';
import {SelectColony} from '../inputs/SelectColony';
import {IColonyTrader} from '../colonies/IColonyTrader';
import {TradeWithCollegiumCopernicus} from '../cards/pathfinders/CollegiumCopernicus';
import {message} from '../logs/MessageBuilder';
import {TradeWithDarksideSmugglersUnion} from '../cards/moon/DarksideSmugglersUnion';
import {Payment} from '../../common/inputs/Payment';
import {TradeWithHectateSpeditions} from '../cards/underworld/HecateSpeditions';
import {ColonyName} from '../../../src/common/colonies/ColonyName';
import {SelectSpace} from '../inputs/SelectSpace';
import {calculateDistance, getAttackCost, getEstandarteAuraBonus} from '../boards/DistanceCalculator';
import {Space} from '../boards/Space';

export class Colonies {
  private player: IPlayer;

  /** The number of trade fleets assigned to this player. */
  private fleetSize: number = 1;
  /** The number of consumed trade fleets. When this == `fleetSize` the player has no trade fleets. */
  public usedTradeFleets: number = 0;
  // When trading you may increase the Colony track this many steps.
  public tradeOffset: number = 0;

  // When trading you many use this many fewer resources of the trading type.
  public tradeDiscount: number = 0;

  public victoryPoints: number = 0; // Titania Colony VP
  public cardDiscount: number = 0; // Iapetus Colony

  constructor(player: IPlayer) {
    this.player = player;
  }

  /**
   * Returns `true` if this player can execute a trade.
   */
  public canTrade() {
    return ColoniesHandler.tradeableColonies(this.player.game).length > 0 &&
      this.getFleetSize() > this.usedTradeFleets &&
      this.player.game.tradeEmbargo !== true;
  }

  /**
   * Returns `true` if this player can attack a route (has 2+ Guerrear allocated).
   */
  public canAttackRoute() {
    return this.player.allocatedGuerear >= 2 &&
      ColoniesHandler.tradeableColonies(this.player.game).length > 0 &&
      this.player.game.tradeEmbargo !== true;
  }

  public coloniesTradeAction(): AndOptions | undefined {
    const game = this.player.game;
    if (game.gameOptions.coloniesExtension && this.canTrade()) {
      return this.tradeWithColony(ColoniesHandler.tradeableColonies(game));
    }
    return undefined;
  }

  public coloniesAttackAction(): SelectColony | undefined {
    const game = this.player.game;
    if (game.gameOptions.coloniesExtension && this.canAttackRoute()) {
      const availableRoutes = ColoniesHandler.tradeableColonies(game);
      return new SelectColony('Select trade route to attack (costs 2 Guerrear)', 'Attack', availableRoutes)
        .andThen((colony) => {
          this.attackRoute(colony);
          return undefined;
        });
    }
    return undefined;
  }

  private attackRoute(colony: IColony): void {
    const player = this.player;
    const game = player.game;

    // Deduct Guerrear cost
    player.stock.deduct(Resource.GUERREAR, 2);

    // Handle special routes separately
    if (this.isSpecialRoute(colony.name)) {
      this.stealFromSpecialRoute(colony, player, colony.name);
    } else {
      // Steal resources based on route type
      const stealAmount = this.getStealAmountForRoute(colony.name);
      if (stealAmount !== undefined) {
        const {resource, amount} = stealAmount;
        this.stealResourceFromRoute(colony, player, resource, amount);
      }
    }

    game.log('${0} attacked ${1} via Saque (costs 2 Guerrear)', (b) => b.player(player).colony(colony));
  }

  private getStealAmountForRoute(colonyName: ColonyName): {resource: Resource, amount: number} | undefined {
    switch (colonyName) {
      case ColonyName.LUNA: return {resource: Resource.MEGACREDITS, amount: 5};
      case ColonyName.CERES: return {resource: Resource.STEEL, amount: 3};
      case ColonyName.TRITON: return {resource: Resource.TITANIUM, amount: 2};
      case ColonyName.GANYMEDE: return {resource: Resource.PLANTS, amount: 2};
      case ColonyName.EUROPA: return {resource: Resource.GUERREAR, amount: 1};
      case ColonyName.IO: return {resource: Resource.INOVACAO, amount: 1};
      case ColonyName.CALLISTO: return {resource: Resource.GUERREAR, amount: 1};
      case ColonyName.PLUTO: // Jerusalem - special card draw
      case ColonyName.MIRANDA: // Lisboa - resource on card (Porco)
      case ColonyName.ENCELADUS: // Ragusa - resource on card (Caldeirão)
      case ColonyName.TITAN: // Constantinopla - special multi-player steal
        return undefined; // Handled separately
      default:
        return undefined;
    }
  }

  /**
   * Check if route has special steal mechanics.
   */
  private isSpecialRoute(colonyName: ColonyName): boolean {
    return colonyName === ColonyName.PLUTO ||
           colonyName === ColonyName.MIRANDA ||
           colonyName === ColonyName.ENCELADUS ||
           colonyName === ColonyName.TITAN;
  }

  /**
   * Handle special route steal mechanics.
   */
  private stealFromSpecialRoute(colony: IColony, attacker: IPlayer, colonyName: ColonyName): void {
    const game = this.player.game;

    switch (colonyName) {
      case ColonyName.PLUTO: // Jerusalem - discard card to steal
        game.log('${0} attacked Jerusalém (Pluto) - card discard mechanic TBD', (b) =>
          b.player(attacker));
        break;

      case ColonyName.MIRANDA: // Lisboa - steal Porco resource
        game.log('${0} attacked Lisboa (Miranda) - Porco resource steal TBD', (b) =>
          b.player(attacker));
        break;

      case ColonyName.ENCELADUS: // Ragusa - steal Caldeirão resource
        game.log('${0} attacked Ragusa (Enceladus) - Caldeirão resource steal TBD', (b) =>
          b.player(attacker));
        break;

      case ColonyName.TITAN: // Constantinopla - steal from all colonizers (+1 TR)
        if (colony.colonies.length > 0) {
          const stealPerOwner = 2; // 2 Moedas per colonizer
          colony.colonies.forEach((playerId) => {
            const owner = game.getPlayerById(playerId);
            owner.stock.steal(Resource.MEGACREDITS, stealPerOwner, attacker, {log: true});
          });
          // +1 Ponto de Poder (TR) for attacker
          attacker.increaseTerraformRating(1, {log: true});
          game.log('${0} conquered Constantinopla (Titan): +4 Moedas + 1 TR', (b) =>
            b.player(attacker));
        }
        break;
    }
  }

  private stealResourceFromRoute(colony: IColony, attacker: IPlayer, resource: Resource, amount: number): void {
    // Find the owner(s) of the colony
    if (colony.colonies.length === 0) {
      return; // No one owns it
    }

    // Disputa Direta: with <2 colonizers, steal from the single owner
    // With 2+ colonizers, steal from the one with least Guerrear
    if (colony.colonies.length === 1) {
      const owner = this.player.game.getPlayerById(colony.colonies[0]);
      owner.stock.steal(resource, amount, attacker, {log: true});
      this.player.game.log('${0} exercised Disputa Direta against ${1}', (b) =>
        b.player(attacker).player(owner));
    } else {
      // Multiple colonizers: find weakest (least Guerrear in stock)
      let weakestOwner: IPlayer | undefined;
      let minGuerrear = Infinity;

      colony.colonies.forEach((playerId) => {
        const owner = this.player.game.getPlayerById(playerId);
        const guerrearCount = owner.stock.get(Resource.GUERREAR);
        if (guerrearCount < minGuerrear) {
          minGuerrear = guerrearCount;
          weakestOwner = owner;
        }
      });

      if (weakestOwner !== undefined) {
        weakestOwner.stock.steal(resource, amount, attacker, {log: true});
        this.player.game.log('${0} targeted weaker colonizer ${1} in Disputa Direta', (b) =>
          b.player(attacker).player(weakestOwner!));
      }
    }
  }

  private tradeWithColony(openColonies: Array<IColony>): AndOptions | undefined {
    const player = this.player;
    const handlers = [
      new TradeWithDarksideSmugglersUnion(player),
      new TradeWithCollegiumCopernicus(player),
      new TradeWithHectateSpeditions(player),
      new TradeWithEnergy(player),
      new TradeWithTitanium(player),
      new TradeWithMegacredits(player),
    ];

    let selected: IColonyTrader | undefined = undefined;

    const howToPayForTrade = new OrOptions()
      .setTitle('Pay trade fee')
      .setButtonLabel('Pay');
    handlers.forEach((handler) => {
      if (handler.canUse()) {
        howToPayForTrade.options.push(new SelectOption(
          handler.optionText()).andThen(() => {
          selected = handler;
          return undefined;
        }));
      }
    });

    if (howToPayForTrade.options.length === 0) {
      return undefined;
    }

    const selectColony = new SelectColony('Select colony tile for trade', 'trade', openColonies)
      .andThen((colony) => {
        if (selected === undefined) {
          throw new Error(`Unexpected condition: no trade funding source selected when trading with ${colony.name}.`);
        }
        selected.trade(colony);
        return undefined;
      });

    return new AndOptions(howToPayForTrade, selectColony)
      .setTitle('Trade with a colony tile')
      .setButtonLabel('Trade');
  }

  public getPlayableColonies(allowDuplicate: boolean = false, canAffordOptions: number | CanAffordOptions = 0) {
    const options: CanAffordOptions = typeof canAffordOptions === 'number' ? {cost: canAffordOptions} : canAffordOptions;

    return this.player.game.colonies
      .filter((colony) => {
        if (colony.isActive === false) {
          return false;
        }
        if (colony.isFull()) {
          return false;
        }
        if (!allowDuplicate && colony.colonies.includes(this.player.id)) {
          return false;
        }
        if (colony.name === ColonyName.VENUS && !this.player.canAfford({...options, tr: {venus: 1}})) {
          return false;
        }
        if (colony.name === ColonyName.EUROPA && !this.player.canAfford({...options, tr: {oceans: 1}})) {
          return false;
        }
        if (colony.name === ColonyName.LEAVITT) {
          const pharmacyUnion = this.player.tableau.get(CardName.PHARMACY_UNION);
          if ((pharmacyUnion?.resourceCount ?? 0) > 0 && !this.player.canAfford({...options, tr: {tr: 1}})) {
            return false;
          }
        }
        return true;
      });
  }

  /**
   * Returns `true` if this player can attack cities (has Guerrear allocated).
   */
  public canAttackCities(): boolean {
    return this.player.allocatedGuerear > 0;
  }

  /**
   * Get all enemy cities that can be attacked.
   */
  private getAttackableCities() {
    const game = this.player.game;
    const board = game.board;
    return board.spaces.filter((space) => {
      if (!space.tile || space.player === undefined || space.player === this.player) {
        return false;
      }
      return space.player !== this.player;
    });
  }

  public coloniesAttackCityAction(): SelectSpace | undefined {
    const game = this.player.game;
    if (!game.gameOptions.coloniesExtension || !this.canAttackCities()) {
      return undefined;
    }

    const attackableCities = this.getAttackableCities();
    if (attackableCities.length === 0) {
      return undefined;
    }

    return new SelectSpace('Select a feudo (city) to attack', attackableCities)
      .andThen((city) => {
        this.attackCity(city);
        return undefined;
      });
  }

  private attackCity(city: Space): void {
    const player = this.player;
    const game = player.game;
    const attacker = player;
    const defender = city.player;

    if (!defender) return;

    // Find attacker's city/base for distance calculation
    const attackerBase = game.board.spaces.find((s) =>
      s.player === attacker && s.tile && s.x !== -1 && s.y !== -1);

    if (!attackerBase) return;

    const distance = calculateDistance(attackerBase, city);
    const cost = getAttackCost(distance);
    const auraBonus = getEstandarteAuraBonus(attacker, city, game.board.spaces);

    if (cost === 999 || attacker.allocatedGuerear < cost) {
      game.log('${0} cannot attack ${1} (insufficient Guerrear)', (b) => b.player(attacker).spaceId(city.id));
      return;
    }

    // Deduct cost
    attacker.stock.deduct(Resource.GUERREAR, cost);

    if (auraBonus > 0) {
      game.log('${0} attacked ${1} (distance ${2}, cost ${3} Guerrear, +${4} from Estandarte aura)', (b) =>
        b.player(attacker).spaceId(city.id).number(distance).number(cost).number(auraBonus));
    } else {
      game.log('${0} attacked ${1} (distance ${2}, cost ${3} Guerrear)', (b) =>
        b.player(attacker).spaceId(city.id).number(distance).number(cost));
    }

    this.resolveCombat(attacker, defender, city, cost, auraBonus);
  }

  private resolveCombat(attacker: IPlayer, defender: IPlayer, city: Space, attackerGuerrear: number, auraBonus: number): void {
    const game = this.player.game;
    const defenderGuerrear = defender.allocatedGuerear;

    game.log('${0} reveals ${1} allocated Guerrear in defense', (b) =>
      b.player(defender).number(defenderGuerrear));

    const totalAttackForce = attackerGuerrear + auraBonus;

    if (totalAttackForce > defenderGuerrear) {
      // Attack succeeds: attacker captures the city tile
      city.player = attacker;
      game.log('${0} conquered the feudo! Guerrear: ${1} vs ${2}', (b) =>
        b.player(attacker).number(totalAttackForce).number(defenderGuerrear));
    } else {
      // Attack fails: defender holds the city
      game.log('${0} held the feudo against ${1}! Guerrear: ${2} vs ${3}', (b) =>
        b.player(defender).player(attacker).number(defenderGuerrear).number(totalAttackForce));
    }
  }

  public getVictoryPoints(): number {
    return this.player.colonies.victoryPoints;
  }

  public getFleetSize(): number {
    return this.fleetSize;
  }

  public increaseFleetSize(): void {
    if (this.fleetSize < MAX_FLEET_SIZE) {
      this.fleetSize++;
    }
  }

  public decreaseFleetSize(): void {
    // This fleet size management is a little tricky, because with The Moon, it's possible to
    // have more fleets than MAX_FLEET_SIZE which are then discarded.
    if (this.fleetSize > 0) {
      this.fleetSize--;
    }
  }

  public setFleetSize(fleetSize: number) {
    this.fleetSize = fleetSize;
  }

  public returnTradeFleets(): void {
    const syndicatePirateRaider = this.player.game.syndicatePirateRaider;
    // Syndicate Pirate Raids hook. If it is in effect, then only the syndicate pirate raider will
    // retrieve their fleets.
    // See Colony.ts for the other half of this effect, and Game.ts which disables it.
    if (syndicatePirateRaider === undefined) {
      this.usedTradeFleets = 0;
    } else if (syndicatePirateRaider === this.player.id) {
      // CEO effect: Disable all other players from trading next gen,
      // but free up all colonies (don't leave their trade fleets stuck there)
      if (this.player.tableau.has(CardName.HUAN)) {
        for (const player of this.player.opponents) {
          // Magic number high enough to disable other players' trading
          player.colonies.usedTradeFleets = 50;
        }
      }
      this.usedTradeFleets = 0;
    }
  }
}

export class TradeWithEnergy implements IColonyTrader {
  private tradeCost: number;

  constructor(private player: IPlayer) {
    this.tradeCost = ENERGY_TRADE_COST - player.colonies.tradeDiscount;
  }

  public canUse() {
    return this.player.energy >= this.tradeCost;
  }
  public optionText() {
    return message('Pay ${0} energy', (b) => b.number(this.tradeCost));
  }

  public trade(colony: IColony) {
    this.player.stock.deduct(Resource.GUERREAR, this.tradeCost);
    this.player.game.log('${0} spent ${1} energy to trade with ${2}', (b) => b.player(this.player).number(this.tradeCost).colony(colony));
    colony.trade(this.player);
  }
}

export class TradeWithTitanium implements IColonyTrader {
  private tradeCost: number;

  constructor(private player: IPlayer) {
    this.tradeCost = TITANIUM_TRADE_COST - player.colonies.tradeDiscount;
  }

  public canUse() {
    return this.player.titanium >= this.tradeCost;
  }
  public optionText() {
    return message('Pay ${0} titanium', (b) => b.number(this.tradeCost));
  }

  public trade(colony: IColony) {
    this.player.pay(Payment.of({titanium: this.tradeCost}));
    this.player.game.log('${0} spent ${1} titanium to trade with ${2}', (b) => b.player(this.player).number(this.tradeCost).colony(colony));
    colony.trade(this.player);
  }
}


export class TradeWithMegacredits implements IColonyTrader {
  private tradeCost: number;

  constructor(private player: IPlayer) {
    this.tradeCost = MC_TRADE_COST- player.colonies.tradeDiscount;
    const adhai = player.tableau.get(CardName.ADHAI_HIGH_ORBIT_CONSTRUCTIONS);
    if (adhai !== undefined) {
      const adhaiDiscount = Math.floor(adhai.resourceCount / 2);
      this.tradeCost = Math.max(0, this.tradeCost - adhaiDiscount);
    }
  }

  public canUse() {
    return this.player.canAfford(this.tradeCost);
  }
  public optionText() {
    return message('Pay ${0} M€', (b) => b.number(this.tradeCost));
  }

  public trade(colony: IColony) {
    this.player.game.defer(new SelectPaymentDeferred(this.player, this.tradeCost,
      {title: message('Select how to pay ${0} for colony trade', (b) => b.number(this.tradeCost))}))
      .andThen(() => {
        this.player.game.log('${0} spent ${1} M€ to trade with ${2}', (b) => b.player(this.player).number(this.tradeCost).colony(colony));
        colony.trade(this.player);
      });
  }
}
