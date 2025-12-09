import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/AllServices/employee.service';

@Component({
  selector: 'app-particular-emp',
  templateUrl: './particular-emp.component.html',
  styleUrls: ['./particular-emp.component.scss']
})
export class ParticularEmpComponent {

  selectedEmployee: any;

  constructor(private employeeService: EmployeeService) {

    this.employeeService.selectedEmployee$.subscribe((employeeCode: string) => {
      if (employeeCode) {
        this.employeeService.getEmployeeByCode(employeeCode).subscribe({
          next: (res: any) => {
            this.selectedEmployee = res;
          },
          error: (err: any) => {
            console.error("Failed to load employee details", err);
          }
        });
      }
    });
  }
}
