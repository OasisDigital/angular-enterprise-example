import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class EmployeeNavigation {
  private baseRoute: ActivatedRoute;

  constructor(private router: Router) { }

  calculateModuleBaseRoute(route: ActivatedRoute) {
    this.baseRoute = route.pathFromRoot[1];
  }

  employeeId(componentRoute: ActivatedRoute): Observable<number> {
    return componentRoute.params
      .pipe(map(params => params['id']));
  }

  list() {
    this.router.navigate(['.'], { relativeTo: this.baseRoute });
  }

  add() {
    this.router.navigate(['add'], { relativeTo: this.baseRoute });
  }

  edit(id: number) {
    this.router.navigate([id], { relativeTo: this.baseRoute });
  }
}
