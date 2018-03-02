import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';

import { EmployeeDisplayModule } from '@enterprise-example/employee-display';
import { EmployeeApiModule } from '@enterprise-example/employee-api';

import { EmployeeListComponent } from './employee-list/employee-list.component';

const ROUTES: Route[] = [
  { path: '', component: EmployeeListComponent }
];

@NgModule({
  declarations: [
    EmployeeListComponent
  ],
  imports: [
    EmployeeDisplayModule,
    CommonModule,
    ReactiveFormsModule,
    EmployeeApiModule,
    RouterModule.forChild(ROUTES)
  ],
  providers: []
})
export class EmployeeSearchModule { }
