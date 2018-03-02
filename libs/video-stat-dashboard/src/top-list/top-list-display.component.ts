import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Video } from '../+state/video-stats.interfaces';

@Component({
  selector: 'top-list-display',
  templateUrl: './top-list-display.component.html',
  styleUrls: ['./top-list-display.component.css']
})
export class TopListDisplayComponent {

  @Input() topList: Video[];
  @Input() currentSelectionID: string;
  @Output() setCurrentVideo = new EventEmitter<string>();

  selectVideo(id: string) {
    this.setCurrentVideo.emit(id);
  }
}
