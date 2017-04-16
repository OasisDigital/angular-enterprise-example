import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

import { IVideo } from '../state/app.service';

@Component({
  selector: 'top-list-display',
  templateUrl: './top-list-display.component.html',
  styleUrls: ['./top-list-display.component.css']
})
export class TopListDisplayComponent implements OnChanges {

  @Input() topList: IVideo[];
  @Input() currentSelectionID: string;
  @Output() setCurrentVideo = new EventEmitter<string>();

  selectVideo(id: string) {
    this.setCurrentVideo.emit(id);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['topList'] && changes['topList'].currentValue) {
      const newList = changes['topList'].currentValue as IVideo[];
      // TODO - not wise to emit an action based on UI change!
      this.setCurrentVideo.emit(newList[0].id);
    }
  }
}
