import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

import { TopListService } from '../services/top-list.service';
import { DashboardService } from '../services/dashboard.service';
import { Video } from '../+state/video-stats.interfaces';

@Component({
  selector: 'top-list',
  templateUrl: './top-list.component.html'
})
export class TopListComponent {

  topList: Observable<Video[]>;
  currentSelectionID: Observable<string>;

  constructor(topListService: TopListService, private dashboardService: DashboardService) {
    this.topList = topListService.getTopList();
    this.currentSelectionID = dashboardService.currentVideo
      .pipe(map(video => video && video.id));
  }

  setCurrentVideo(id) {
    this.dashboardService.setCurrentVideo(id);
  }
}
