import { Component } from '@angular/core';
import { EmployeeService } from 'src/app/AllServices/employee.service';

@Component({
  selector: 'app-particular-emp',
  standalone: false,
  templateUrl: './particular-emp.component.html',
  styleUrl: './particular-emp.component.scss'
})
export class ParticularEmpComponent {

  selectedEmployee: any;

  constructor(private employeeService: EmployeeService) {
    this.employeeService.selectedEmployee$.subscribe((data) => {
      this.selectedEmployee = data;
    });
  }

}
