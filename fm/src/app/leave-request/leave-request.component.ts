import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { LeaveService } from '../AllServices/leave.service';
import { LeaveRequest } from '../Interface/leave-request.model';
import { MatDialog } from '@angular/material/dialog';
import { ApplyLeaveComponent } from '../leave-summary/apply-leave/apply-leave.component';

@Component({
  selector: 'app-leave-request',
  templateUrl: './leave-request.component.html',
  standalone: false,
  styleUrls: ['./leave-request.component.scss']
})
export class LeaveRequestsComponent implements OnInit, AfterViewInit {
  leaveRequests: LeaveRequest[] = [];
  dataSource: MatTableDataSource<LeaveRequest> = new MatTableDataSource();
  displayedColumns: string[] = ['select', 'employeeName', 'leaveType', 'type', 'leavePeriod', 'days', 'dateOfRequest', 'actions'];
  selectedRequests: LeaveRequest[] = [];
  actions: string[] = ['Approve', 'Reject'];

  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(private leaveService: LeaveService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  ngAfterViewInit(): void {
    if (this.sort) this.dataSource.sort = this.sort;
    if (this.paginator) this.dataSource.paginator = this.paginator;
  }

  loadLeaveRequests(): void {
    this.leaveService.getLeaves().subscribe({
      next: (data) => {
        this.leaveRequests = data.map((request) => ({
          ...request,
          type: this.getLeaveType(request.leaveType),
          leavePeriod: this.getLeavePeriod(request.startDate ?? '', request.endDate ?? ''),
        }));
        this.dataSource.data = this.leaveRequests;
      },
      error: (err) => console.error('Error fetching leave requests:', err),
    });
  }
  

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  applyLeave(): void {
    const dialogRef = this.dialog.open(ApplyLeaveComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.leaveService.addLeaveRequest(result).subscribe({
          next: () => this.loadLeaveRequests(),
          error: (err) => console.error('Error adding leave request:', err),
        });
      }
    });
  }

  getLeaveType(leaveType: string): string {
    const unpaidLeaveTypes = ['Casual Leave', 'Sick Leave', 'Leave Without Pay'];
    return unpaidLeaveTypes.includes(leaveType) ? 'Paid' : 'UnPaid';
  }
  


  selectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.dataSource.data.forEach(request => (request.selected = checked));
    this.selectedRequests = checked ? [...this.dataSource.data] : [];
  }

  onRowSelect(event: Event, request: LeaveRequest): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.selectedRequests.push(request);
    } else {
      this.selectedRequests = this.selectedRequests.filter(req => req !== request);
    }
  }

  onDelete(request: LeaveRequest): void {
    if (request.employeeId && confirm('Are you sure you want to delete this leave request?')) {
      this.leaveService.deleteLeaveRequest(request.employeeId).subscribe(() => {
        this.loadLeaveRequests();
      });
    }
  }

  getLeavePeriod(startDate: string, endDate: string): string {
    return `${startDate} to ${endDate}`;
  }

  deleteSelectedRequests(): void {
    if (confirm('Are you sure you want to delete selected leave requests?')) {
      this.selectedRequests.forEach(request => {
        if (request.employeeId) {
          this.leaveService.deleteLeaveRequest(request.employeeId).subscribe(() => {
            this.loadLeaveRequests();
          });
        }
      });
      this.selectedRequests = [];
    }
  }

  onActionSelect(event: Event, request: LeaveRequest): void {
    const selectedAction = (event.target as HTMLSelectElement).value;
    if (selectedAction === 'Approve') {
      this.onApprove(request);
    } else if (selectedAction === 'Reject') {
      this.onReject(request);
    }
  }

  onApprove(request: LeaveRequest): void {
    if (!request.employeeId) {
      console.error('Employee ID is missing for the leave request.');
      alert('Error: Employee ID is required to approve the leave request.');
      return;
    }
  
    if (confirm(`Are you sure you want to approve the leave request for ${request.employeeName}?`)) {
      this.leaveService.approveLeaveRequest(request.employeeId).subscribe({
        next: () => {
          alert('Leave request approved successfully.');
          this.loadLeaveRequests();
        },
        error: (err) => console.error('Error approving leave request:', err),
      });
    }
  }
  
  onReject(request: LeaveRequest): void {
    if (!request.employeeId) {
      console.error('Employee ID is missing for the leave request.');
      alert('Error: Employee ID is required to reject the leave request.');
      return;
    }
  
    const comment = prompt(`Enter a reason for rejecting the leave request of ${request.employeeName}:`);
    if (comment !== null && comment.trim() !== '') {
      this.leaveService.rejectLeaveRequest(request.employeeId, comment).subscribe({
        next: () => {
          alert('Leave request rejected successfully.');
          this.loadLeaveRequests();
        },
        error: (err) => console.error('Error rejecting leave request:', err),
      });
    } else if (comment === '') {
      alert('Rejection reason is required.');
    }
  }
  

  
}
