import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmployeeNavigation {
  private base: ActivatedRoute;

  constructor(private router: Router) {
  }

  calculateModuleBaseRoute(route: ActivatedRoute) {
    this.base = route.pathFromRoot[1];
  }

  employeeId(componentRoute: ActivatedRoute): Observable<number> {
    return componentRoute.params
      .map(params => params['id']);
  }

  list() {
    this.router.navigate(['.'], { relativeTo: this.base });
  }

  add() {
    this.router.navigate(['add'], { relativeTo: this.base });
  }

  edit(id: number) {
    this.router.navigate([id], { relativeTo: this.base });
  }
}
