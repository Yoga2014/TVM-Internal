import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveRequest } from '../Interface/leave-request.model';
import { LeaveService } from '../AllServices/leave.service';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ApplyLeaveComponent } from '../leave-summary/apply-leave/apply-leave.component';
import { MatDialog } from '@angular/material/dialog';

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
  selectedRequests: LeaveRequest[] = [];

  constructor(
    private leaveService: LeaveService,
    private router: Router,
    private dialog : MatDialog
  ) {}

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  ngAfterViewInit(): void {
    this.setTableProperties();
  }

  loadLeaveRequests(): void {
    this.leaveRequests = [];
    this.dataSource.data = [];
    this.leaveService.getLeaves().subscribe({
      next: (data: LeaveRequest[]) => {
        console.log('Fetched leave requests:', data);
        const filteredLeaveRequests = data.filter(leaveRequest => leaveRequest.employeeName);
        const uniqueLeaveRequests = filteredLeaveRequests.filter((leaveRequest, index, self) =>
          index === self.findIndex((lr) => lr.employeeId === leaveRequest.employeeId)
        );
        this.leaveRequests = uniqueLeaveRequests;
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

  applyLeave(): void {
    const dialogRef = this.dialog.open(ApplyLeaveComponent, {});
    dialogRef.afterClosed().subscribe((result: { employeeId: any; employeeName: any; leaveType: any; leavePeriod: any; dateOfRequest: any; startDate: any; endDate: any; totalDays: any; status: any; booked: any; comment: any; teamEmail: any; reasonforRejected: any; color: any; }) => {
      if (result) {
        const newLeaveRequest: LeaveRequest = {
          employeeId: result.employeeId,
          employeeName: result.employeeName,
          leaveType: result.leaveType,
          leavePeriod: result.leavePeriod,
          dateOfRequest: result.dateOfRequest,
          selected: false,
          startDate: result.startDate,
          endDate: result.endDate,
          totalDays: result.totalDays,
          status: result.status,
          booked: result.booked,
          comment: result.comment,
          teamEmail: result.teamEmail,
          reasonforRejected: result.reasonforRejected,
        };
        console.log(result)
        this.leaveRequests.push(newLeaveRequest);
        this.leaveService.addLeaveRequest(newLeaveRequest).subscribe((res: any) => {
          this.loadLeaveRequests();
        })
      }
    });
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dataSource.filter = input.value.trim().toLowerCase();
  }

  onRowSelect(event: Event, request: LeaveRequest): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.checked !== undefined) {
      request.selected = inputElement.checked;
      if (request.selected) {
        this.selectedRequests.push(request);
      } else {
        this.selectedRequests = this.selectedRequests.filter(r => r.employeeId !== request.employeeId);
      }
    }
  }

  selectAll(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const checked = inputElement.checked;
    this.selectedRequests = [];
    this.dataSource.data.forEach(request => {
      request.selected = checked;
      if (checked) {
        this.selectedRequests.push(request);
      }
    });
    this.dataSource._updateChangeSubscription();
  }


  deleteSelectedRequests(): void {
    if (this.selectedRequests.length === 0) {
      alert('Please select at least one request to delete.');
      return;
    }
    const confirmation = confirm('Are you sure you want to delete the selected leave request(s)?');
    if (confirmation) {
      this.selectedRequests.forEach(request => {
        if (request.employeeId) {
          this.leaveService.deleteLeaveRequest(request.employeeId).subscribe({
            next: () => {
              this.loadLeaveRequests();
            },
            error: (error) => {
              console.error('Error deleting leave request', error);
            }
          });
        }
      });
      this.selectedRequests = [];
    }
  }


  onDelete(request: LeaveRequest): void {
    const confirmation = confirm('Are you sure you want to delete this leave request?');
    if (confirmation) {
      if (request?.employeeId !== undefined) {
        this.leaveService.deleteLeaveRequest(request.employeeId).subscribe({
          next: () => {
            this.leaveRequests = this.leaveRequests.filter(
              (leave) => leave?.employeeId !== request.employeeId
            );
            this.dataSource.data = this.leaveRequests;
            console.log(`Leave request with id ${request.employeeId} deleted`);
          },
          error: (error) => {
            console.error('Error deleting leave request', error);
          }
        });
      } else {
        console.error('Leave request id is undefined');
      }
    }
  }

  onActionSelect(event: Event, request: LeaveRequest): void {
    const selectElement = event.target as HTMLSelectElement;
    const selectedAction = selectElement.value;
    if (selectedAction === 'Approve') {
      this.approveLeaveRequest(request);
    } else if (selectedAction === 'Reject') {
      this.rejectLeaveRequest(request);
    }
  }

  approveLeaveRequest(request: LeaveRequest): void {
    this.leaveService.approveLeaveRequest(request.employeeId).subscribe({
      next: () => {
        console.log(`Leave request ${request.employeeId} approved`);
        this.loadLeaveRequests();
      },
      error: (error) => {
        console.error('Error approving leave request', error);
      }
    });
  }

  rejectLeaveRequest(request: LeaveRequest): void {
    this.leaveService.rejectLeaveRequest(request.employeeId).subscribe({
      next: () => {
        console.log(`Leave request ${request.employeeId} rejected`);
        this.loadLeaveRequests();
      },
      error: (error) => {
        console.error('Error rejecting leave request', error);
      }
    });
  }

}
