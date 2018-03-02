import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { delayWhen } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { IEmployee, IEmployeeListing } from '@enterprise-example/app-schema';

const API_URL = '/api';
const EMP_URL = API_URL + '/employees';

// Configure the amount of latency and jitter to simulate
const API_LATENCY = 50;

// Set to 3000 to see that out-of-order replies don't cause any problem:
const API_JITTER = 250;

// randomDelay() can be piped into an observable chain to add a (not
// surprisingly) random delay to each value flowing through the observable. Note
// that the delay must be calculated randomly for each value; otherwise the
// notion of "jitter" would not work.

function randomDelay<T>() {
  return delayWhen<T>(_x => of(Math.round(API_LATENCY + Math.random() * API_JITTER)));
}

@Injectable()
export class EmployeeApi {
  constructor(private http: HttpClient) { }

  listAll(): Observable<IEmployeeListing[]> {
    return this.http.get<IEmployeeListing[]>(EMP_URL)
      .pipe(randomDelay());
  }

  listFiltered(searchText: string): Observable<IEmployeeListing[]> {
    const params = new HttpParams()
      .set('q', searchText)
      .set('_limit', '20');
    return this.http.get<IEmployeeListing[]>(EMP_URL, { params })
      .pipe(randomDelay());
  }

  loadOne(employeeId: number): Observable<IEmployee> {
    return this.http.get<IEmployee>(`${EMP_URL}/${employeeId}`)
      .pipe(randomDelay());
  }

  save(employee: IEmployee) {
    return this.http.put(`${EMP_URL}/${employee.id}`, employee)
      .pipe(randomDelay());
  }

  saveNew(employee: IEmployee) {
    return this.http.post(EMP_URL, employee)
      .pipe(randomDelay());
  }

  delete(id: number) {
    return this.http.delete(`${EMP_URL}/${id}`)
      .pipe(randomDelay());
  }
}
