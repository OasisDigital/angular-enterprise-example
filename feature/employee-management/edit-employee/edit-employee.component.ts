import { Component, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { IEmployee } from '@oasisdigital/app-schema';
import { EmployeeApi } from '@oasisdigital/employee-api';

@Component({
  selector: 'edit-employee',
  templateUrl: './edit-employee.component.html'
})
export class EditEmployeeComponent implements OnDestroy {
  fg: FormGroup;
  sub: Subscription;
  id: number;

  constructor(route: ActivatedRoute, private router: Router, private api: EmployeeApi, fb: FormBuilder) {
    const employee$ = route.params
      .map(params => params['id'])
      .switchMap(id => api.loadOne(id))
      .share();
    this.fg = fb.group({
      'first_name': ['', Validators.required],
      'last_name': ['', [Validators.required, Validators.minLength(3)]],
      'email': [''],
      'hourly_wage': ['', [Validators.required, Validators.pattern('[0-9]+')]]
    });

    this.sub = employee$.subscribe(e => {
      this.id = e.id;
      const { first_name, last_name, email, hourly_wage } = e;
      this.fg.setValue({ first_name, last_name, email, hourly_wage });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  cancelClicked() {
    this.router.navigate(['/emp-man']);
  }

  saveClicked() {
    this.api.save({
      ...this.fg.value,
      id: this.id
    }).subscribe();
  }

  deleteClicked() {
  }

}
