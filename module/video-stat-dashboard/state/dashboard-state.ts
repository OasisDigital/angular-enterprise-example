import { combineReducers, Action } from '@ngrx/store';

import { IViewsFilterState, viewsFilter } from './views-filter-state';
import { IViewsBreakdownState, viewsBreakdown } from './views-breakdown-state';
import { IVideo } from './interfaces';

// The app state and dashboard state are linked together, more than we would
// prefer. There is an upcoming "fractal state" feature in Store to help with
// this.

export interface IAppState {
  dashboard: IDashboardState;
}


export interface IDashboardState {
  videoList: IVideo[];
  viewsFilter: IViewsFilterState;
  currentVideo: string;
  viewsBreakdown: IViewsBreakdownState;
  topList: string[];
}

const VIDEOS_ARRIVED = 'VIDEOS_ARRIVED';

export const createVideosArrivedAction = (videoList: IVideo[]): Action => {
  return {
    type: VIDEOS_ARRIVED,
    payload: videoList
  };
};

const videoList = (state: IVideo[] = [], action: Action) => {
  switch (action.type) {
    case VIDEOS_ARRIVED:
      return action.payload;
    default:
      return state;
  }
};

const VIDEO_SELECTED = 'VIDEO_SELECTED';
export const createVideoSelectedAction = (id: string): Action => {
  return {
    type: VIDEO_SELECTED,
    payload: id
  };
};

const currentVideo = (prevState: string = undefined, action: Action): string => {
  switch (action.type) {
    case VIDEO_SELECTED:
      return action.payload;
    default:
      return prevState;
  }
};

const topList = (prevState: string[] = [], action: Action): string[] => {
  switch (action.type) {
    default:
      return prevState;
  }
};

export const dashboardReducer = combineReducers({
  videoList,
  viewsFilter,
  currentVideo,
  viewsBreakdown,
  topList
});
