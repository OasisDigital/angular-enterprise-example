import { Action } from '@ngrx/store';

const PICK_BERRY = 'PICK_BERRY';
const PICK_APPLE = 'PICK_APPLE';
const PICK_APPLES = 'PICK_APPLES';
const EMPTY_CART = 'EMPTY_CART';

export interface IAppState {
  fruit: FruitState;
}

export interface FruitState {
  berryCounter: number;
  appleCounter: number;
}

export class PickBerryAction implements Action {
  type = PICK_BERRY;
}

export class PickAppleAction implements Action {
  type = PICK_APPLE;
}

export class PickApplesAction implements Action {
  type = PICK_APPLES;
  constructor(public payload: number) { }
}

export class EmptyCartAction implements Action {
  type = EMPTY_CART;
}

export const berryCounterReducer =
  (value: number = 0, action: Action) => {
    switch (action.type) {
      case PICK_BERRY:
        return value + 1;

      case EMPTY_CART:
        return 0;

      default:
        return value;
    }
  };

export const appleCounterReducer = (value: number = 0, action: Action) => {
  switch (action.type) {
    // If you have too many apples, they spill and you lose them all.
    case PICK_APPLE:
      const x = value + 1;
      return x > 10 ? 0 : x;

    case PICK_APPLES:
      const pickAction = action as PickApplesAction;
      const y = value + pickAction.payload;
      return y > 10 ? 0 : y;

    case EMPTY_CART:
      return 0;

    default:
      return value;
  }
};

export const fruitReducerMap = {
  berryCounter: berryCounterReducer,
  appleCounter: appleCounterReducer
};
