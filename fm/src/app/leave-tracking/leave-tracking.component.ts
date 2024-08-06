// src/app/leave-tracking/leave-tracking.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-tracking',
  templateUrl: './leave-tracking.component.html',
  styleUrls: ['./leave-tracking.component.scss']
})
export class LeaveTrackingComponent {
  activeNavItem: string = 'mydata';

  constructor(private router: Router) {}

  navigateToMyData() {
    this.activeNavItem = 'mydata';
    // this.router.navigate(['mydata']);
  }

  navigateToTeams() {
    this.activeNavItem = 'teams';
    // this.router.navigate(['/teams']);
  }
}
