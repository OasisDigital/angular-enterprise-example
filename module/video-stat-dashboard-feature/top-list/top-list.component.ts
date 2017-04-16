import { Component, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { TopListService } from '../state/top-list.service';
import { DashboardService } from '../state/dashboard.service';
import { IVideo } from '../state/app.service';

@Component({
  selector: 'top-list',
  templateUrl: './top-list.component.html'
})
export class TopListComponent {

  topList: Observable<IVideo[]>;
  currentSelectionID: Observable<string>;

  constructor(topListService: TopListService, private dashboardService: DashboardService) {
    this.topList = topListService.getTopList();
    this.currentSelectionID = dashboardService.currentVideo
      .map(video => video && video.id);
  }

  setCurrentVideo(id) {
    this.dashboardService.setCurrentVideo(id);
  }
}
