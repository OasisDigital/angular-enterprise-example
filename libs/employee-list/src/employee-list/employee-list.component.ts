import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { filter, map, share } from 'rxjs/operators';

import { EmployeeApi } from '@enterprise-example/employee-api';
import { IEmployeeListing } from '@enterprise-example/app-schema';
import { StatusStrings, LoadResultStatus, loadWithRetry, faulty } from '@enterprise-example/retry-loader';

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
        .pipe(faulty<IEmployeeListing>())   // simulate bad connection
    ).pipe(share());

    this.status = loadResults
      .pipe(map(result => StatusStrings[result.status]));

    this.showEmployeeDetails = loadResults
      .pipe(map(result => result.status === LoadResultStatus.Success));

    this.selectedEmployee = loadResults
      .pipe(filter(result => result.status === LoadResultStatus.Success),
        map(result => result.data));
  }
}
