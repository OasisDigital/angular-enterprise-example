import { Action } from '@ngrx/store';

// This example shows an older approach, which uses classes that are nonetheless
// acceptable in the sense of being serializable and de-serializable, because
// their class type/prototype does not actually matter. Just the data inside.

export interface AppState {
  fruit: FruitState;
}

export interface FruitState {
  berryCounter: number;
  appleCounter: number;
}

const PICK_BERRY = 'PICK_BERRY';
export class PickBerryAction implements Action {
  type = PICK_BERRY;
}

const PICK_APPLES = 'PICK_APPLES';
export class PickApplesAction implements Action {
  type = PICK_APPLES;
  constructor(public payload: number) { }
}

const EMPTY_CART = 'EMPTY_CART';
export class EmptyCartAction implements Action {
  type = EMPTY_CART;
}

function berryCounterReducer
  (value: number = 0, action: Action): number {
  switch (action.type) {
    case PICK_BERRY:
      return value + 1;

    case EMPTY_CART:
      return 0;

    default:
      return value;
  }
}

function appleCounterReducer(value: number = 0, action: Action): number {
  switch (action.type) {
    // If you have too many apples, they spill and you lose them all.
    case PICK_APPLES:
      const apples = value + (action as PickApplesAction).payload;
      return apples > 10 ? 0 : apples;

    case EMPTY_CART:
      return 0;

    default:
      return value;
  }
}

export const fruitReducerMap = {
  berryCounter: berryCounterReducer,
  appleCounter: appleCounterReducer
};
