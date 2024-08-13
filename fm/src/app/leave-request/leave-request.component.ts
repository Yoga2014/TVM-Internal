import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveRequest } from '../Interface/leave-request.model';
import { LeaveService } from '../AllServices/leave.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestsComponent implements OnInit, AfterViewInit {

  leaveRequests: LeaveRequest[] = [];
  dataSource: MatTableDataSource<LeaveRequest> = new MatTableDataSource<LeaveRequest>();
  displayedColumns: string[] = ['select', 'employeeName', 'leaveType', 'type', 'leavePeriod', 'days', 'dateOfRequest', 'actions'];

  actions: string[] = ['Approve', 'Reject'];

  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private leaveService: LeaveService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  ngAfterViewInit(): void {
    this.setTableProperties();
  }

  loadLeaveRequests(): void {
    this.leaveService.getLeaves().subscribe({
      next: (data: LeaveRequest[]) => {
        this.leaveRequests = data;
        this.dataSource.data = this.leaveRequests;
        this.setTableProperties();
      },
      error: (error) => {
        console.error('Error fetching leave requests', error);
      }
    });
  }

  setTableProperties(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }


  onActionSelect(action: string, request: LeaveRequest): void {
    if (action === 'Reject' && !request.rejectionComment) {
      alert('Please provide a reason for rejection.');
      return;
    }

    const updatedRequest: Partial<LeaveRequest> = {
      status: action === 'Approve' ? 'Approved' : 'Rejected',
      reasonforRejected: action === 'Reject' ? request.rejectionComment : undefined
    };

    this.leaveService.updateLeaveRequest(request.employeeId, updatedRequest).subscribe({
      next: () => {
        this.loadLeaveRequests(); // Refresh the list after update
      },
      error: (error) => {
        console.error('Error updating leave request', error);
      }
    });
  }

  onDelete(request: LeaveRequest): void {
    if (confirm('Are you sure you want to delete this leave request?')) {
      this.leaveService.deleteLeaveRequest(request.employeeId).subscribe({
        next: () => {
          this.loadLeaveRequests();                             // Refresh the list after deletion
        },
        error: (error) => {
          console.error('Error deleting leave request', error);
        }
      });
    }
  }

  // navigate(): void {
  //   this.router.navigate(['leave-tracking/mydata/apply-leave']);
  // }

  applyLeave() {
    this.router.navigate(['apply-leave'], { queryParams: { returnUrl: this.router.url } });
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dataSource.filter = input.value.trim().toLowerCase();
  }
  
  selectAll(checked: boolean): void {
    this.dataSource.data.forEach(request => request.selected = checked);
    this.dataSource._updateChangeSubscription();                         // Trigger table update
  }
}
