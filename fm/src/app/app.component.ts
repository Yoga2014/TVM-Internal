import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'fleet-management';
  activeLink: string = 'home';
  columnDefs = [];
  rowDefs = [];
  perfomance: string = 'Performance';
  icons = 'fa-solid fa-trophy';
  isExpanded = true;
  isConfigurationExpanded = false;
  showPopup = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateActiveLink();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveLink();
      }
    });
  }

  updateActiveLink() {
    const currentPath = this.router.url;
    if (currentPath.includes('header')) {
      this.activeLink = 'profile';
    } else if (currentPath.includes('leave-tracking')) {
      this.activeLink = 'leave';
    } else if (currentPath.includes('perfomance-myData')) {
      this.activeLink = 'goals';
    } else if (currentPath.includes('task-tasks')) {
      this.activeLink = 'task';
    } else if (currentPath.includes('new-Home')) {
      this.activeLink = 'home';
    } else if (currentPath.includes('onboarding')) {
      this.activeLink = 'onboarding';
    } else if (currentPath.includes('operation')) {
      this.activeLink = 'operation';
    } else if (currentPath.includes('reports')) {
      this.activeLink = 'reports';
    } else {
      this.activeLink = 'home';
    }
  }

  handleSidebarToggle() {
    this.isExpanded = !this.isExpanded;
  }

  toggleConfiguration() {
    this.isConfigurationExpanded = !this.isConfigurationExpanded;
  }

  headerNavigate() {
    this.activeLink = 'profile';
    this.router.navigate(['/header']);
  }

  leaveTrackingNavigate() {
    this.activeLink = 'leave';
    this.router.navigate(['/leave-tracking']);
  }

  goalsNavigate() {
    this.activeLink = 'goals';
    this.router.navigate(['perfomance-myData']);
  }

  tasksNavigate() {
    this.activeLink = 'task';
    this.router.navigate(['task-tasks']);
  }

  newHomeNavigate() {
    this.activeLink = 'home';
    this.router.navigate(['new-Home']);
  }

  OnboardingNavigate() {
    this.activeLink = 'onboarding';
    this.router.navigate(['onboarding']);
  }

  operationNavigate() {
    this.activeLink = 'operation';
    this.router.navigate(['operation']);
  }

  reportsNavigate() {
    this.activeLink = 'reports';
    this.router.navigate(['reports']);
  }

  taskNavigate() {
    this.activeLink = 'task';
    this.router.navigate(['task-tasks']);
  }

  togglePopup() {
    this.showPopup = false;
  }

  setActiveLink(link: string) {
    this.activeLink = link;
  }
}
