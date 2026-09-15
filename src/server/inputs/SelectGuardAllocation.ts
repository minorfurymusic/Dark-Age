import {message} from '../logs/MessageBuilder';
import {BasePlayerInput} from '../PlayerInput';
import {InputResponse, isSelectAmountResponse} from '../../common/inputs/InputResponse';
import {SelectAmountModel} from '../../common/models/PlayerInputModel';
import {InputError} from './InputError';

export class SelectGuardAllocation extends BasePlayerInput<number> {
  public selected: number = 0;

  constructor(
    public maxAllocation: number,
    public currentGuerear: number,
  ) {
    super(
      'guardAllocation',
      message('Fase de Guarda: Allocate Guerrear (0–${0}). Current stock: ${1}',
        (b: any) => b.number(maxAllocation).number(currentGuerear),
      ),
    );
    this.buttonLabel = 'Allocate';
  }

  public toModel(): SelectAmountModel {
    return {
      title: this.title,
      buttonLabel: this.buttonLabel,
      type: 'amount',
      max: this.maxAllocation,
      min: 0,
      maxByDefault: false,
    };
  }

  public process(input: InputResponse) {
    if (!isSelectAmountResponse(input)) {
      throw new InputError('Not a valid SelectAmountResponse');
    }
    if (isNaN(input.amount)) {
      throw new InputError('Amount is not a number');
    }
    if (input.amount > this.maxAllocation) {
      throw new InputError('Amount provided too high (max ' + String(this.maxAllocation) + ')');
    }
    if (input.amount < 0) {
      throw new InputError('Amount cannot be negative');
    }
    this.selected = input.amount;
    return this.cb(input.amount);
  }
}
