import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  [x: string]: any;
  title = 'fleet-management';

  columnDefs = [];
  rowDefs = [];
  perfomance: string = 'Performance';
  icons = 'fa-solid fa-trophy';
  isExpanded = true;
  isConfigurationExpanded = false;
  showPopup = false;

  constructor(private router: Router) {}

  handleSidebarToggle() {
    this.isExpanded = !this.isExpanded;
  }

  toggleConfiguration() {
    this.isConfigurationExpanded = !this.isConfigurationExpanded;
  }

  // navigateTo(path: string) {
  //   this.router.navigate([path]);
  // }

  headerNavigate() {
    this.router.navigate(['/header']);
  }

  leaveTrackingNavigate() {
    this.router.navigate(['/leave-tracking']);
  }

  goalsNavigate() {
    this.router.navigate(['perfomance-myData']);
  }

  tasksNavigate(){
    this.router.navigate(['task-tasks']);
  }

  newHomeNavigate() {
    this.router.navigate(['new-Home']);
  }

  OnboardingNavigate() {
    this.router.navigate(['onboarding']);
  }

  taskNavigate() {
    this.router.navigate(['task-tasks']);
  }
  togglePopup() {
    this.showPopup = !this.showPopup;
  }

  getClick(getValues: any) {
    this.perfomance = getValues.name;
    this.icons = getValues.icons;
    this.router.navigate([getValues.router]);
  }
}
