import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

import { IEmployee, IEmployeeListing } from '@oasisdigital/app-schema';

const allEmployees = gql`
  query allEmployees {
      employees {
        name
        ssn
      }
    }
`;

const API_URL = '/api';

// Configure the amount of latency and jitter to simulate
const API_LATENCY = 100;

// Set to 3000 to see that out-of-order replies don't cause any problem:
const API_JITTER = 100;

const headers = new Headers({ 'Content-Type': 'application/json' });
const options = new RequestOptions({ headers });

@Injectable()
export class EmployeeApi {
  constructor(private http: Http, private apollo: Apollo) { }

  listAll(): Observable<IEmployeeListing[]> {
    return this.http.get(API_URL + '/employees')
      .map(unwrapData)
      .delay(randomDelay());
  }

  listAllGQL(): Observable<IEmployeeListing[]> {
    return this.apollo.watchQuery<IEmployeeListing[]>({
      query: allEmployees
    });
  }

  listFiltered(searchText: string): Observable<IEmployeeListing[]> {
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

  save(employee: IEmployee) {
    return this.http.put(`${API_URL}/employees/${employee.id}`, employee, options)
      .map(unwrapData)
      .delay(randomDelay());
  }

  saveNew(employee: IEmployee) {
    return this.http.post(`${API_URL}/employees`, employee, options)
      .map(unwrapData)
      .delay(randomDelay());
  }

  delete(id: number) {
    return this.http.delete(`${API_URL}/employees/${id}`, options)
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
