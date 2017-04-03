import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeDetailComponent } from './employee-detail-view/employee-detail-view';
import { EmployeeListTableViewComponent } from './employee-list-table-view/employee-list-table-view';

@NgModule({
  declarations: [
    EmployeeDetailComponent,
    EmployeeListTableViewComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    EmployeeDetailComponent,
    EmployeeListTableViewComponent
  ]
})
export class EmployeeDisplayModule { }
