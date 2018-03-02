import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { sortBy } from 'lodash';
import { combineLatest } from 'rxjs/observable/combineLatest'
import { startWith, debounceTime, switchMap } from 'rxjs/operators'

import { EmployeeApi } from '@enterprise-example/employee-api';
import { IEmployee } from '@enterprise-example/app-schema';

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

    const nameFilter$ = this.nameFilter.valueChanges.pipe(
      startWith(this.nameFilter.value),
      debounceTime(250));
    const sort$ = this.sort.valueChanges.pipe(
      startWith(this.sort.value));

    // List reacts to filter and sort changes
    this.filteredList = combineLatest(
      nameFilter$.pipe(switchMap(x => api.listFiltered(x))),
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
