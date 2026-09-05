import {OathName} from '../../common/oaths/OathName';
import {IOath} from './IOath';
import {DefaultOath} from './DefaultOath';

type OathDefinition = {
  name: OathName;
  tier: 1 | 2 | 3 | 4;
  points: number;
  description: string;
};

const OATH_DEFINITIONS: Array<OathDefinition> = [
  // Tier 1 - Easy (2-3 PV) - 20 cards
  {
    name: OathName.OATH_HARVEST_GRAIN,
    tier: 1,
    points: 2,
    description: 'Harvest grain and build agricultural infrastructure to gain sustenance and wealth.',
  },
  {
    name: OathName.OATH_CLEAR_LAND,
    tier: 1,
    points: 3,
    description: 'Clear the land of forests and obstacles to expand your territory.',
  },
  {
    name: OathName.OATH_GATHER_STONE,
    tier: 1,
    points: 2,
    description: 'Gather stone from quarries to construct buildings and fortifications.',
  },
  {
    name: OathName.OATH_TRADE_GOODS,
    tier: 1,
    points: 3,
    description: 'Trade goods with neighboring settlements to increase your wealth.',
  },
  {
    name: OathName.OATH_BUILD_WORKSHOP,
    tier: 1,
    points: 2,
    description: 'Build a workshop to craft tools and wares for your people.',
  },
  {
    name: OathName.OATH_RECRUIT_WARRIOR,
    tier: 1,
    points: 3,
    description: 'Recruit warriors to defend your lands from threats.',
  },
  {
    name: OathName.OATH_STUDY_RUNES,
    tier: 1,
    points: 2,
    description: 'Study ancient runes to unlock magical knowledge.',
  },
  {
    name: OathName.OATH_BREW_ALE,
    tier: 1,
    points: 3,
    description: 'Brew fine ale to earn prosperity and strengthen bonds with your people.',
  },
  {
    name: OathName.OATH_PLANT_ORCHARD,
    tier: 1,
    points: 2,
    description: 'Plant an orchard to provide fruit and sustenance.',
  },
  {
    name: OathName.OATH_FISH_WATERS,
    tier: 1,
    points: 3,
    description: 'Fish the waters to provide food and valuable resources.',
  },
  {
    name: OathName.OATH_MINE_ORE,
    tier: 1,
    points: 2,
    description: 'Mine ore from the earth to fuel your economy.',
  },
  {
    name: OathName.OATH_WEAVE_CLOTH,
    tier: 1,
    points: 3,
    description: 'Weave cloth to dress your people and trade with others.',
  },
  {
    name: OathName.OATH_TEND_ANIMALS,
    tier: 1,
    points: 2,
    description: 'Tend livestock to provide meat, labor, and wealth.',
  },
  {
    name: OathName.OATH_CARVE_WOOD,
    tier: 1,
    points: 3,
    description: 'Carve wood into fine goods for trade and use.',
  },
  {
    name: OathName.OATH_FORAGE_FOREST,
    tier: 1,
    points: 2,
    description: 'Forage the forest for berries, herbs, and resources.',
  },
  {
    name: OathName.OATH_PRESERVE_FOOD,
    tier: 1,
    points: 3,
    description: 'Preserve food to ensure survival through harsh winters.',
  },
  {
    name: OathName.OATH_SHARPEN_TOOLS,
    tier: 1,
    points: 2,
    description: 'Sharpen tools to increase the efficiency of your labor.',
  },
  {
    name: OathName.OATH_REPAIR_EQUIPMENT,
    tier: 1,
    points: 3,
    description: 'Repair equipment to keep your economy running smoothly.',
  },
  {
    name: OathName.OATH_TEND_FIRE,
    tier: 1,
    points: 2,
    description: 'Tend the fire to provide warmth and light for your people.',
  },
  {
    name: OathName.OATH_GATHER_HERBS,
    tier: 1,
    points: 3,
    description: 'Gather healing herbs to improve the health of your people.',
  },

  // Tier 2 - Medium (4-6 PV) - 25 cards
  {
    name: OathName.OATH_ESTABLISH_TRADE,
    tier: 2,
    points: 4,
    description: 'Establish trade routes with distant settlements.',
  },
  {
    name: OathName.OATH_DEFEND_BORDER,
    tier: 2,
    points: 5,
    description: 'Defend your borders against invaders and raiders.',
  },
  {
    name: OathName.OATH_NEGOTIATE_PEACE,
    tier: 2,
    points: 6,
    description: 'Negotiate peace treaties with neighboring powers.',
  },
  {
    name: OathName.OATH_SPREAD_FAITH,
    tier: 2,
    points: 4,
    description: 'Spread faith in your gods to strengthen your people\'s resolve.',
  },
  {
    name: OathName.OATH_BUILD_TOWER,
    tier: 2,
    points: 5,
    description: 'Build a tower to watch over your lands and deter enemies.',
  },
  {
    name: OathName.OATH_EXPLORE_LANDS,
    tier: 2,
    points: 6,
    description: 'Explore new lands to expand knowledge and opportunity.',
  },
  {
    name: OathName.OATH_UNITE_CLANS,
    tier: 2,
    points: 4,
    description: 'Unite clans under your banner to strengthen your people.',
  },
  {
    name: OathName.OATH_MASTER_CRAFT,
    tier: 2,
    points: 5,
    description: 'Master a craft to create goods of exceptional quality.',
  },
  {
    name: OathName.OATH_COMMAND_ARMY,
    tier: 2,
    points: 6,
    description: 'Command an army to project power and influence.',
  },
  {
    name: OathName.OATH_DISCOVER_SECRETS,
    tier: 2,
    points: 4,
    description: 'Discover ancient secrets lost to time.',
  },
  {
    name: OathName.OATH_ESTABLISH_SHRINE,
    tier: 2,
    points: 5,
    description: 'Establish a shrine to honor the gods and inspire devotion.',
  },
  {
    name: OathName.OATH_CONTROL_ROUTE,
    tier: 2,
    points: 6,
    description: 'Control a vital trade route to ensure prosperity.',
  },
  {
    name: OathName.OATH_AMASS_TREASURE,
    tier: 2,
    points: 4,
    description: 'Amass great treasure to demonstrate your power and wealth.',
  },
  {
    name: OathName.OATH_LEAD_EXPEDITION,
    tier: 2,
    points: 5,
    description: 'Lead an expedition to discover new lands and resources.',
  },
  {
    name: OathName.OATH_FORGE_ALLIANCE,
    tier: 2,
    points: 6,
    description: 'Forge an alliance with a powerful faction.',
  },
  {
    name: OathName.OATH_MASTER_SORCERY,
    tier: 2,
    points: 4,
    description: 'Master sorcery to wield magical power.',
  },
  {
    name: OathName.OATH_TRAIN_WARRIORS,
    tier: 2,
    points: 5,
    description: 'Train elite warriors to serve as your champions.',
  },
  {
    name: OathName.OATH_BUILD_BRIDGE,
    tier: 2,
    points: 6,
    description: 'Build a bridge to connect distant lands.',
  },
  {
    name: OathName.OATH_SETTLE_VALLEY,
    tier: 2,
    points: 4,
    description: 'Settle a fertile valley to establish new prosperity.',
  },
  {
    name: OathName.OATH_GATHER_KNOWLEDGE,
    tier: 2,
    points: 5,
    description: 'Gather knowledge from scholars and sages.',
  },
  {
    name: OathName.OATH_DOMINATE_REGION,
    tier: 2,
    points: 6,
    description: 'Dominate a region through strength and cunning.',
  },
  {
    name: OathName.OATH_ESTABLISH_MARKET,
    tier: 2,
    points: 4,
    description: 'Establish a market to facilitate commerce and growth.',
  },
  {
    name: OathName.OATH_TAME_WILDERNESS,
    tier: 2,
    points: 5,
    description: 'Tame the wilderness to expand your domain.',
  },
  {
    name: OathName.OATH_BECOME_LEGEND,
    tier: 2,
    points: 6,
    description: 'Become a legend whose deeds are sung by bards.',
  },
  {
    name: OathName.OATH_ACHIEVE_GREATNESS,
    tier: 2,
    points: 4,
    description: 'Achieve greatness through valor and wisdom.',
  },

  // Tier 3 - Hard (7-8 PV) - 25 cards
  {
    name: OathName.OATH_CONQUER_KINGDOM,
    tier: 3,
    points: 7,
    description: 'Conquer a kingdom to expand your domain.',
  },
  {
    name: OathName.OATH_BUILD_EMPIRE,
    tier: 3,
    points: 8,
    description: 'Build an empire spanning multiple lands.',
  },
  {
    name: OathName.OATH_RULE_CONTINENT,
    tier: 3,
    points: 7,
    description: 'Rule an entire continent under your authority.',
  },
  {
    name: OathName.OATH_COMMAND_FLEETS,
    tier: 3,
    points: 8,
    description: 'Command fleets to control the seas.',
  },
  {
    name: OathName.OATH_CONTROL_MAGIC,
    tier: 3,
    points: 7,
    description: 'Control magic to bend reality to your will.',
  },
  {
    name: OathName.OATH_RESHAPE_WORLD,
    tier: 3,
    points: 8,
    description: 'Reshape the world according to your vision.',
  },
  {
    name: OathName.OATH_ACHIEVE_IMMORTALITY,
    tier: 3,
    points: 7,
    description: 'Achieve immortality to rule eternally.',
  },
  {
    name: OathName.OATH_MASTER_ELEMENTS,
    tier: 3,
    points: 8,
    description: 'Master the elements to command nature itself.',
  },
  {
    name: OathName.OATH_BUILD_MONUMENT,
    tier: 3,
    points: 7,
    description: 'Build a monument that will endure through the ages.',
  },
  {
    name: OathName.OATH_CONTROL_DESTINY,
    tier: 3,
    points: 8,
    description: 'Control your own destiny and shape that of others.',
  },
  {
    name: OathName.OATH_UNITE_KINGDOMS,
    tier: 3,
    points: 7,
    description: 'Unite all kingdoms under a single banner.',
  },
  {
    name: OathName.OATH_ESTABLISH_DYNASTY,
    tier: 3,
    points: 8,
    description: 'Establish a dynasty that will rule for generations.',
  },
  {
    name: OathName.OATH_TRANSCEND_MORTALITY,
    tier: 3,
    points: 7,
    description: 'Transcend mortal limitations to become something greater.',
  },
  {
    name: OathName.OATH_ACHIEVE_DIVINITY,
    tier: 3,
    points: 8,
    description: 'Achieve divinity and ascend beyond mortals.',
  },
  {
    name: OathName.OATH_MASTER_ALL_ARTS,
    tier: 3,
    points: 7,
    description: 'Master all arts to become a paragon of skill.',
  },
  {
    name: OathName.OATH_CONTROL_ALL_ROUTES,
    tier: 3,
    points: 8,
    description: 'Control all trade routes to dominate commerce.',
  },
  {
    name: OathName.OATH_AMASS_INFINITE_WEALTH,
    tier: 3,
    points: 7,
    description: 'Amass infinite wealth beyond measure.',
  },
  {
    name: OathName.OATH_COMMAND_ALL_ARMIES,
    tier: 3,
    points: 8,
    description: 'Command all armies to achieve total military dominance.',
  },
  {
    name: OathName.OATH_BECOME_IMMORTAL_LEGEND,
    tier: 3,
    points: 7,
    description: 'Become an immortal legend remembered forever.',
  },
  {
    name: OathName.OATH_RESHAPE_CIVILIZATION,
    tier: 3,
    points: 8,
    description: 'Reshape civilization itself according to your ideals.',
  },
  {
    name: OathName.OATH_ACHIEVE_PERFECT_RULE,
    tier: 3,
    points: 7,
    description: 'Achieve perfect rule without flaw or opposition.',
  },
  {
    name: OathName.OATH_CONTROL_ALL_MAGIC,
    tier: 3,
    points: 8,
    description: 'Control all magic in the world.',
  },
  {
    name: OathName.OATH_TRANSCEND_LIMITS,
    tier: 3,
    points: 7,
    description: 'Transcend all limits to achieve absolute power.',
  },
  {
    name: OathName.OATH_MASTER_FORBIDDEN_ARTS,
    tier: 3,
    points: 8,
    description: 'Master forbidden arts forbidden to mortals.',
  },
  {
    name: OathName.OATH_ACHIEVE_ULTIMATE_POWER,
    tier: 3,
    points: 7,
    description: 'Achieve ultimate power beyond all comprehension.',
  },

  // Tier 4 - Very Hard (9-10 PV) - 10 cards
  {
    name: OathName.OATH_ASCEND_GODHOOD,
    tier: 4,
    points: 9,
    description: 'Ascend to godhood and transcend mortal existence.',
  },
  {
    name: OathName.OATH_UNMAKE_WORLD,
    tier: 4,
    points: 10,
    description: 'Unmake the world and reshape it anew.',
  },
  {
    name: OathName.OATH_REMAKE_CREATION,
    tier: 4,
    points: 9,
    description: 'Remake creation itself in your image.',
  },
  {
    name: OathName.OATH_CLAIM_INFINITE_POWER,
    tier: 4,
    points: 10,
    description: 'Claim infinite power and bend all reality.',
  },
  {
    name: OathName.OATH_BECOME_ETERNAL,
    tier: 4,
    points: 9,
    description: 'Become eternal and unchanging through the ages.',
  },
  {
    name: OathName.OATH_SURPASS_ALL_MORTALS,
    tier: 4,
    points: 10,
    description: 'Surpass all mortals in every conceivable way.',
  },
  {
    name: OathName.OATH_CONTROL_FATE,
    tier: 4,
    points: 9,
    description: 'Control fate itself for all beings.',
  },
  {
    name: OathName.OATH_MASTER_REALITY,
    tier: 4,
    points: 10,
    description: 'Master reality and unmake the laws of physics.',
  },
  {
    name: OathName.OATH_ACHIEVE_OMNISCIENCE,
    tier: 4,
    points: 9,
    description: 'Achieve omniscience and know all secrets.',
  },
  {
    name: OathName.OATH_BECOME_ONE_WITH_COSMOS,
    tier: 4,
    points: 10,
    description: 'Become one with the cosmos itself.',
  },
];

export function createAllOaths(): Array<IOath> {
  return OATH_DEFINITIONS.map((def) =>
    new DefaultOath(def.name, def.tier, def.points, def.description)
  );
}

export function createOathByName(name: OathName): IOath | undefined {
  const def = OATH_DEFINITIONS.find((d) => d.name === name);
  return def ? new DefaultOath(def.name, def.tier, def.points, def.description) : undefined;
}
