import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { VideoStatsState } from '../+state/video-stats.interfaces';

@Injectable()
export class TopListService {

  constructor(private store: Store<VideoStatsState>) { }

  getTopList() {
    return this.store.select(state => state.videoStats.videoList);
  }
}
