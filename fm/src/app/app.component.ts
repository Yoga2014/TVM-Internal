import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from './AllServices/AuthService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'fleet-management';
  activeLink: string = 'home';
  isExpanded = true;
  showPopup = true;
  private routerSubscription: Subscription | undefined;
  isLoggedIn = false;

  // NEW: define missing properties
  showLayout: boolean = false; 
  dropdownOpen: boolean = false;

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
    { link: 'logout', icon: 'fa-solid fa-right-from-bracket', title: 'Logout', path: 'logout' },
  ];

  constructor(private router: Router, private authservice: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authservice.isLoggedIn();
    this.showLayout = this.isLoggedIn;

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.authservice.isLoggedIn();
        this.showLayout = this.isLoggedIn;
        this.updateActiveLink();
        this.checkTokenExpiry();
      }
    });

    // Check token expiry periodically
    setInterval(() => this.checkTokenExpiry(), 1000);
  }

  ngOnDestroy() {
    if (this.routerSubscription) this.routerSubscription.unsubscribe();
  }

  checkTokenExpiry() {
    if (!this.authservice.isLoggedIn() && this.authservice.getToken()) {
      alert('Your session has expired. Please login again.');
      this.authservice.logout();
      this.isLoggedIn = false;
      this.showLayout = false;
    }
  }

  updateActiveLink(): void {
    const currentPath = this.router.url;
    const activeItem = this.menuItems.find(item => currentPath.includes(item.path));
    this.activeLink = activeItem ? activeItem.link : 'home';
  }

  navigateTo(link: string, path: string) {
    if (link === 'logout') {
      const confirmed = confirm('Do you really want to logout?');
      if (confirmed) {
        this.authservice.logout();
        this.isLoggedIn = false;
        this.showLayout = false;
      }
      return;
    }

    this.activeLink = link;
    this.router.navigate([path]).catch(err => console.error('Navigation error:', err));
  }

  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  @HostListener('document:click')
  closeDropdown(): void {
    this.dropdownOpen = false;
  }

  handleLoginSuccess(): void {
    this.isLoggedIn = true;
    this.showLayout = true;
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }
}