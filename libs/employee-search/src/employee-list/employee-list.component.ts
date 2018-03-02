import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { FormControl } from '@angular/forms';
import { sortBy } from 'lodash';
import { combineLatest } from 'rxjs/observable/combineLatest'
import { debounceTime, publishReplay, startWith, switchMap, refCount } from 'rxjs/operators'

import { EmployeeApi } from '@enterprise-example/employee-api';
import { IEmployeeListing } from '@enterprise-example/app-schema';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent {
  nameFilter = new FormControl('');
  sort = new FormControl('last_name');

  filteredList: Observable<IEmployeeListing[]>;
  selectedId = new Subject<number>();
  selectedEmployee: Observable<IEmployeeListing>;

  constructor(api: EmployeeApi) {
    // .valueChanges is missing the initial value; add it:
    const nameFilter$ = this.nameFilter.valueChanges
      .pipe(startWith(this.nameFilter.value));
    const sort$ = this.sort.valueChanges
      .pipe(startWith(this.sort.value));

    // List reacts to filter and sort changes
    this.filteredList = combineLatest(
      nameFilter$.pipe(
        debounceTime(250),
        switchMap(x => api.listFiltered(x))
      ),
      sort$,
      (list, sort) => sortBy(list, sort));

    // Detail reacts to selected employee changes
    this.selectedEmployee = this.selectedId
      .pipe(switchMap(id => api.loadOne(id)),
        publishReplay(1),
        refCount());
  }
}
