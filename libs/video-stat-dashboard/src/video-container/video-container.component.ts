import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { DashboardService } from '../services/dashboard.service';
import { Video } from '../+state/video-stats.interfaces';

@Component({
  selector: 'video-container',
  templateUrl: './video-container.component.html'
})
export class VideoContainerComponent {

  currentVideo: Observable<Video>;

  constructor(dashboardService: DashboardService) {
    this.currentVideo = dashboardService.currentVideo;
  }
}
