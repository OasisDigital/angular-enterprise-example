import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { IEmployee } from '@oasisdigital/employee-display';
import { EmployeeLoader } from '@oasisdigital/employee-loader';

@Component({
  selector: 'edit-employee',
  templateUrl: './edit-employee.component.html'
})
export class EditEmployeeComponent {

  employee$: Observable<IEmployee>;

  constructor(route: ActivatedRoute, private router: Router, loader: EmployeeLoader) {
    this.employee$ = route.params
      .map(params => params['id'])
      .switchMap(id => loader.loadOne(id))
      .share();
  }

  cancelClicked() {
    this.router.navigate(['/emp-man']);
  }

  saveClicked() {
    // this.editing.emit(false);
  }

  deleteClicked() {
    // this.editing.emit(false);
  }

}
