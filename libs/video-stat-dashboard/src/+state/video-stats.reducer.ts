import { ViewsFilterState, ViewsBreakdownState, Video } from './video-stats.interfaces';
import { VideoStatsAction } from './video-stats.actions';
import { viewsFilterInitialState, viewsBreakdownStateInitial } from './video-stats.init';

const viewsBreakdown =
  (prevState: ViewsBreakdownState = viewsBreakdownStateInitial, action: VideoStatsAction): ViewsBreakdownState => {
    switch (action.type) {
      case 'ADD_NEW_GRAPH_AXIS':
        const selectedAxis = [...prevState.selectedAxis, action.payload];
        return Object.assign({}, prevState, { selectedAxis });
      default:
        return prevState;
    }
  };

const viewsFilter = (previousState: ViewsFilterState = viewsFilterInitialState,
  action: VideoStatsAction): ViewsFilterState => {
  switch (action.type) {
    case 'CHANGE_REGION':
      return Object.assign({}, previousState, { region: action.payload });
    case 'CHANGE_DATE_FROM':
      return Object.assign({}, previousState, { dateFrom: action.payload });
    case 'CHANGE_DATE_TO':
      return Object.assign({}, previousState, { dateTo: action.payload });
    case 'TOGGLE_AGE':
      const ageRanges = previousState.ageRanges.slice();  // clone
      ageRanges[action.payload] = !ageRanges[action.payload];
      return Object.assign({}, previousState, { ageRanges });
    default:
      return previousState;
  }
};

const videoList = (state: Video[] = [], action: VideoStatsAction) => {
  switch (action.type) {
    case 'VIDEOS_ARRIVED':
      return action.payload;
    default:
      return state;
  }
};

const currentVideo = (prevState: string = undefined, action: VideoStatsAction): string => {
  switch (action.type) {
    case 'VIDEO_SELECTED':
      return action.payload;
    default:
      return prevState;
  }
};

const topList = (prevState: string[] = [], action: VideoStatsAction): string[] => {
  switch (action.type) {
    default:
      return prevState;
  }
};

export const videoStatsReducerMap = {
  videoList,
  viewsFilter,
  currentVideo,
  viewsBreakdown,
  topList
};
