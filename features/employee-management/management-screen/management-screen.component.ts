import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { sortBy } from 'lodash';

import { EmployeeApi } from '@oasisdigital/employee-api';
import { IEmployee } from '@oasisdigital/app-schema';

import { EmployeeNavigation } from '../employee-navigation.service';

@Component({
  selector: 'management-screen',
  templateUrl: './management-screen.component.html'
})
export class ManagementScreenComponent {
  nameFilter = new FormControl('');
  sort = new FormControl('last_name');
  filteredList: Observable<IEmployee[]>;

  constructor(api: EmployeeApi, private nav: EmployeeNavigation, route: ActivatedRoute) {
    this.nav.calculateModuleBaseRoute(route);

    const nameFilter$ = this.nameFilter.valueChanges
      .startWith(this.nameFilter.value)
      .debounceTime(250);
    const sort$ = this.sort.valueChanges
      .startWith(this.sort.value);

    // List reacts to filter and sort changes
    this.filteredList = Observable.combineLatest(
      nameFilter$.switchMap(x => api.loadFiltered(x)),
      sort$,
      (list, sort) => sortBy(list, sort)
    );
  }

  addClicked() {
    this.nav.add();
  }

  select(id: number) {
    this.nav.edit(id);
  }
}
