import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IEmployee } from '../employee';

@Component({
  selector: 'employee-list-table-view',
  templateUrl: './employee-list-table-view.html'
})
export class EmployeeListTableViewComponent {
  @Input() list: IEmployee[];
  @Input() selectedId: number;
  @Output() selectId = new EventEmitter<number>();

  noop(e: MouseEvent) {
    e.preventDefault();
  }
}
