import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmployeeNavigation {
  constructor(private router: Router) {
  }

  employeeId(route: ActivatedRoute): Observable<number> {
    return route.params
      .map(params => params['id']);
  }

  list() {
    this.router.navigate(['/emp-man']);
  }

  add() {
    this.router.navigate(['/emp-man', 'add']);
  }

  edit(id: number) {
    this.router.navigate(['/emp-man', id]);
  }
}
