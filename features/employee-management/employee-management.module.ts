import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import { EmployeeDisplayModule } from '@oasisdigital/employee-display';
import { EmployeeApi } from '@oasisdigital/employee-api';

import { ROUTER_MODULE, ROUTED_COMPONENTS } from './employee-management.routes';
import { EmployeeNavigation } from './employee-navigation.service';

@NgModule({
  declarations: [
    ...ROUTED_COMPONENTS
  ],
  imports: [
    EmployeeDisplayModule,
    CommonModule,
    ReactiveFormsModule,
    ROUTER_MODULE,
    HttpModule
  ],
  providers: [
    EmployeeNavigation,
    EmployeeApi
  ]
})
export class EmployeeManagementModule { }
