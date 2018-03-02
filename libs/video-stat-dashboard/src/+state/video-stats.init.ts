import { ViewsFilterState, ViewsBreakdownState } from './video-stats.interfaces';
import * as moment from 'moment';

export const viewsBreakdownStateInitial: ViewsBreakdownState = {
  selectedAxis: ['age']
};

export const viewsFilterInitialState: ViewsFilterState = {
  region: 'All',
  dateTo: moment().startOf('day').valueOf(),
  dateFrom: moment('1995-01-01').valueOf(),
  ageRanges: [true, true, true, true]
};
