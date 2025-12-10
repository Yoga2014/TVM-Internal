import { Component, EventEmitter, Output } from '@angular/core';
import { EmployeeService } from '../AllServices/employee.service';
import { Router } from '@angular/router';
import { TimeSheetComponent } from "../time-sheet/time-sheet.component";

@Component({
  selector: 'app-time-tracking-my-data',
  templateUrl: './time-tracking-my-data.component.html',
  standalone: false,
  styleUrl: './time-tracking-my-data.component.scss'
})
export class TimeTrackingMyDataComponent {

  activeNavItem: string = 'time-sheet';
  @Output() subNavChange = new EventEmitter<string>();

  constructor(private router: Router, private myService: EmployeeService) {
    this.activeNavItem = this.myService.activeTab ? this.myService.activeTab : this.activeNavItem;
    this.router.navigate(['time-sheet', this.activeNavItem]);
  }

  navigateToTimeSheet() {
    this.activeNavItem = 'time-sheet';
    this.router.navigate(['time-tracking/my-data', 'time-sheet']);
    this.subNavChange.emit('time-sheet');
  }

  navigateToAppraisal() {
    this.activeNavItem = 'time-request';
    this.router.navigate(['time-tracking/my-data', 'time-request']);
    this.subNavChange.emit('time-request');
  }

}

