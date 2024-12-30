import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone:false
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'fleet-management';
  activeLink: string = 'home';
  isExpanded = true;
  showPopup = true;
  private routerSubscription: Subscription | undefined;

  isLoggedIn = false;
  handleLoginSuccess(): void {
    this.isLoggedIn = true;
  }
  menuItems = [
    { link: 'home', icon: 'fa-solid fa-house', title: 'Home', path: 'new-Home' },
    { link: 'profile', icon: 'fa-solid fa-id-card', title: 'Profile', path: 'header' },
    { link: 'leave', icon: 'fa-solid fa-umbrella-beach fa-flip-horizontal', title: 'Leave Tracking', path: 'leave-tracking' },
    { link: 'time', icon: 'fa-solid fa-clock', title: 'Time Tracking', path: 'time-tracking' },
    { link: 'onboarding', icon: 'fa-regular fa-handshake', title: 'Onboarding', path: 'onboarding' },
    { link: 'goals', icon: 'fa-solid fa-trophy', title: 'Performance', path: 'perfomance-myData' },
    { link: 'task', icon: 'fa-solid fa-list-check', title: 'Task', path: 'task-tasks' },
    { link: 'operation', icon: 'fa-brands fa-ubuntu', title: 'Operation', path: 'operation' },
    { link: 'reports', icon: 'fa-solid fa-chart-pie', title: 'Reports', path: 'reports' },
  ];

  constructor(private router: Router) { }

  ngOnInit() {
    this.updateActiveLink();
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveLink();
      }
    });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  updateActiveLink() {
    const currentPath = this.router.url;
    const activeItem = this.menuItems.find((item) => currentPath.includes(item.path));
    this.activeLink = activeItem ? activeItem.link : 'home';
  }

  navigateTo(link: string, path: string) {
    this.activeLink = link;
    this.router.navigate([path]).catch((err) => console.error('Navigation error:', err));
  }

  handleSidebarToggle() {
    this.isExpanded = !this.isExpanded;
  }

  togglePopup() {
    this.showPopup = false;
  }
}
