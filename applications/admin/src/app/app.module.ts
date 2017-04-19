import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { DashboardModule, AppService } from '@oasisdigital/video-stat-dashboard';
import { FruitBasketModule } from '@oasisdigital/fruit-basket';

import { reducer } from './app-state';
import { AppComponent } from './app.component';

const ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'videos'
  },
  {
    path: 'emp-list',
    loadChildren: '@oasisdigital/employee-list#EmployeeListModule'
  },
  {
    path: 'emp-search',
    loadChildren: '@oasisdigital/employee-search#EmployeeSearchModule'
  },
  {
    path: 'emp-man',
    loadChildren: '@oasisdigital/employee-management#EmployeeManagementModule'
  }
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
    StoreDevtoolsModule.instrumentOnlyWithExtension({ maxAge: 10 }),
    DashboardModule,
    FruitBasketModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
