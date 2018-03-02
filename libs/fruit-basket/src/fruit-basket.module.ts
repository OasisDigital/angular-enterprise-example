import { NgModule, InjectionToken } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StoreModule, ActionReducerMap } from '@ngrx/store';

import { BasketUiComponent } from './basket-ui/basket-ui.component';
import { CounterDisplayComponent } from './counter-display/counter-display.component';
import { fruitReducerMap, FruitState } from './state/state';

// The verbosity that replaced combineReducers is documented here:
// https://github.com/ngrx/platform/blob/master/docs/store/api.md#injecting-reducers

export const FEATURE_REDUCER_TOKEN =
  new InjectionToken<ActionReducerMap<FruitState>>('Feature Reducers');

export function getReducers(): ActionReducerMap<FruitState> {
  return fruitReducerMap;
}

const ROUTES: Route[] = [
  { path: '', pathMatch: 'full', component: BasketUiComponent }
];

@NgModule({
  declarations: [
    BasketUiComponent,
    CounterDisplayComponent
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('fruit', FEATURE_REDUCER_TOKEN),
    RouterModule.forChild(ROUTES)
  ],
  providers: [
    {
      provide: FEATURE_REDUCER_TOKEN,
      useFactory: getReducers
    }
  ]
})
export class FruitBasketModule { }
