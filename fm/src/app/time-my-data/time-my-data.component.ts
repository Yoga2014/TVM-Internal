import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../AllServices/employee.service';

@Component({
  selector: 'app-time-my-data',
  templateUrl: './time-my-data.component.html',
  styleUrl: './time-my-data.component.scss'
})
export class TimeMyDataComponent {


  activeNavItem: string = 'my-data';
  activeSubNavItem: string = 'time-logs';
  @Output() subNavChange = new EventEmitter<string>();

  constructor(private router: Router, private myService: EmployeeService) {
    this.activeSubNavItem = this.myService.activeTab ? this.myService.activeTab : this.activeSubNavItem;
    this.router.navigate(['my-data', this.activeSubNavItem]);
  }

  navigateToMyData() {
    this.activeNavItem = 'my-data';
    this.router.navigate(['my-data']);
  }

  // navigateToTeam() {
  //   this.activeNavItem = 'team';
  //   this.router.navigate(['team']);
  // }

  navigateToTimeLogs() {
    this.activeSubNavItem = 'time-logs';
    this.router.navigate(['my-data', 'time-logs']);
    this.subNavChange.emit('time-logs');
  }

  navigateToTimesheets() {
    this.activeSubNavItem = 'time-sheets';
    this.router.navigate(['my-data', 'time-sheets']);
    this.subNavChange.emit('time-sheets');
  }

  navigateToAppraisal() {
    this.activeSubNavItem = 'appraisal';
    this.router.navigate(['my-data', 'appraisal']);
    this.subNavChange.emit('appraisal');
  }
  
}
