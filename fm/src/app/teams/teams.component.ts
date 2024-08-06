import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent {
  activeNavItem: string = 'leave-reportees';

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.activeNavItem = params['section'] || 'leave-reportees';
    });
  }

  navigateToLeaveReportees() {
    this.activeNavItem = 'leave-reportees';
    this.router.navigate(['leave-tracking/teams/leave-reportees']);
  }

  navigateToOnLeave() {
    this.activeNavItem = 'on-leave';
    this.router.navigate(['leave-tracking/teams/on-leave']);
  }

  navigateToLeaveRequest() {
    this.activeNavItem = 'approval-leave-request';
    this.router.navigate(['leave-tracking/teams/approval-leave-request']);
  }
}
