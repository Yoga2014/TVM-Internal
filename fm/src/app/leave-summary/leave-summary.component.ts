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

  constructor(private leaveService: LeaveService, private router: Router) {}

  ngOnInit() {
    this.leaveService.getLeaves().subscribe(data => {
      this.leaves = data;
    });
  }

  applyLeave() {
    this.router.navigate(['leave-tracking/mydata/apply-leave'], { queryParams: { returnUrl: this.router.url } });
  }
}
