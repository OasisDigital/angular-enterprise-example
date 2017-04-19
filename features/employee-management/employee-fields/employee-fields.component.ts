import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'employee-fields',
  templateUrl: './employee-fields.component.html'
})
export class EmployeeFieldsComponent implements OnInit {
  @Input()
  parentFormGroup: FormGroup;
  fg: FormGroup;

  constructor(fb: FormBuilder) {
    this.fg = fb.group({
      'first_name': ['', Validators.required],
      'last_name': ['', [Validators.required, Validators.minLength(3)]],
      'email': [''],
      'hours_worked': ['', [Validators.required, Validators.pattern('[0-9]+')]],
      'hourly_wage': ['', [Validators.required, Validators.pattern('[0-9]+')]]
    });
  }

  ngOnInit() {
    this.parentFormGroup.addControl('employee', this.fg);
  }
}
