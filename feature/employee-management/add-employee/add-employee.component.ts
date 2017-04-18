import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IEmployee } from '@oasisdigital/app-schema';
import { EmployeeApi } from '@oasisdigital/employee-api';

@Component({
  selector: 'add-employee',
  templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent {
  employee: IEmployee;

  constructor(private router: Router, loader: EmployeeApi) {
    this.employee = undefined; // A valid IEmployee, and harmless.
  }

  cancelClicked() {
    this.router.navigate(['/emp-man']);
  }

  saveClicked() {
    
  }

}
