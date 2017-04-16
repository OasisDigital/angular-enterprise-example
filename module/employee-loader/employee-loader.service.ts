import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';

import { IEmployee } from '@oasisdigital/employee-display';

const API_URL = '/api';

// Configure the amount of latency and jitter to simulate
const API_LATENCY = 100;

// Set to 3000 to see that out-of-order replies don't cause any problem:
const API_JITTER = 100;

@Injectable()
export class EmployeeLoader {
  constructor(private http: Http) { }

  loadAll(): Observable<IEmployee[]> {
    return this.http.get(API_URL + '/employees')
      .map(unwrapData)
      .delay(randomDelay());
  }

  loadAllFiltered(searchText: string): Observable<IEmployee[]> {
    // One of several ways to set up HTTP request URL parameters
    // without concatenating them manually.
    const opts = new RequestOptions({
      params: {
        'q': searchText,
        '&_limit': 20
      }
    });
    return this.http.get(API_URL + '/employees', opts)
      .map(unwrapData)
      .delay(randomDelay());
  }

  loadOne(employeeId: number): Observable<IEmployee> {
    return this.http.get(`${API_URL}/employees/${employeeId}`)
      .map(unwrapData)
      .delay(randomDelay());
  }
}

function unwrapData(res: Response) {
  return res.json();
}

function randomDelay() {
  return Math.round(API_LATENCY + Math.random() * API_JITTER);
}
