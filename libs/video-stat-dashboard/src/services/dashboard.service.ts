import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter } from 'rxjs/operators';
import { combineLatest } from 'rxjs/observable/combineLatest'

import { VideoStatsState } from '../+state/video-stats.interfaces';
import { Video } from '../+state/video-stats.interfaces';

@Injectable()
export class DashboardService {

  currentVideo: Observable<Video>;

  constructor(private store: Store<VideoStatsState>) {
    this.currentVideo = combineLatest(
      this.store.select(appState => appState.videoStats.currentVideo),
      this.store.select(appState => appState.videoStats.videoList)
        .pipe(filter(x => !!x)),
      (id: string, list: Video[]) => list.find(video => video.id === id));
  }

  setCurrentVideo(id: string) {
    this.store.dispatch({
      type: 'VIDEO_SELECTED',
      payload: id
    });
  }
}
