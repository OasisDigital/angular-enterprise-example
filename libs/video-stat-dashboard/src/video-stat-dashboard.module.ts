import { NgModule, InjectionToken } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AgeRangeModule } from '@enterprise-example/age-range';

import { AppService } from './services/app.service';
import { videoStatsReducerMap } from './+state/video-stats.reducer';
import { VideoStats } from './+state/video-stats.interfaces';
import { VideoStatsEffects } from './+state/video-stats.effects';
import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './services/dashboard.service';
import { ViewsFilterService } from './services/views-filter.service';
import { ViewsFilterComponent } from './views-filter/views-filter.component';
import { ViewsFilterDisplayComponent } from './views-filter/views-filter-display.component';
import { VideoContainerComponent } from './video-container/video-container.component';
import { VideoContainerDisplayComponent } from './video-container/video-container-display.component';
import { ViewsBreakdownComponent } from './views-breakdown/views-breakdown.component';
import { ViewsBreakdownDisplayComponent } from './views-breakdown/views-breakdown-display.component';
import { ViewsBreakdownService } from './services/views-breakdown.service';
import { TopListComponent } from './top-list/top-list.component';
import { TopListDisplayComponent } from './top-list/top-list-display.component';
import { TopListService } from './services/top-list.service';
import { FilterStateDisplayComponent } from './views-breakdown/filter-state-display.component';

// The verbosity that replaced combineReducers is documented here:
// https://github.com/ngrx/platform/blob/master/docs/store/api.md#injecting-reducers

export const FEATURE_REDUCER_TOKEN =
  new InjectionToken<ActionReducerMap<VideoStats>>('Feature Reducers');

export function getReducers(): ActionReducerMap<VideoStats> {
  return videoStatsReducerMap;
}
@NgModule({
  declarations: [
    DashboardComponent,
    ViewsFilterComponent,
    ViewsFilterDisplayComponent,
    VideoContainerComponent,
    VideoContainerDisplayComponent,
    ViewsBreakdownComponent,
    ViewsBreakdownDisplayComponent,
    TopListComponent,
    TopListDisplayComponent,
    FilterStateDisplayComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AgeRangeModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: DashboardComponent }
    ]),
    StoreModule.forFeature('videoStats', FEATURE_REDUCER_TOKEN),
    EffectsModule.forFeature([VideoStatsEffects])
  ],
  providers: [
    {
      provide: FEATURE_REDUCER_TOKEN,
      useFactory: getReducers
    },
    AppService,
    TopListService,
    ViewsFilterService,
    DashboardService,
    ViewsBreakdownService,
    VideoStatsEffects
  ]
})
export class VideoStatDashboardModule { }
