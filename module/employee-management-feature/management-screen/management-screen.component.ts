import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { sortBy } from 'lodash';

import { EmployeeLoader } from '@oasisdigital/employee-loader';
import { IEmployee } from '@oasisdigital/employee-display';

@Component({
  selector: 'management-screen',
  templateUrl: './management-screen.component.html'
})
export class ManagementScreenComponent {
  nameFilter = new FormControl('');
  sort = new FormControl('last_name');

  filteredList: Observable<IEmployee[]>;

  constructor(loader: EmployeeLoader, private router: Router) {
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
  }

  addClicked() {
    this.router.navigate(['/emp-man', 'add']);
  }

  select(id: number) {
    this.router.navigate(['/emp-man', id]);
  }
}
