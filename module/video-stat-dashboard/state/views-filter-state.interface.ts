export interface IViewsFilterState {
  region: string;
  dateTo: number;
  dateFrom: number;
  ageRanges: boolean[]; // true or false for each bracket
}
