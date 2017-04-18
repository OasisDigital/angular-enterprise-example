import { combineReducers, Action } from '@ngrx/store';

export interface IViewsBreakdownState {
  selectedAxis: string[];
}

const DEFAULT_VIEWS_BREAKDOWN_STATE = {
  selectedAxis: ['age']
};

const ADD_NEW_GRAPH_AXIS = 'ADD_NEW_GRAPH_AXIS';
export function createNewGraphAxisAction(axis: string): Action {
  return {
    type: ADD_NEW_GRAPH_AXIS,
    payload: axis
  };
}

export const viewsBreakdown =
  (prevState: IViewsBreakdownState = DEFAULT_VIEWS_BREAKDOWN_STATE, action: Action): IViewsBreakdownState => {
    switch (action.type) {
      case ADD_NEW_GRAPH_AXIS:
        const selectedAxis = [...prevState.selectedAxis, action.payload];
        return Object.assign({}, prevState, { selectedAxis });
      default:
        return prevState;
    }
  };
