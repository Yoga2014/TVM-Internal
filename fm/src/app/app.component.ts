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
  activeLink = 'home';
  isLoggedIn = false;
  showLayout = false;
  username = '';
  avatarInitials = '';
  confirmation = false;
  dropdownOpen = false;

  private routerSubscription!: Subscription;
  private backButtonPressed = false; // flag to prevent modal on page load

  menuItems: any[] = [];

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.showLayout = this.isLoggedIn;

    this.setUsernameFromStorage();
    this.setupMenuByRole();

    // Track active link for sidebar highlight
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeLink = this.getActiveLink(event.urlAfterRedirects);
      }
    });

    // Initialize history to intercept back button
    history.pushState(null, '', location.href);
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
  }

  setupMenuByRole() {
    const role = localStorage.getItem('role');

    if (role === 'admin') {
      this.menuItems = [
        { link: 'home', icon: 'fa-solid fa-house', title: 'Home', path: 'new-Home' },
        { link: 'profile', icon: 'fa-solid fa-id-card', title: 'Profile', path: 'header' },
        { link: 'leave', icon: 'fa-solid fa-umbrella-beach fa-flip-horizontal', title: 'Leave Request', path: 'leave-tracking' },
        { link: 'leave-approve', icon: 'fa-solid fa-calendar-check', title: 'Leave Tracking', path: 'leave-approve' },
        { link: 'time', icon: 'fa-solid fa-clock', title: 'Time Tracking', path: 'time-tracking' },
        { link: 'onboarding', icon: 'fa-regular fa-handshake', title: 'Onboarding', path: 'onboarding' },
        { link: 'goals', icon: 'fa-solid fa-trophy', title: 'Performance', path: 'perfomance-myData' },
        { link: 'task', icon: 'fa-solid fa-list-check', title: 'Task', path: 'task-tasks' },
        { link: 'operation', icon: 'fa-brands fa-ubuntu', title: 'Operation', path: 'operation' },
        { link: 'reports', icon: 'fa-solid fa-chart-pie', title: 'Reports', path: 'reports' },
        { link: 'logout', icon: 'fa-solid fa-right-from-bracket', title: 'Logout', path: 'logout' }
      ];
    } else if (role === 'user') {
      this.menuItems = [
        { link: 'leave', icon: 'fa-solid fa-umbrella-beach fa-flip-horizontal', title: 'Leave Tracking', path: 'leave-tracking' },
        { link: 'time', icon: 'fa-solid fa-clock', title: 'Time Tracking', path: 'time-tracking' },
        { link: 'goals', icon: 'fa-solid fa-trophy', title: 'Performance', path: 'perfomance-myData' },
        { link: 'task', icon: 'fa-solid fa-list-check', title: 'Task', path: 'task-tasks' },
        { link: 'reports', icon: 'fa-solid fa-chart-pie', title: 'Reports', path: 'reports' },
        { link: 'logout', icon: 'fa-solid fa-right-from-bracket', title: 'Logout', path: 'logout' }
      ];
    } else {
      this.menuItems = [
        { link: 'reports', title: 'Reports', path: 'reports' },
        { link: 'logout', title: 'Logout', path: 'logout' }
      ];
    }
  }

  getActiveLink(url: string): string {
    const item = this.menuItems.find(m => url.startsWith('/' + m.path));
    return item ? item.link : '';
  }

  navigateTo(link: string, path: string) {
    if (link === 'logout') {
      this.logout();
      return;
    }
    this.activeLink = link;
    this.router.navigate(['/' + path]);
  }

  logout() {
    this.confirmation = true;
  }

  ok() {
    this.authService.logout();
    localStorage.clear();
    sessionStorage.clear();

    this.isLoggedIn = false;
    this.showLayout = false;

    this.router.navigate(['/login']);
  }

  Cancel() {
    this.confirmation = false;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
    this.router.navigate(['/new-Home/emp-profile']);
  }

  

  @HostListener('document:click', ['$event'])
  closeDropdown(event: any) {
    if (!event.target.closest('.avatar-section')) {
      this.dropdownOpen = false;
    }
  }

  handleLoginSuccess() {
    this.isLoggedIn = true;
    this.showLayout = true;
    this.setUsernameFromStorage();
    this.setupMenuByRole();
  }

  private setUsernameFromStorage() {
    this.username = localStorage.getItem('username') || '';
    this.avatarInitials = this.username
      .split(' ')
      .map(x => x[0])
      .join('')
      .toUpperCase();
  }

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    if (!this.authService.isLoggedIn()) return;

    // Ignore first popstate on page load
    if (!this.backButtonPressed) {
      this.backButtonPressed = true;
      return;
    }

    const path = location.pathname;
    if (path === '/login' || path === '/') {
      this.confirmation = true;
      history.pushState(null, '', location.href);
    }
  }
}
