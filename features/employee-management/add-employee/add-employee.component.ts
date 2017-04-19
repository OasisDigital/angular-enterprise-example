import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IEmployee } from '@oasisdigital/app-schema';
import { EmployeeApi } from '@oasisdigital/employee-api';

import { EmployeeNavigation } from '../employee-navigation.service';

@Component({
  selector: 'add-employee',
  templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent {
  fg: FormGroup;

  constructor(private api: EmployeeApi, private nav: EmployeeNavigation,
    fb: FormBuilder, route: ActivatedRoute) {
    this.nav.calculateModuleBaseRoute(route);
    this.fg = fb.group({});
  }

  cancelClicked() {
    this.nav.list();
  }

  saveClicked() {
    this.api.saveNew({
      ...this.fg.value.employee
    }).subscribe(x => this.nav.list());
  }
}
