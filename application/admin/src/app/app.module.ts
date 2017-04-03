import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { EmployeeSearchModule } from '@oasisdigital/employee-search';

import { DashboardModule, AppService } from '@oasisdigital/video-stat-dashboard';
import { reducer } from './app-state';

import { AppComponent } from './app.component';

const ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'videos'
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    StoreModule.provideStore(reducer),
    StoreDevtoolsModule.instrumentOnlyWithExtension({ maxAge: 5 }),
    DashboardModule,
    EmployeeSearchModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
