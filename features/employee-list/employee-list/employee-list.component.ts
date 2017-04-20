import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { sortBy } from 'lodash';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/let';
import 'rxjs/add/operator/share';

import { EmployeeApi } from '@oasisdigital/employee-api';
import { IEmployeeListing } from '@oasisdigital/app-schema';
import { StatusStrings, ILoadResultStatus, loadWithRetry, faulty } from '@oasisdigital/retry-loader';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent {
  selectedEmployee: Observable<IEmployeeListing>;
  status: Observable<string>;
  selectedEmployeeId = new Subject<number>();
  employees: Observable<IEmployeeListing[]>;
  showEmployeeDetails: Observable<boolean>;

  constructor(api: EmployeeApi) {
    this.employees = api.listAll();

    const loadResults = loadWithRetry(
      this.selectedEmployeeId,
      id => api.loadOne(id)
        .let(faulty<IEmployeeListing>())   // simulate bad connection
    ).share();

    this.status = loadResults
      .map(result => StatusStrings[result.status]);

    this.showEmployeeDetails = loadResults
      .map(result => result.status === ILoadResultStatus.Success);

    this.selectedEmployee = loadResults
      .filter(result => result.status === ILoadResultStatus.Success)
      .map(result => result.data);
  }
}
