import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { RouterModule, Route } from '@angular/router';

import { EmployeeDisplayModule } from '@oasisdigital/employee-display';
import { EmployeeLoader } from '@oasisdigital/employee-loader';

import { EmployeeListComponent } from './employee-list/employee-list.component';

const ROUTES: Route[] = [
  { path: 'emp-list', component: EmployeeListComponent }
];

@NgModule({
  declarations: [
    EmployeeListComponent
  ],
  imports: [
    EmployeeDisplayModule,
    CommonModule,
    RouterModule.forChild(ROUTES),
    HttpModule
  ],
  bootstrap: [EmployeeListComponent],
  providers: [EmployeeLoader]
})
export class EmployeeListModule { }
