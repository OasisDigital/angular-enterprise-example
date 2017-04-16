import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/distinctUntilChanged';

import { IAppState } from './dashboard-state';
import {
  CHANGE_REGION,
  CHANGE_DATE_FROM,
  CHANGE_DATE_TO,
  TOGGLE_AGE
} from './views-filter-state';

@Injectable()
export class ViewsFilterService {

  filterState = this.store.select(state => state.dashboard.viewsFilter);
  region = this.store.select(state => state.dashboard.viewsFilter.region);
  dateFrom = this.store.select(state => state.dashboard.viewsFilter.dateFrom);
  dateTo = this.store.select(state => state.dashboard.viewsFilter.dateTo);
  age = this.store.select(state => state.dashboard.viewsFilter.ageRanges);

  constructor(private store: Store<IAppState>) { }

  setRegion(region: string) {
    this.store.dispatch({
      type: CHANGE_REGION,
      payload: region
    });
  }

  setDateFrom(dateFrom) {
    this.store.dispatch({
      type: CHANGE_DATE_FROM,
      payload: dateFrom
    });
  }

  setDateTo(dateTo) {
    this.store.dispatch({
      type: CHANGE_DATE_TO,
      payload: dateTo
    });
  }

  toggleAge(index) {
    this.store.dispatch({
      type: TOGGLE_AGE,
      payload: index
    });
  }
}
