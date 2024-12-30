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
  leaves: LeaveRequest[] = [];
  upcomingLeaves: LeaveRequest[] = [];
  viewMode: 'list' | 'grid' = 'list';

  constructor(
    private leaveService: LeaveService,
    // private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadLeaveSummary();
    this.loadUpcomingLeaves();
    this.listenForAppliedLeave();
  }

  loadLeaveSummary(): void {
    this.leaveService.getLeaveSummary().subscribe({
      next: (leavesSummary) => {
        this.leaves = leavesSummary;
      },
      error: (err) => console.error('Error fetching leave summary', err),
    });
  }

  loadUpcomingLeaves(): void {
    this.leaveService.getLeaves().subscribe({
      next: (upcomingLeaves) => {
        this.upcomingLeaves = upcomingLeaves.filter(
          (leave) => leave.status === 'Upcoming'
        );
      },
      error: (err) => console.error('Error fetching upcoming leaves', err),
    });
  }

  listenForAppliedLeave(): void {
    this.leaveService.getLeaveApplied().subscribe({
      next: (appliedLeave) => {
        if (appliedLeave) {
          this.updateLeaveCounts(appliedLeave);
        }
      },
      error: (err) => console.error('Error receiving applied leave updates', err),
    });
  }

  updateLeaveCounts(leaveData: LeaveRequest): void {
    const leave = this.leaves.find((l) => l.typeLeave === leaveData.typeLeave);
    if (leave) {
      const remainingLeaves = (leave.available || 0) - (leaveData.totalDays || 0);
      if (remainingLeaves < 0) {
        alert('Not enough available leaves. Please choose another leave type or apply Leave Without Pay.');
      } else {
        leave.available = remainingLeaves;
        leave.booked = (leave.booked || 0) + (leaveData.totalDays || 0);
      }
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

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'list' ? 'grid' : 'list';
  }
}
