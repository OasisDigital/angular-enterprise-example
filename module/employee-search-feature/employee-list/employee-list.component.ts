import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { FormControl } from '@angular/forms';
import { sortBy } from 'lodash';

import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/publishReplay';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';

import { EmployeeLoader } from '@oasisdigital/employee-loader';
import { IEmployee } from '@oasisdigital/employee-display';

@Component({
  selector: 'employee-list',
  templateUrl: './employee-list.component.html'
})
export class EmployeeListComponent {
  nameFilter = new FormControl('');
  sort = new FormControl('last_name');

  filteredList: Observable<IEmployee[]>;
  selectedId = new Subject<number>();
  selectedEmployee: Observable<IEmployee>;

  constructor(loader: EmployeeLoader) {
    // .valueChanges is missing the initial value; add it:
    const nameFilter$ = this.nameFilter.valueChanges
      .startWith(this.nameFilter.value);
    const sort$ = this.sort.valueChanges
      .startWith(this.sort.value);

    // List reacts to filter and sort changes
    this.filteredList = Observable.combineLatest(
      nameFilter$
        .debounceTime(250)
        .switchMap(x => loader.loadAllFiltered(x)),
      sort$,
      (list, sort) => sortBy(list, sort)
    );

    // Detail reacts to selected employee changes
    this.selectedEmployee = this.selectedId
      .switchMap(id => loader.loadOne(id))
      .publishReplay(1)
      .refCount();
  }
}
