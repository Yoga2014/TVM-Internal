import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/AllServices/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-present-employee',
  templateUrl: './present-employee.component.html',
  styleUrls: ['./present-employee.component.scss']
})
export class PresentEmployeeComponent implements OnInit {

  presentEmployees: any[] = [];

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit() {
    this.loadPresentEmployees();
  }

  loadPresentEmployees() {
    this.employeeService.getPresentEmployees().subscribe({
      next: (res) => {
        console.log("Present Employees:", res);
        this.presentEmployees = res;
      },
      error: (err) => {
        console.log("Error loading present employees", err);
      }
    });
  }

 
}
