import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NxModule } from '@nrwl/nx';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
// import { StoreRouterConnectingModule } from '@ngrx/router-store';

const ROUTES = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'video-stat-dashboard'
  },
  {
    path: 'employee-list',
    loadChildren: '@enterprise-example/employee-list#EmployeeListModule'
  },
  {
    path: 'employee-management',
    loadChildren: '@enterprise-example/employee-management#EmployeeManagementModule'
  },
  {
    path: 'employee-search',
    loadChildren: '@enterprise-example/employee-search#EmployeeSearchModule'
  },
  {
    path: 'fruit-basket',
    loadChildren: '@enterprise-example/fruit-basket#FruitBasketModule'
  },
  {
    path: 'video-stat-dashboard',
    loadChildren: '@enterprise-example/video-stat-dashboard#VideoStatDashboardModule'
  }
];

@NgModule({
  imports: [
    BrowserModule,
    NxModule.forRoot(),
    RouterModule.forRoot(ROUTES, { initialNavigation: 'enabled' }),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    // StoreRouterConnectingModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
