export const GlobalParameter = {
  ESTANDARTES: 'estandartes',
  FE: 'fe',
  TECNOLOGIA: 'tecnologia',
  ROTAS_COMERCIAIS: 'rotas-comerciais',
  MOON_HABITAT_RATE: 'moon-habitat',
  MOON_MINING_RATE: 'moon-mining',
  MOON_LOGISTIC_RATE: 'moon-logistic',
} as const;
export type GlobalParameter = typeof GlobalParameter[keyof typeof GlobalParameter];
