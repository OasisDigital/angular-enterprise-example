import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { IVideo } from '../state/app.service';

const URLPREFIX = 'https://www.youtube.com/embed/';

@Component({
  selector: 'video-container-display',
  templateUrl: './video-container-display.component.html'
})
export class VideoContainerDisplayComponent implements OnChanges {

  @Input() currentVideo: IVideo;
  currentVideoUrl: SafeUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges) {
    // good use of ngOnChanges - wire data through, around default sanitization
    if (changes['currentVideo'] && changes['currentVideo'].currentValue) {
      const incomingVideo = changes['currentVideo'].currentValue as IVideo;
      this.currentVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(URLPREFIX + incomingVideo.id);
    }
  }
}
