import { Component, OnInit } from '@angular/core';
import { NewHiresService } from '../AllServices/new-hires.service';
import { Router } from '@angular/router';
import { Employee } from '../Interface/employee.model';

@Component({
  selector: 'app-new-hires-card',
  templateUrl: './new-hires-card.component.html',
  standalone: false,
  styleUrls: ['./new-hires-card.component.scss']
})
export class NewHiresComponent implements OnInit {
  

  employees: Employee[] = [];

  constructor(private newHiresService: NewHiresService, private router: Router) { }

  ngOnInit(): void {
    this.newHiresService.getRecentHires().subscribe(
      (employees: Employee[]) => {
        this.employees = employees;
        console.log(employees, "new hires");
      },
      (error) => {
        console.error('Failed to fetch new hires', error);
      }
    );
  }

  viewEmployeeDetails(id: number): void {
    this.router.navigate(['/employee-details', id]);
  }
}
