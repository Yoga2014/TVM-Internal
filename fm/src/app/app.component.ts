import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './AllServices/AuthService.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'fleet-management';
  activeLink: string = 'home';
  isExpanded = true;
  isLoggedIn = false;
  showLayout = false;

  dropdownOpen = false;
  confirmation = false; // show logout modal
  private routerSubscription: Subscription | undefined;

  menuItems = [
    { link: 'home', icon: 'fa-solid fa-house', title: 'Home', path: 'new-Home' },
    { link: 'profile', icon: 'fa-solid fa-id-card', title: 'Profile', path: 'header' },
    { link: 'leave', icon: 'fa-solid fa-umbrella-beach fa-flip-horizontal', title: 'Leave Request', path: 'leave-request' },
    { link: 'leave-tracking', icon: 'fa-solid fa-calendar-check', title: 'Leave Tracking', path: 'leave-tracking' },
    { link: 'time', icon: 'fa-solid fa-clock', title: 'Time Tracking', path: 'time-tracking' },
    { link: 'onboarding', icon: 'fa-regular fa-handshake', title: 'Onboarding', path: 'onboarding' },
    { link: 'goals', icon: 'fa-solid fa-trophy', title: 'Performance', path: 'perfomance-myData' },
    { link: 'task', icon: 'fa-solid fa-list-check', title: 'Task', path: 'task-tasks' },
    { link: 'operation', icon: 'fa-brands fa-ubuntu', title: 'Operation', path: 'operation' },
    { link: 'reports', icon: 'fa-solid fa-chart-pie', title: 'Reports', path: 'reports' },
    { link: 'logout', icon: 'fa-solid fa-right-from-bracket', title: 'Logout', path: 'logout' },
  ];

  constructor(
    private router: Router,
    private authservice: AuthService,
    private location: Location
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authservice.isLoggedIn();
    this.showLayout = this.isLoggedIn;

    // Prevent browser back navigation
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', () => {
      if (this.authservice.isLoggedIn()) {
        history.pushState(null, '', location.href);
        this.confirmation = true;
      }
    });

    // Router subscription
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.authservice.isLoggedIn();
        this.showLayout = this.isLoggedIn;
        this.updateActiveLink();
        this.checkTokenExpiry();
      }
    });

    setInterval(() => this.checkTokenExpiry(), 1000);
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }

  checkTokenExpiry() {
    if (!this.authservice.isLoggedIn() && this.authservice.getToken()) {

      this.logout();
    }
  }

  updateActiveLink(): void {
    const currentPath = this.router.url;
    const activeItem = this.menuItems.find(item => currentPath.includes(item.path));
    this.activeLink = activeItem ? activeItem.link : 'home';
  }

  navigateTo(link: string, path: string) {
    if (link === 'logout') {
      this.logout();
      return;
    }
    this.activeLink = link;
    this.router.navigate([path]).catch(err => console.error(err));
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click', ['$event'])
  closeDropdown(event: any): void {
    if (!event.target.closest('.user-info')) {
      this.dropdownOpen = false;
    }
  }

  // Show confirmation modal
  logout(): void {
    this.confirmation = true;
  }

  // Confirm logout
  ok(): void {
    this.authservice.logout();
    localStorage.clear();
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.showLayout = false;
    this.confirmation = false;
    this.router.navigate(['/login']);
  }

  // Cancel logout
  Cancel(): void {
    this.confirmation = false;
  }

  handleLoginSuccess(): void {
    this.isLoggedIn = true;
    this.showLayout = true;
  }
}
