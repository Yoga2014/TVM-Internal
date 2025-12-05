import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leaveapprove',
  templateUrl: './leave-approve.component.html',
  styleUrls: ['./leave-approve.component.scss']
})
export class LeaveapproveComponent{

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