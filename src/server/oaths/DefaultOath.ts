import {OathName} from '../../common/oaths/OathName';
import {Oath} from './Oath';
import {IPlayer} from '../IPlayer';

export class DefaultOath extends Oath {
  constructor(
    name: OathName,
    tier: 1 | 2 | 3 | 4,
    points: number,
    description: string,
  ) {
    super(name, tier, points, description);
  }

  public isCompleted(_player: IPlayer): boolean {
    // Placeholder: oaths are never auto-completed.
    // Completion is determined by game mechanics (e.g., reaching production levels,
    // accumulating resources, or triggering specific actions).
    // This will be refined when oath completion conditions are defined.
    return false;
  }
}
