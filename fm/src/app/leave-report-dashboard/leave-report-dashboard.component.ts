import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveService } from '../AllServices/leave.service';
import { LeaveRequest } from '../Interface/leave-request.model';

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
    private leaveService: LeaveService
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
    this.router.navigate(['apply-leave']);
  }
}
