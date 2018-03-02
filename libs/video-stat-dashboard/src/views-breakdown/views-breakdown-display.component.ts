import { Component, Input } from '@angular/core';

import { Video } from '../+state/video-stats.interfaces';
import { GraphData } from '../services/views-breakdown.service';

@Component({
  selector: 'views-breakdown-display',
  templateUrl: './views-breakdown-display.component.html'
})
export class ViewsBreakdownDisplayComponent {
  @Input() currentVideo: Video;
  @Input() viewsBreakdown: string[];
  @Input() graphData: GraphData[];
}
