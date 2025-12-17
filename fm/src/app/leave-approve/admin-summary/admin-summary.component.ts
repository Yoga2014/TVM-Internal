import { Component, OnInit } from '@angular/core';
import { AdminleaveService } from 'src/app/AllServices/adminleaveserivce';
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
  filteredLeaves: LeaveRequest[] = [];
  paginatedLeaves: LeaveRequest[] = [];

  searchTerm = '';

  constructor(private AdminleaveService: AdminleaveService) {}

  ngOnInit(): void {
    this.loadSummary();
  }

  loadSummary() {
    this.AdminleaveService.getLeaveSummary().subscribe({
      next: data => {
        this.leaves = data;
        this.filteredLeaves = [...this.leaves];
        this.totalPages = Math.ceil(this.filteredLeaves.length / this.pageSize);
        this.updatePagination();
      },
      error: err => console.error('Summary load failed', err)
    });
  }

  filterLeaves() {
    const term = this.searchTerm.toLowerCase();

    this.filteredLeaves = this.leaves.filter(leave =>
      (leave.employeeName || '').toLowerCase().includes(term) ||
      (leave.leaveType || '').toLowerCase().includes(term) ||
      (leave.startDate || '').toLowerCase().includes(term) ||
      (leave.endDate || '').toLowerCase().includes(term)
    );

    this.page = 1;
    this.totalPages = Math.ceil(this.filteredLeaves.length / this.pageSize);
    this.updatePagination();
  }

  updatePagination() {
    const start = (this.page - 1) * this.pageSize;
    this.paginatedLeaves =
      this.filteredLeaves.slice(start, start + this.pageSize);
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
