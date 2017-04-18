import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Route } from '@angular/router';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import { EmployeeDisplayModule } from '@oasisdigital/employee-display';
import { EmployeeApi } from '@oasisdigital/employee-api';

import { ManagementScreenComponent } from './management-screen/management-screen.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';

const ROUTES: Route[] = [
  { path: 'emp-man/add', component: AddEmployeeComponent },
  { path: 'emp-man/:id', component: EditEmployeeComponent },
  { path: 'emp-man', component: ManagementScreenComponent }
];

@NgModule({
  declarations: [
    ManagementScreenComponent,
    AddEmployeeComponent,
    EditEmployeeComponent
  ],
  imports: [
    EmployeeDisplayModule,
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(ROUTES),
    HttpModule
  ],
  providers: [EmployeeApi]
})
export class EmployeeManagementModule { }
