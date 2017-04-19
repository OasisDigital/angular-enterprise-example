import { RouterModule, Route } from '@angular/router';

import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { EmployeeFieldsComponent } from './employee-fields/employee-fields.component';
import { ManagementScreenComponent } from './management-screen/management-screen.component';

const ROUTES: Route[] = [
  { path: 'emp-man/add', component: AddEmployeeComponent },
  { path: 'emp-man/:id', component: EditEmployeeComponent },
  { path: 'emp-man', component: ManagementScreenComponent }
];

export const ROUTER_MODULE = RouterModule.forChild(ROUTES);
export const ROUTED_COMPONENTS = [
  ManagementScreenComponent,
  EmployeeFieldsComponent,
  AddEmployeeComponent,
  EditEmployeeComponent
];
