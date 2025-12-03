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
  this.router.navigate(['/time-tracking/my-data/time-sheet']);
}


  navigateToTimeSheet() {
    this.activeNavItem = 'time-sheet';
this.router.navigate(['/time-tracking/my-data/time-sheet']);
    this.subNavChange.emit('time-sheet');
  }

  navigateToAppraisal() {
    this.activeNavItem = 'appraisal';
this.router.navigate(['/time-tracking/my-data/appraisal']);
    this.subNavChange.emit('appraisal');
  }

}

