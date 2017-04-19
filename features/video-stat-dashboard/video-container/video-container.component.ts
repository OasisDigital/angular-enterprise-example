import { Component, OnChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IAppState } from '../state/dashboard-state';
import { DashboardService } from '../state/dashboard.service';
import { IVideo } from '../state/app.service';

@Component({
  selector: 'video-container',
  templateUrl: './video-container.component.html'
})
export class VideoContainerComponent {

  currentVideo: Observable<IVideo>;

  constructor(dashboardService: DashboardService) {
    this.currentVideo = dashboardService.currentVideo;
  }
}
