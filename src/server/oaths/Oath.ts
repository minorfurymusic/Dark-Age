import {OathName} from '../../common/oaths/OathName';
import {IOath} from './IOath';
import {IPlayer} from '../IPlayer';

export abstract class Oath implements IOath {
  public name: OathName;
  public tier: 1 | 2 | 3 | 4;
  public points: number;
  public description: string;

  constructor(name: OathName, tier: 1 | 2 | 3 | 4, points: number, description: string) {
    this.name = name;
    this.tier = tier;
    this.points = points;
    this.description = description;
  }

  public abstract isCompleted(player: IPlayer): boolean;
}
