import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { EmployeeListModule } from '@oasisdigital/employee-list-feature';
import { EmployeeManagementModule } from '@oasisdigital/employee-management';
import { EmployeeSearchModule } from '@oasisdigital/employee-search-feature';
import { DashboardModule, AppService } from '@oasisdigital/video-stat-dashboard-feature';
import { FruitBasketModule } from '@oasisdigital/fruit-basket-feature';

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
    FruitBasketModule,
    EmployeeListModule,
    EmployeeManagementModule,
    EmployeeSearchModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
