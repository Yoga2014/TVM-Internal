import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveService } from '../AllServices/leave.service';
import { MatDialog } from '@angular/material/dialog';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { LeaveRequest } from '../Interface/leave-request.model';

@Component({
  selector: 'app-leave-summary',
  templateUrl: './leave-summary.component.html',
  standalone: false,
  styleUrls: ['./leave-summary.component.scss']
})
export class LeaveSummaryComponent implements OnInit {

  page = 1;
pageSize = 5;
paginatedLeaves: LeaveRequest[] = [];
totalPages = 1;

totalUsedLeaves = 0;
totalRemainingLeaves = 0;

// Add the missing property declaration for 'leaves'
leaves: LeaveRequest[] = [];

constructor(private leaveService: LeaveService,
     private dialog: MatDialog
) {}

ngOnInit(): void {
  this.loadLeaveSummary();
}

loadLeaveSummary(): void {
  this.leaveService.getLeaveSummary().subscribe({
    next: (leavesSummary: LeaveRequest[]) => {
      this.leaves = leavesSummary;

      // Calculate cards
      this.totalUsedLeaves = this.leaves.reduce((sum, l) => sum + (l.booked || 0), 0);
      this.totalRemainingLeaves = this.leaves.reduce((sum, l: LeaveRequest) => sum + (l.available || 0), 0);

      this.totalPages = Math.ceil(this.leaves.length / this.pageSize);
      this.updatePagination();
    }
  });
}

updatePagination() {
  const start = (this.page - 1) * this.pageSize;
  const end = start + this.pageSize;
  this.paginatedLeaves = this.leaves.slice(start, end);
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
  applyLeave(): void {
    const dialogRef = this.dialog.open(ApplyLeaveComponent);
    dialogRef.afterClosed().subscribe((result: LeaveRequest | undefined) => {
      if (result) {
        this.leaveService.addLeaveRequest(result).subscribe({
          next: () => this.leaveService.setLeaveApplied(result),
          error: (err) => console.error('Error applying leave', err),
        });
      }
    });
  }
}