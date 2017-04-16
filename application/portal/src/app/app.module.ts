import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Route } from '@angular/router';
import { NgModule } from '@angular/core';

import { EmployeeSearchModule } from '@oasisdigital/employee-search-feature';

import { AppComponent } from './app.component';

const ROUTES: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'emp-search'
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    EmployeeSearchModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
