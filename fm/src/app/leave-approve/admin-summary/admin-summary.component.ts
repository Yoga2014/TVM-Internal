import { Component, OnInit } from '@angular/core';
import { LeaveService } from 'src/app/AllServices/leave.service';
import { LeaveRequest } from 'src/app/Interface/leave-request.model';

@Component({
  selector: 'app-adminsummary',
  templateUrl: './admin-summary.component.html',
  styleUrls: ['./admin-summary.component.scss']
})
export class AdminsummaryComponent implements OnInit {

  page = 1;
  pageSize = 5;
  totalPages = 1;

  leaves: LeaveRequest[] = [];
  paginatedLeaves: LeaveRequest[] = [];

  totalUsedLeaves = 0;
  totalRemainingLeaves = 0;

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary() {
    this.leaveService.getLeaveSummary().subscribe(summary => {
      this.leaves = summary;

      this.totalUsedLeaves = this.leaves.reduce((a, b) => a + (b.booked || 0), 0);
      this.totalRemainingLeaves = this.leaves.reduce((a, b) => a + (b.available || 0), 0);

      this.totalPages = Math.ceil(this.leaves.length / this.pageSize);
      this.updatePagination();
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