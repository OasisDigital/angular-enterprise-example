import { Component, Input } from '@angular/core';

import { IEmployee } from '../employee';

@Component({
  selector: 'employee-detail-view',
  templateUrl: './employee-detail-view.html'
})
export class EmployeeDetailComponent {
  @Input() employee: IEmployee;
}
