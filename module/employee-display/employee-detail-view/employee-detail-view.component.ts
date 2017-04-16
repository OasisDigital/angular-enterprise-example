import { Component, Input } from '@angular/core';

import { IEmployee } from '../employee';

@Component({
  selector: 'employee-detail-view',
  templateUrl: './employee-detail-view.component.html'
})
export class EmployeeDetailViewComponent {
  @Input() employee: IEmployee;
}
