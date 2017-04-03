import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { IVideo } from '../state/app.service';
import { GraphData } from '../state/views-breakdown.service';

@Component({
  selector: 'views-breakdown-display',
  templateUrl: './views-breakdown-display.component.html'
})
export class ViewsBreakdownDisplayComponent {
  @Input() currentVideo: IVideo;
  @Input() viewsBreakdown: string[];
  @Input() graphData: GraphData[];
}
