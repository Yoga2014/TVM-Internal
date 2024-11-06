import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveService } from '../AllServices/leave.service';
import { LeaveRequest } from '../Interface/leave-request.model';

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
    private leaveService: LeaveService
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
    this.router.navigate(['apply-leave'], { queryParams: { returnUrl: this.router.url, leaveType: leaveType } });
  }
}
