import { Component } from '@angular/core';
import { Employee } from '../Interface/employee.model';
import { EmployeeService } from '../AllServices/employee.service';
import { LeaveReporteesService } from '../AllServices/leaveReportees.service';

@Component({
  selector: 'app-team-reportees',
  templateUrl: './team-reportees.component.html',
  styleUrl: './team-reportees.component.scss'
})
export class TeamReporteesComponent {

  
  employees: Employee[] = [];
  isGridView: boolean = true;
  selectedEmployee: string | null = null;
  isLoading: boolean = true;                                 // Optional, to show a loading indicator

  constructor(private employeeService: EmployeeService, private leaveReporteesService: LeaveReporteesService) {}

  ngOnInit(): void {
    this.loadReportees();
  }

  loadReportees(): void {
    const managerId = 'currentManagerId'; // Replace with actual manager ID
    this.leaveReporteesService.getReportees(managerId).subscribe(
      (data: Employee[]) => {
        this.employees = data;
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


}
