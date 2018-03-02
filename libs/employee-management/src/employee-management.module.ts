import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeeDisplayModule } from '@enterprise-example/employee-display';
import { EmployeeApiModule } from '@enterprise-example/employee-api';

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
    EmployeeApiModule
  ],
  providers: [
    EmployeeNavigation
  ]
})
export class EmployeeManagementModule { }
