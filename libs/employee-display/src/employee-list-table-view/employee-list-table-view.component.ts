import { Component, Input, Output, EventEmitter } from '@angular/core';

import { IEmployeeListing } from '@enterprise-example/app-schema';

@Component({
  selector: 'employee-list-table-view',
  templateUrl: './employee-list-table-view.component.html'
})
export class EmployeeListTableViewComponent {
  @Input() list: IEmployeeListing[];
  @Input() selectedId: number;
  @Output() selectId = new EventEmitter<number>();

  noop(e: MouseEvent) {
    e.preventDefault();
  }
}
