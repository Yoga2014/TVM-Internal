import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/AllServices/employee.service';

@Component({
  selector: 'app-admin-time-sheet',
  templateUrl: './admin-time-sheet.component.html',
  styleUrl: './admin-time-sheet.component.scss'
})
export class AdminTimeSheetComponent {
  
    @Output() subNavChange = new EventEmitter<string>();
  
    constructor(private router: Router, private myService: EmployeeService) {
      this.activeNavItem = this.myService.activeTab ? this.myService.activeTab : this.activeNavItem;
      this.router.navigate(['admin-time-sheet', this.activeNavItem]);
    }
  
activeNavItem: string = 'admin-time-summary';

navigateToTimeSheet() {
  this.activeNavItem = 'admin-time-summary';
  this.router.navigate(['admin-time-sheet/admin-time-summary']);
}

navigateToTimeTracking() {
  this.activeNavItem = 'admin-time-tracking';
  this.router.navigate(['admin-time-sheet/admin-time-tracking']);
}


}
