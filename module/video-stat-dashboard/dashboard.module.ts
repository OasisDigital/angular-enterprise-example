import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AgeRangeModule } from '@oasisdigital/age-range';

import { DashboardComponent } from './dashboard.component';
import { DashboardService } from './state/dashboard.service';
import { ViewsFilterService } from './state/views-filter.service';
import { ViewsFilterComponent } from './views-filter/views-filter.component';
import { ViewsFilterDisplayComponent } from './views-filter/views-filter-display.component';
import { VideoContainerComponent } from './video-container/video-container.component';
import { VideoContainerDisplayComponent } from './video-container/video-container-display.component';
import { ViewsBreakdownComponent } from './views-breakdown/views-breakdown.component';
import { ViewsBreakdownDisplayComponent } from './views-breakdown/views-breakdown-display.component';
import { ViewsBreakdownService } from './state/views-breakdown.service';
import { TopListComponent } from './top-list/top-list.component';
import { TopListDisplayComponent } from './top-list/top-list-display.component';
import { TopListService } from './state/top-list.service';
import { FilterStateDisplayComponent } from './views-breakdown/filter-state-display.component';

const ROUTES: Route[] = [
  { path: 'videos', component: DashboardComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    AgeRangeModule
  ],
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
  providers: [
    TopListService,
    ViewsFilterService,
    DashboardService,
    ViewsBreakdownService
  ]
})
export class DashboardModule { }
