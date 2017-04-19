import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IEmployee } from '@oasisdigital/app-schema';
import { EmployeeApi } from '@oasisdigital/employee-api';

import { EmployeeNavigation } from '../employee-navigation.service';

@Component({
  selector: 'edit-employee',
  templateUrl: './edit-employee.component.html'
})
export class EditEmployeeComponent implements OnDestroy {
  fg: FormGroup;
  sub: Subscription;
  id: number;

  constructor(private nav: EmployeeNavigation,
    private api: EmployeeApi, fb: FormBuilder, route: ActivatedRoute) {
    this.fg = fb.group({});

    const employee$ = nav.employeeId(route)
      .switchMap(id => api.loadOne(id))
      .share();

    this.sub = employee$.subscribe(e => {
      this.id = e.id;
      const { first_name, last_name, email, hourly_wage } = e;
      const hours_worked = e.hours_worked || 0;
      this.fg.setValue({
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
      ...this.fg.value.employee,
      id: this.id
    }).subscribe(x => this.nav.list());
  }

  deleteClicked() {
    this.api.delete(this.id).subscribe(x => this.nav.list());
  }

}
