export interface ViewsBreakdownState {
  selectedAxis: string[];
}

export interface View {
  age: number;
  region: string;
  date: string;
}

export interface Video {
  title: string;
  author: string;
  id: string;
  viewDetails: View[];
}

export interface ViewsFilterState {
  region: string;
  dateTo: number;
  dateFrom: number;
  ageRanges: boolean[]; // bit for each bracket
}

export interface VideoStats {
  videoList: Video[];
  viewsFilter: ViewsFilterState;
  currentVideo: string;
  viewsBreakdown: ViewsBreakdownState;
  topList: string[];
}

export interface VideoStatsState {
  readonly videoStats: VideoStats;
}
