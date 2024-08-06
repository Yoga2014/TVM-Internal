// src/app/leave-request/leave-request.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
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
export class LeaveRequestsComponent implements OnInit {

  leaveRequests: LeaveRequest[] = [];
  dataSource: MatTableDataSource<LeaveRequest> = new MatTableDataSource();
  displayedColumns: string[] = ['select', 'employeeName', 'leaveType', 'type', 'leavePeriod', 'days', 'dateOfRequest'];

  @ViewChild(MatSort) sort: MatSort | null = null;
  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  constructor(
    private leaveService: LeaveService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  loadLeaveRequests(): void {
    this.leaveService.getLeaves().subscribe(
      (data: LeaveRequest[]) => {
        this.leaveRequests = data;
        this.dataSource = new MatTableDataSource<LeaveRequest>(this.leaveRequests);
        this.setTableProperties();
      },
      (error) => {
        console.error('Error fetching leave requests', error);
      }
    );
  }

  setTableProperties(): void {
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngAfterViewInit(): void {
    this.setTableProperties();
  }

  onDelete(request: LeaveRequest | any): void {
    if (confirm('Are you sure you want to delete this leave request?')) {
      this.leaveService.deleteLeaveRequest(request.employeeId).subscribe(() => {
        this.loadLeaveRequests(); 
      });
    }
  }

  navigate(): void {
    this.router.navigate(['leave-tracking/mydata/apply-leave']);
  }

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.dataSource.filter = input.value.trim().toLowerCase();
  }
  
  selectAll(checked: boolean): void {
    this.dataSource.data.forEach(request => request.selected = checked); 
  }
}
