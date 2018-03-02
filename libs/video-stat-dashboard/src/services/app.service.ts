import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { VideoStatsState } from '../+state/video-stats.interfaces';
import { VIDEO_LIST } from './mock-video-list';

@Injectable()
export class AppService {

  constructor(store: Store<VideoStatsState>) {
    // Mock: Fetch list of videos and make them available.
    store.dispatch({ type: 'VIDEOS_ARRIVED', payload: VIDEO_LIST });
    // this logic should arguably be something automatic upon loading of the
    // "future", but that capability is not yet provided by NgRx.
  }
}
