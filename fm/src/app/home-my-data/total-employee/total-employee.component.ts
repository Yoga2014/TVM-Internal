import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/AllServices/employee.service';

@Component({
  selector: 'app-total-employee',
  standalone: false,
  templateUrl: './total-employee.component.html',
  styleUrl: './total-employee.component.scss'
})
export class TotalEmployeeComponent implements OnInit {

  datas: any[] = [];

  constructor(private employeeService: EmployeeService, private route: Router) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        console.log("API Response:", res);
        this.datas = res;
      },
      error: (err) => {
        console.log("Error loading employees", err);
      }
    });
  }

viewEmployee(data: any) {
  this.employeeService.setSelectedEmployee(data.employeeCode);   // pass only employeeCode
  window.dispatchEvent(new Event("showParticularTab"));
}

}
