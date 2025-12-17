import { Component, OnInit } from '@angular/core';
import { LeaveService } from '../AllServices/leave.service';
import { LeaveRequest } from '../Interface/leave-request.model';
import { ApplyLeaveComponent } from '../leave-summary/apply-leave/apply-leave.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-leave-balance',
  templateUrl: './leave-balance.component.html',
  standalone: false,
  styleUrls: ['./leave-balance.component.scss'],
})
export class LeaveBalanceComponent implements OnInit {
  leaves: LeaveRequest[] = [];
  isLoading: boolean = true;

  constructor(private leaveService: LeaveService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadLeaveSummary();
  }

  loadLeaveSummary(): void {
    const employeeId = 1; // Replace with actual employeeId retrieval logic
    this.leaveService.getLeaveSummary(employeeId).subscribe({
      next: (data: LeaveRequest[]) => {
        this.leaves = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching leave data', error);
        this.isLoading = false;
      },
    });
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
