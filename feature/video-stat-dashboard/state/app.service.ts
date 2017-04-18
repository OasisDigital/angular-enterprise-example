import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Store } from '@ngrx/store';

import { createVideosArrivedAction, IAppState } from './dashboard-state';
import { IView, IVideo } from './interfaces';
import { VIDEO_LIST } from './mock-video-list';

export { IView, IVideo } from './interfaces';

@Injectable()
export class AppService {

  constructor(store: Store<IAppState>) {
    // Mock: Fetch list of videos and make them available.
    store.dispatch(createVideosArrivedAction(VIDEO_LIST));
  }
}
