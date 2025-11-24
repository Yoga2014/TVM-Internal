import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {

  title = 'fleet-management';

  activeLink: string = 'home';
  dropdownOpen = false;
  isLoggedIn = false;
  showLayout: boolean = true;

  userName: string = 'User';         // Displayed in header
  userInitial: string = '';          // First letter for avatar

  private routerSubscription!: Subscription;

  // Sidebar Menu Items
  menuItems = [
    { link: 'home', icon: 'fa-solid fa-house', title: 'Home', path: 'new-Home' },
    { link: 'profile', icon: 'fa-solid fa-id-card', title: 'Profile', path: 'header' },
    { link: 'leave', icon: 'fa-solid fa-umbrella-beach fa-flip-horizontal', title: 'Leave Tracking', path: 'leave-tracking' },
    { link: 'time', icon: 'fa-solid fa-clock', title: 'Time Tracking', path: 'time-tracking' },
    { link: 'onboarding', icon: 'fa-regular fa-handshake', title: 'Onboarding', path: 'onboarding' },
    { link: 'goals', icon: 'fa-solid fa-trophy', title: 'Performance', path: 'perfomance-myData' },
    { link: 'task', icon: 'fa-solid fa-list-check', title: 'Task', path: 'task-tasks' },
    { link: 'operation', icon: 'fa-brands fa-ubuntu', title: 'Operation', path: 'operation' },
    { link: 'reports', icon: 'fa-solid fa-chart-pie', title: 'Reports', path: 'reports' }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Set user initial
    this.userInitial = this.userName.charAt(0).toUpperCase();

    // Detect active menu item based on URL
    this.updateActiveLink();

    // Listen to router changes
    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.updateActiveLink();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  // Determine current active link
  updateActiveLink(): void {
    const currentPath = this.router.url;
    const activeItem = this.menuItems.find(item => currentPath.includes(item.path));
    this.activeLink = activeItem ? activeItem.link : 'home';
  }

  // Navigate to selected menu item
  navigateTo(link: string, path: string): void {
    this.activeLink = link;
    this.router.navigate([path]).catch(err => console.error('Navigation error:', err));
  }

  // Toggle dropdown only when clicking inside avatar section
  toggleDropdown(): void {
    this.dropdownOpen = !this.dropdownOpen;
  }

  // Close dropdown when clicking anywhere outside
  @HostListener('document:click')
  closeDropdown(): void {
    this.dropdownOpen = false;
  }

  // Logout function
  logout(): void {
    localStorage.clear();
    this.dropdownOpen = false;
    this.router.navigate(['/login']);
  }

  // After login from <app-login>
  handleLoginSuccess(): void {
    this.isLoggedIn = true;
    this.showLayout = true;
    localStorage.setItem('token', 'logged-in');
    this.router.navigate(['/home']);
  }

  navigateToProfile(): void {
    this.router.navigate(['/profile']);
  }
}
