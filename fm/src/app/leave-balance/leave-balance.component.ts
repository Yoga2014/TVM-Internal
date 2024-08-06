// src/app/leave-balance/leave-balance.component.ts
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

  applyLeave(leaveType: string | any): void {
    this.leaveService.activeTab = 'leave-balance';
    this.router.navigate(['leave-tracking/mydata/apply-leave'], { queryParams: { leaveType, returnUrl: this.router.url } });
  }
}
