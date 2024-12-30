import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAuthService {
  private employee = {
    employeeId: 'TVM01',
    employeeName: 'Sivaneshwaran',
    email: 'siva.tvm@gmail.com',
    designation: 'Full-stack Developer',
    teamId:'dev001'
  };

  getAuthenticatedEmployee() {
    return this.employee;
  }
}
