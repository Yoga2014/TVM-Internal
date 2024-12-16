import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveService } from '../AllServices/leave.service';
import { LeaveRequest } from '../Interface/leave-request.model';
import { ApplyLeaveComponent } from '../leave-summary/apply-leave/apply-leave.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-leave-balance',
  templateUrl: './leave-balance.component.html',
  styleUrls: ['./leave-balance.component.scss']
})
export class LeaveBalanceComponent implements OnInit {
  leaves: LeaveRequest[] = [];
  isLoading: boolean = true; // Optional, to show a loading indicator

  constructor(
    private router: Router,
    private leaveService: LeaveService,
    private dialog : MatDialog
  ) {}

  ngOnInit(): void {
    this.loadLeaves();
  }

  loadLeaves(): void {
    this.leaveService.getLeaves().subscribe({
      next: (data: LeaveRequest[]) => {
        this.leaves = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching leave data', error);
        this.isLoading = false;
      }
    });
  }

  applyLeave(leaveType: string): void 
  {
    const dialogRef = this.dialog.open(ApplyLeaveComponent, {
      width: '600px',
      data: { goalId: null }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.loadLeaves();
      }
    });
    // this.router.navigate(['apply-leave'], { queryParams: { returnUrl: this.router.url, leaveType: leaveType } });
  }
}
