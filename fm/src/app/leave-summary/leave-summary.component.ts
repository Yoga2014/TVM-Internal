import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../AllServices/leave.service';
import { EmployeeAuthService } from '../AllServices/EmployeeAuthService';
import { LeaveRequest } from '../Interface/leave-request.model';

@Component({
  selector: 'app-leave-summary',
  templateUrl: './leave-summary.component.html',
  styleUrls: ['./leave-summary.component.scss']
})
export class LeaveSummaryComponent implements OnInit {

  page = 1;
  pageSize = 5;
  totalPages = 1;

  leaves: LeaveRequest[] = [];
  paginatedLeaves: LeaveRequest[] = [];

  totalUsedLeaves = 0;
  totalRemainingLeaves = 0;

  employeeId!: number;

  constructor(
    private leaveService: LeaveService,
    private authService: EmployeeAuthService
  ) {}

  ngOnInit(): void {
    const emp = this.authService.getAuthenticatedEmployee();
    this.employeeId = emp.employeeId;
    this.loadLeaveSummary();
  }

  loadLeaveSummary() {
    this.leaveService.getLeaveSummary(this.employeeId).subscribe({
      next: (data: any) => {
        this.leaves = data.leaves || [];

        this.totalUsedLeaves = data.usedLeave;
        this.totalRemainingLeaves = data.remainingLeave;

        this.totalPages = Math.ceil(this.leaves.length / this.pageSize);
        this.updatePagination();
      },
      error: err => console.error(err)
    });
  }

  updatePagination() {
    const start = (this.page - 1) * this.pageSize;
    this.paginatedLeaves = this.leaves.slice(start, start + this.pageSize);
  }

  nextPage() {
    if (this.page < this.totalPages) {
      this.page++;
      this.updatePagination();
    }
  }

  prevPage() {
    if (this.page > 1) {
      this.page--;
      this.updatePagination();
    }
  }
}
