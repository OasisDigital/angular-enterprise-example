import { Component} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { EmployeeApi } from '@enterprise-example/employee-api';

import { EmployeeNavigation } from '../employee-navigation.service';

@Component({
  selector: 'add-employee',
  templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent {
  containerFormGroup: FormGroup;

  constructor(private api: EmployeeApi, private nav: EmployeeNavigation,
    fb: FormBuilder, route: ActivatedRoute) {
    this.nav.calculateModuleBaseRoute(route);
    this.containerFormGroup = fb.group({});
  }

  cancelClicked() {
    this.nav.list();
  }

  saveClicked() {
    this.api.saveNew({
      ...this.containerFormGroup.value.employee
    }).subscribe(_x => this.nav.list());
  }
}
