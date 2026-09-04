import {OathName} from '../../common/oaths/OathName';
import {IPlayer} from '../IPlayer';

export interface IOath {
  name: OathName;
  tier: 1 | 2 | 3 | 4;
  points: number;
  description: string;

  isCompleted(player: IPlayer): boolean;
}

export function isIOath(object: any): object is IOath {
  return object !== undefined && 'name' in object && 'points' in object && 'isCompleted' in object;
}
