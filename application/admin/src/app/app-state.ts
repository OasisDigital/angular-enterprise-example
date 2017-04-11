import { Store, Action, combineReducers } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';

import { dashboardReducer } from '@oasisdigital/video-stat-dashboard';
import { fruitReducer } from '@oasisdigital/fruit-basket';

import { environment } from '../environments/environment';

const metaReducers = environment.production
  ? [combineReducers]
  : [storeFreeze, combineReducers];

// Form the app level reducer, which composes the reducer of all the pieces.
const reducers = compose(...metaReducers)({
  dashboard: dashboardReducer,
  fruit: fruitReducer
});

export function reducer(state: any, action: any) {
  return reducers(state, action);
}
