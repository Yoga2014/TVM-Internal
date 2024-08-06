// my-data.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../AllServices/employee.service';

@Component({
  selector: 'app-my-data',
  templateUrl: './my-data.component.html',
  styleUrls: ['./my-data.component.scss']
})
export class MyDataComponent {
  activeNavItem: string = 'leave-summary';

  constructor(private router: Router, private myService: EmployeeService) {
    this.activeNavItem = this.myService.activeTab ? this.myService.activeTab : this.activeNavItem;
    this.router.navigate(['leave-tracking/mydata', this.activeNavItem]);
  }

  navigateToLeavesummary() {
    this.activeNavItem = 'leave-summary';
    this.router.navigate(['leave-tracking/mydata', 'leave-summary']);
  }

  navigateToLeaveBalance() {
    this.activeNavItem = 'leave-balance';
    this.router.navigate(['leave-tracking/mydata', 'leave-balance']);
  }

  navigateLeaveRequest() {
    this.activeNavItem = 'leave-requests';
    this.router.navigate(['leave-tracking/mydata', 'leave-requests']);
  }

  navigateApplyLeave()
  {
    this.activeNavItem = 'apply-leave';
    this.router.navigate(['leave-tracking/mydata', 'apply-leave'])
  }
}
