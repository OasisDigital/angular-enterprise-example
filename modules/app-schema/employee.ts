import { IEmployeeListing } from './employee-listing';

export interface IEmployee extends IEmployeeListing {
  email: string;
  hours_worked: number;
  hourly_wage: number;
}
