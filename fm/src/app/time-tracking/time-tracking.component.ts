import { Component, EventEmitter, Output } from '@angular/core';
import { EmployeeService } from '../AllServices/employee.service';
import { Router } from '@angular/router';
import { TimeTrackingMyDataComponent } from "../time-tracking-my-data/time-tracking-my-data.component";

@Component({
  selector: 'app-time-tracking',
  templateUrl: './time-tracking.component.html',
  standalone: false,
  styleUrl: './time-tracking.component.scss'
})
export class TimeTrackingComponent {

  activeNavItem: string = 'my-data';
  activeSubNavItem: string = 'time-sheet';

  constructor(private router: Router) {}
  
navigateToMyData() {
  this.activeNavItem = 'my-data';
  this.activeSubNavItem = 'time-sheet';
}
navigateToMyDatas() {
  this.activeNavItem = 'my-data';
  this.activeSubNavItem = 'appraisal';
}

updateSubBreadcrumb(subNav: string) {
  this.activeSubNavItem = subNav;
}

}
