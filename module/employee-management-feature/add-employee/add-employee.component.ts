import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IEmployee } from '@oasisdigital/employee-display';
import { EmployeeLoader } from '@oasisdigital/employee-loader';

@Component({
  selector: 'add-employee',
  templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent {

  employee: IEmployee;

  constructor(private router: Router, loader: EmployeeLoader) {
    this.employee = undefined;
  }

  cancelClicked() {
    this.router.navigate(['/emp-man']);
  }

  saveClicked() {
    // this.editing.emit(false);
  }

}
