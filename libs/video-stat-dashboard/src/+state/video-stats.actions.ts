import { Video } from './video-stats.interfaces';

export interface AddNewGraphAxis {
  type: 'ADD_NEW_GRAPH_AXIS';
  payload: string;
}

export interface ChangeRegion {
  type: 'CHANGE_REGION';
  payload: string;
}

export interface ChangeDateFrom {
  type: 'CHANGE_DATE_FROM';
  payload: number;
}

export interface ChangeDateTo {
  type: 'CHANGE_DATE_TO';
  payload: number;
}

export interface ToggleAge {
  type: 'TOGGLE_AGE';
  payload: number;
}

export interface VideosArrived {
  type: 'VIDEOS_ARRIVED';
  payload: Video[];
}

export interface VideosSelected {
  type: 'VIDEO_SELECTED';
  payload: string;
}

export type VideoStatsAction = AddNewGraphAxis | ChangeRegion | ChangeDateFrom | ChangeDateTo | ToggleAge | VideosArrived | VideosSelected;
