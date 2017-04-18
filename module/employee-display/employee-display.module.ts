import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { EmployeeDetailViewComponent } from './employee-detail-view/employee-detail-view.component';
import { EmployeeListTableViewComponent } from './employee-list-table-view/employee-list-table-view.component';

@NgModule({
  declarations: [
    EmployeeDetailViewComponent,
    EmployeeListTableViewComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    EmployeeDetailViewComponent,
    EmployeeListTableViewComponent
  ]
})
export class EmployeeDisplayModule { }
