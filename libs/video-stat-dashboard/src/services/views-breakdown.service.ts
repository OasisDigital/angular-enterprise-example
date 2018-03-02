import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { countBy, forEach, maxBy } from 'lodash';
import * as moment from 'moment';
import { combineLatest } from 'rxjs/observable/combineLatest'

import { ageRanges } from '@enterprise-example/age-range';

import { VideoStatsState } from '../+state/video-stats.interfaces';
import { View, ViewsFilterState } from '../+state/video-stats.interfaces';
import { DashboardService } from './dashboard.service';
import { ViewsFilterService } from './views-filter.service';

const GRAPH_HEIGHT = 200;
const GRAPH_WIDTH = 500;

export class Rect {
  x: number;
  y: number;
  width: number;
  height: number;

  constructor(public value: any, public count: number) { }
}

export class GraphData {
  rectList: Rect[];
  width: number;
  height: number;

  constructor(public xAxis: string, views: View[], viewsFilter: ViewsFilterState) {
    this.height = GRAPH_HEIGHT;
    this.width = GRAPH_WIDTH;
    this.rectList = this.calcRectList(views, viewsFilter);
  }

  // In order to create the bars in the bar chart we need to perform the following
  // 1. Filter any values based on user input
  // 2. Identify all of the unique values associated with the xAxis
  // 3. Count the number of views associated with each values
  // 4. Determine the largest of these categories
  // 5. Scale all counts based on largest and the graph height
  // 6. Divide the width of the graph amongst the number of unique values
  // 7. Assign widths and x positions accordingly
  calcRectList(views: View[], viewsFilter: ViewsFilterState) {
    const rects: Rect[] = [];
    const filteredViews = filterViews(views, viewsFilter);
    if (filteredViews.length) {
      const groups = countBy(filteredViews, this.xAxis);
      forEach(groups, (value, key) => {
        rects.push(new Rect(key, value));
      });
      // rects now have value and count
      const maxValue = maxBy(rects, 'count').count;
      const width = (GRAPH_WIDTH / rects.length) - 1;
      rects.forEach((rect, index) => {
        rect.height = calcHeight(maxValue, rect.count, GRAPH_HEIGHT);
        rect.y = GRAPH_HEIGHT - rect.height;
        rect.width = width;
        rect.x = index * width;
      });
    }
    return rects;
  }
}

@Injectable()
export class ViewsBreakdownService {

  constructor(private store: Store<VideoStatsState>,
    private dashboardService: DashboardService,
    private viewsFilterService: ViewsFilterService) { }

  getBreakdowns() {
    return this.store.select(state => state.videoStats.viewsBreakdown
      && state.videoStats.viewsBreakdown.selectedAxis);
  }

  getGraphData() {
    const currentVideo = this.dashboardService.currentVideo;
    const viewsFilter = this.viewsFilterService.filterState;
    return combineLatest(currentVideo, this.getBreakdowns(), viewsFilter,
      (cv, breakdowns, viewsFilterState) => {
        const graphs: GraphData[] = [];
        if (cv && cv.viewDetails) {
          breakdowns.forEach(breakDown => graphs.push(new GraphData(breakDown, cv.viewDetails, viewsFilterState)));
        }
        return graphs;
      });
  }

  addNewGraphAxis(axis: string) {
    this.store.dispatch({ type: 'ADD_NEW_GRAPH_AXIS', payload: axis });
  }

  removeGroup(group: number) {
    this.store.dispatch({ type: 'TOGGLE_AGE', payload: group });
  }
}

function calcHeight(maxValue: number, value: number, graphHeight: number) {
  return Math.floor(value / maxValue * graphHeight);
}

function filterViews(views: View[], viewsFilter: ViewsFilterState) {
  const fromDate = moment(viewsFilter.dateFrom);
  const toDate = moment(viewsFilter.dateTo);

  const filteredResults = views.filter(view => {
    // Age range
    if (!ageRanges.find((range, index) =>
      view.age >= range.lower && view.age < range.upper && viewsFilter.ageRanges[index])) {
      return false;
    }

    // Check the region
    if (viewsFilter.region !== view.region && viewsFilter.region !== 'All') {
      return false;
    }

    // Check the view date
    const videoDate = moment(view.date);
    return videoDate.isBetween(fromDate, toDate);
  });
  return filteredResults;
}
