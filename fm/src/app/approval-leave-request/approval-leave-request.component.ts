import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LeaveRequest } from '../Interface/leave-request.model';
import { LeaveService } from '../AllServices/leave.service';
import { EmployeeAuthService } from '../AllServices/EmployeeAuthService';

@Component({
  selector: 'app-approval-leave-request',
  templateUrl: './approval-leave-request.component.html',
  standalone: false,
  styleUrls: ['./approval-leave-request.component.scss']
})
export class ApprovalLeaveRequestComponent implements OnInit {
  leaveRequests: LeaveRequest[] = [];
  dataSource: MatTableDataSource<LeaveRequest> = new MatTableDataSource();

  displayedColumns: string[] = [
    'employeeId', 'employeeName', 'email', 'designation', 'leaveType', 'teamId',
    'startDate', 'endDate', 'totalLeaveDays', 'reason', 'status', 'actions'
  ];
  

  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private leaveService: LeaveService, private authService: EmployeeAuthService) {}

  ngOnInit() {
    this.loadLeaveRequests();
    //this.loadAuthenticatedEmployee();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  // loadAuthenticatedEmployee(): void {
  //   const authenticatedEmployee = this.authService.getAuthenticatedEmployee();
  //   this.dataSource.data = [
  //     {
  //       employeeId: authenticatedEmployee.employeeId,
  //       employeeName: authenticatedEmployee.employeeName,
  //       email: authenticatedEmployee.email,
  //        designation: authenticatedEmployee.designation
  //     }
  //   ];
  //   console.log('DataSource after loadAuthenticatedEmployee:', this.dataSource.data);
  // }

  loadLeaveRequests(): void {
    this.leaveService.getLeaves().subscribe(
      (data: LeaveRequest[]) => {
        this.leaveRequests = data.map((request) => ({
          ...request,
          designation: request.designation || 'N/A',
          email: request.email || 'N/A',
          teamId: request.teamId || 'N/A',
        }));
        this.dataSource.data = this.leaveRequests;
        console.log('API Response data:', data);
      },
      (error) => {
        console.error('Error fetching leave requests', error);
      }
    );
  }
  

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dataSource.filter = input.value.trim().toLowerCase();
  }

  approveRequest(request: LeaveRequest): void {
    // Check if employeeId is not undefined
    if (request.employeeId) {
      if (confirm('Are you sure you want to approve this leave request?')) {
        this.leaveService.updateLeaveRequest(Number(request.employeeId), { status: 'Approved' }).subscribe({
          next: () => {
            this.refreshData();
          },
          error: (error) => {
            console.error('Error updating leave request:', error);
          }
        });
      }
    } else {
      console.error('Cannot approve leave request: Employee ID is undefined.');
    }
  }
  

  rejectRequest(request: LeaveRequest): void {
    if (request.employeeId) {
      const comment = prompt('Please enter the reason for rejection:');
      if (comment) {
        this.leaveService.updateLeaveRequest(Number(request.employeeId), { status: 'Rejected', comment }).subscribe({
          next: () => {
            this.refreshData();
          },
          error: (error) => {
            console.error('Error updating leave request:', error);
          }
        });
      }
    } else {
      console.error('Cannot reject leave request: Employee ID is undefined.');
    }
  }
  

  refreshData(): void {
    this.leaveService.getLeaves().subscribe(
      (data: LeaveRequest[]) => {
        this.leaveRequests = data;
        this.dataSource.data = this.leaveRequests;
      },
      (error) => {
        console.error('Error refreshing leave requests', error);
      }
    );
  }
}
