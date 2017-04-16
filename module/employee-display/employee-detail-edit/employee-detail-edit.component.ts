import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IEmployee } from '../employee';

@Component({
  selector: 'employee-detail-edit',
  templateUrl: './employee-detail-edit.component.html'
})
export class EmployeeDetailEditComponent implements OnChanges {
  @Input() employee: IEmployee;

  fg: FormGroup;

  constructor(fb: FormBuilder) {
    this.fg = fb.group({
      'first_name': ['', Validators.required],
      'last_name': ['', [Validators.minLength(3), Validators.required]],
      'email': [''],
      'hourly_wage': ['']
    });
  }

  ngOnChanges() {
    if (this.employee && this.employee.first_name) {
      const { first_name, last_name, email, hourly_wage } = this.employee;
      this.fg.setValue({ first_name, last_name, email, hourly_wage });
    }
  }

  save() {
    
  }
}
