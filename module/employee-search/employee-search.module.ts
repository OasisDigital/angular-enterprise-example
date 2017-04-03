import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeeDisplayModule } from '@oasisdigital/employee-display';

import { EmployeeListComponent } from './employee-list/employee-list';
import { EmployeeLoader } from './employee-loader';

const ROUTES: Route[] = [
  { path: 'emp-search', component: EmployeeListComponent }
];

@NgModule({
  declarations: [
    EmployeeListComponent
  ],
  imports: [
    EmployeeDisplayModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    HttpModule
  ],
  bootstrap: [EmployeeListComponent],
  providers: [EmployeeLoader]
})
export class EmployeeSearchModule { }

// emp-search