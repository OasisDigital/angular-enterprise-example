import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';

import { ViewsFilterService } from '../state/views-filter.service';
import { IViewsFilterState } from '../state/views-filter-state';
import { IVideo } from '../state/app.service';
import { DashboardService } from '../state/dashboard.service';
import { ViewsBreakdownService, GraphData } from '../state/views-breakdown.service';

@Component({
  selector: 'views-breakdown',
  templateUrl: './views-breakdown.component.html'
})
export class ViewsBreakdownComponent {
  viewsFilterState: Observable<IViewsFilterState>;
  currentVideo: Observable<IVideo>;
  viewsBreakdown: Observable<string[]>;
  graphData: Observable<GraphData[]>;

  // Could be used as ngModel example if desired.
  newGraph: FormControl = new FormControl('age');

  constructor(
    viewsFilterService: ViewsFilterService,
    dashboardService: DashboardService,
    private viewsBreakdownService: ViewsBreakdownService) {
    this.viewsFilterState = viewsFilterService.filterState;
    this.currentVideo = dashboardService.currentVideo;
    this.viewsBreakdown = viewsBreakdownService.getBreakdowns();
    this.graphData = viewsBreakdownService.getGraphData();
  }

  addNewGraph() {
    this.viewsBreakdownService.addNewGraphAxis(this.newGraph.value);
  }

  removeGroup(group: number) {
    this.viewsBreakdownService.removeGroup(group);
  }
}
