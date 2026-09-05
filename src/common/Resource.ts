export const Resource = {
  MEGACREDITS: 'megacredits',
  STEEL: 'steel',
  TITANIUM: 'titanium',
  PLANTS: 'plants',
  GUERREAR: 'guerrear',
  INOVACAO: 'inovacao',
} as const;
export type Resource = typeof Resource[keyof typeof Resource];

export const ALL_RESOURCES = [Resource.MEGACREDITS, Resource.STEEL, Resource.TITANIUM, Resource.PLANTS, Resource.GUERREAR, Resource.INOVACAO] as const;
