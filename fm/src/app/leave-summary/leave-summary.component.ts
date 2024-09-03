import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveService } from '../AllServices/leave.service';
import { LeaveRequest } from '../Interface/leave-request.model';

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

  constructor(private leaveService: LeaveService, private router: Router) {}

  ngOnInit() {
    this.loadLeaves();
  }

  loadLeaves() {
    this.leaveService.getLeaves().subscribe({
      next: (data) => {
        this.leaves = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load leaves. Please try again later.';
        console.error('Error fetching leaves', err);
        this.loading = false;
      }
    });
  }

  applyLeave() {
    this.router.navigate(['apply-leave'], { queryParams: { returnUrl: this.router.url } });
  }
}
