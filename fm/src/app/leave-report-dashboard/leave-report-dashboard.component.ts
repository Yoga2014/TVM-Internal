import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveService } from '../AllServices/leave.service';
import { LeaveRequest } from '../Interface/leave-request.model';
import { ApplyLeaveComponent } from '../leave-summary/apply-leave/apply-leave.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-leave-report-dashboard',
  templateUrl: './leave-report-dashboard.component.html',
  styleUrls: ['./leave-report-dashboard.component.scss']
})
export class LeaveReportDashboardComponent implements OnInit {
  leaves: LeaveRequest[] = [];
  isLoading: boolean = true;

  constructor(
    private router: Router,
    private leaveService: LeaveService,
    private dialog : MatDialog
  ) {}

  ngOnInit(): void {
    this.loadLeaveReports();
  }

  loadLeaveReports(): void {
    this.leaveService.getLeaves().subscribe(
      (data: LeaveRequest[]) => {
        this.leaves = data;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error fetching leave data', error);
        this.isLoading = false;
      }
    );
  }

  applyLeave(): void {
    {
      const dialogRef = this.dialog.open(ApplyLeaveComponent, {
        width: '600px',
        data: { goalId: null }
      });
  
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.loadLeaveReports();
        }
      });
    // this.router.navigate(['apply-leave']);
  }
}
}
