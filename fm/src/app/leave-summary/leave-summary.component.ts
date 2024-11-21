import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveService } from '../AllServices/leave.service';
import { LeaveRequest } from '../Interface/leave-request.model';
import { ApplyLeaveComponent } from './apply-leave/apply-leave.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-leave-summary',
  templateUrl: './leave-summary.component.html',
  styleUrls: ['./leave-summary.component.scss']
})
export class LeaveSummaryComponent implements OnInit {
  
  leaves: LeaveRequest[] = [];
  loading: boolean = true; 
  error: string | null = null; 
  displayedColumns: string[] = ['leaveType', 'startDate', 'endDate', 'status']; 
  upcomingLeaves: any[] = [];
  viewMode = 'list';

  constructor(private leaveService: LeaveService, private router: Router, private dialog : MatDialog) {}

  ngOnInit() {
    this.leaveService.getLeaveSummary().subscribe((leaves) => {
      this.leaves = leaves.filter((leave) => leave && leave.leaveType && leave.available !== undefined);
    });
    this.leaveService.getLeaveApplied().subscribe((appliedLeave: any) => {
      if (appliedLeave) {
        this.updateLeaveCounts(appliedLeave);
      }
    });
  }

  updateLeaveCounts(leaveData: any): void {
    const leave = this.leaves.find((leave) => leave.leaveType === leaveData.leaveType);
    if (leave) {
    leave.available -= leaveData.days;  
    leave.booked += leaveData.days;     
  }
  }

  validLeave(leave: any): boolean {
    return leave && leave.typeLeave && leave.available != null;
  }

  applyLeave() {
    const dialogRef = this.dialog.open(ApplyLeaveComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.leaveService.bookLeave(result.leaveType, result.days).subscribe({
          next: (response) => {
            this.leaveService.setLeaveApplied(result);
          },
          error: (error) => {
            console.error('Error applying leave', error);
          }
        });
      }
    });
  }

  toggleViewMode(): void {
    this.viewMode = this.viewMode === 'list' ? 'grid' : 'list';
  }
}




// applyLeave() {
//   this.router.navigate(['apply-leave'], { queryParams: { returnUrl: this.router.url } });
// }
