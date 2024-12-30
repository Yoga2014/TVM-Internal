import { Component } from '@angular/core';
import { Employee } from '../Interface/employee.model';
import { EmployeeService } from '../AllServices/employee.service';
import { LeaveReporteesService } from '../AllServices/leaveReportees.service';
import { EmployeeAuthService } from '../AllServices/EmployeeAuthService';

@Component({
  selector: 'app-team-reportees',
  templateUrl: './team-reportees.component.html',
  standalone: false,
  styleUrl: './team-reportees.component.scss'
})
export class TeamReporteesComponent {

  
  employees: Employee[] = [];
  isGridView: boolean = true;
  selectedEmployee: string | null = null;
  isLoading: boolean = true;  
  hoveredEmployee: string | null = null;

  constructor(private employeeService: EmployeeService, private leaveReporteesService: LeaveReporteesService, private authService: EmployeeAuthService) {}

  employeeName: string= '';

  ngOnInit(): void {
    const employee = this.authService.getAuthenticatedEmployee();
    this.employeeName = employee.employeeName;
    this.loadReportees();
  }

  loadReportees(): void {
    const managerId = 'currentManagerId'; // Replace with actual manager ID
    this.leaveReporteesService.getReportees(managerId).subscribe(
      (data: Employee[]) => {
        this.employees = data;
        console.log(this.employees);
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching reportees', error);
        this.isLoading = false;
      }
    );
  }

  toggleView(): void {
    this.isGridView = !this.isGridView;
  }

  toggleOptions(employeeId: string): void {
    this.selectedEmployee = this.selectedEmployee === employeeId ? null : employeeId;
  }

  chat(employeeId: string): void {
    console.log('Chat with', employeeId);
  }

  audioCall(employeeId: string): void {
    console.log('Audio call with', employeeId);
  }

  videoCall(employeeId: string): void {
    console.log('Video call with', employeeId);
  }

  hoverOptions(employeeId: string | null): void {
  this.hoveredEmployee = employeeId;
}

}
