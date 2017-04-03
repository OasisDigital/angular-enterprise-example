import { Action } from '@ngrx/store';
import * as moment from 'moment';

import { IViewsFilterState } from './views-filter-state.interface';
export { IViewsFilterState } from './views-filter-state.interface';

const defaultState: IViewsFilterState = {
  region: 'All',
  dateTo: moment().startOf('day').valueOf(),
  dateFrom: moment('1995-01-01').valueOf(),
  ageRanges: [true, true, true, true]
};

// TODO just one action to control demo age ranges; then delete all remaining
// copies of code that switches between them. Favor data over code. Express list
// in one place only.

export const CHANGE_REGION = 'CHANGE_REGION';
export const CHANGE_DATE_FROM = 'CHANGE_DATE_FROM';
export const CHANGE_DATE_TO = 'CHANGE_DATE_TO';
export const TOGGLE_AGE = 'CHANGE_AGE';

export const viewsFilter = (previousState: IViewsFilterState = defaultState, action: Action): IViewsFilterState => {
  switch (action.type) {
    case CHANGE_REGION:
      return Object.assign({}, previousState, { region: action.payload });
    case CHANGE_DATE_FROM:
      return Object.assign({}, previousState, { dateFrom: action.payload });
    case CHANGE_DATE_TO:
      return Object.assign({}, previousState, { dateTo: action.payload });
    case TOGGLE_AGE:
      const ageRanges = previousState.ageRanges.slice();  // clone
      ageRanges[action.payload] = !ageRanges[action.payload];
      return Object.assign({}, previousState, { ageRanges });
    default:
      return previousState;
  }
};
