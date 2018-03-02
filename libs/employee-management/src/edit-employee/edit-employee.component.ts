import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { switchMap, share } from 'rxjs/operators';

import { EmployeeApi } from '@enterprise-example/employee-api';

import { EmployeeNavigation } from '../employee-navigation.service';

@Component({
  selector: 'edit-employee',
  templateUrl: './edit-employee.component.html'
})
export class EditEmployeeComponent implements OnDestroy {
  containerFormGroup: FormGroup;
  sub: Subscription;
  id: number;

  constructor(private nav: EmployeeNavigation,
    private api: EmployeeApi, fb: FormBuilder, route: ActivatedRoute) {
    this.nav.calculateModuleBaseRoute(route);
    this.containerFormGroup = fb.group({});

    const employee$ = nav.employeeId(route)
      .pipe(switchMap(id => api.loadOne(id)),
        share());

    this.sub = employee$.subscribe(e => {
      this.id = e.id;
      const { first_name, last_name, email, hourly_wage } = e;
      const hours_worked = e.hours_worked || 0;
      this.containerFormGroup.setValue({
        employee: { first_name, last_name, email, hourly_wage, hours_worked }
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  cancelClicked() {
    this.nav.list();
  }

  saveClicked() {
    this.api.save({
      ...this.containerFormGroup.value.employee,
      id: this.id
    }).subscribe(_x => this.nav.list());
  }

  deleteClicked() {
    this.api.delete(this.id).subscribe(_x => this.nav.list());
  }
}
