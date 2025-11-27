import { Component } from '@angular/core';

@Component({
  selector: 'app-leaveapprove',
  templateUrl: './leaveapprove.component.html',
  styleUrls: ['./leaveapprove.component.scss']
})
export class LeaveapproveComponent {

  activeNavItem: string = 'leave-requests';   // default

  // Load admin summary
  navigateAdminSummary() {
    this.activeNavItem = 'leave-summary';
  }

  // Load admin request
  navigateAdminRequest() {
    this.activeNavItem = 'leave-requests';
  }
}
