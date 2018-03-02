import { Injectable } from '@angular/core';
// import { Actions } from '@ngrx/effects';

@Injectable()
export class VideoStatsEffects {
  // I would prefer to do something roughly like this, but there is not yet an
  // automatic feature level initialization action provided by NgRx.
  // @Effect() startup = this.actions.ofType('@ngrx/store/init')
  //   .pipe(map(_ => ({ type: 'VIDEOS_ARRIVED', payload: VIDEO_LIST })))

  // constructor(private actions: Actions) { }
}
