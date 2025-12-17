import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeAuthService {
  private employee = {
    employeeId: 1, // Changed from 'TVM01' to a number
    employeeName: 'Sivaneshwaran',
    email: 'siva.tvm@gmail.com',
    designation: 'Full-stack Developer',
    teamId: 'dev001'
  };

  getAuthenticatedEmployee() {
    return this.employee;
  }
}
