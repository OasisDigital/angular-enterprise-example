import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { VideoStatsState } from '../+state/video-stats.interfaces';

@Injectable()
export class ViewsFilterService {

  filterState = this.store.select(state => state.videoStats.viewsFilter);
  region = this.store.select(state => state.videoStats.viewsFilter.region);
  dateFrom = this.store.select(state => state.videoStats.viewsFilter.dateFrom);
  dateTo = this.store.select(state => state.videoStats.viewsFilter.dateTo);
  age = this.store.select(state => state.videoStats.viewsFilter.ageRanges);

  constructor(private store: Store<VideoStatsState>) { }

  setRegion(region: string) {
    this.store.dispatch({
      type: 'CHANGE_REGION',
      payload: region
    });
  }

  setDateFrom(dateFrom: number) {
    this.store.dispatch({
      type: 'CHANGE_DATE_FROM',
      payload: dateFrom
    });
  }

  setDateTo(dateTo: number) {
    this.store.dispatch({
      type: 'CHANGE_DATE_TO',
      payload: dateTo
    });
  }

  toggleAge(index: number) {
    this.store.dispatch({
      type: 'TOGGLE_AGE',
      payload: index
    });
  }
}
