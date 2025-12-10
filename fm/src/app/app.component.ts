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
  // Clear token if expired or missing role
  if (!this.authService.isLoggedIn()) {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
  }

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
        { link: 'home', icon: 'fa-solid fa-house', title: 'Home', path: 'new-home' },
        { link: 'profile', icon: 'fa-solid fa-id-card', title: 'Profile', path: 'header' },
        { link: 'leave-approve', icon: 'fa-solid fa-calendar-check', title: 'Leave Tracking', path: 'leave-approve' },
        { link: 'time-request', icon: 'fa-solid fa-clock', title: 'Time Tracking', path: 'admin-time-sheet' },
        { link: 'onboarding', icon: 'fa-regular fa-handshake', title: 'Onboarding', path: 'onboarding' },
        { link: 'goals', icon: 'fa-solid fa-trophy', title: 'Performance', path: 'perfomance-myData' },
        { link: 'task', icon: 'fa-solid fa-list-check', title: 'Task', path: 'task-tasks' },
        { link: 'operation', icon: 'fa-brands fa-ubuntu', title: 'Operation', path: 'operation' },
        { link: 'reports', icon: 'fa-solid fa-chart-pie', title: 'Reports', path: 'reports' },
        { link: 'logout', icon: 'fa-solid fa-right-from-bracket', title: 'Logout', path: 'logout' }
      ];
    } else if (role === 'user') {
      this.menuItems = [
        { link: 'leave', icon: 'fa-solid fa-umbrella-beach fa-flip-horizontal', title: 'Leave Request', path: 'leave-tracking' },
        { link: 'time', icon: 'fa-solid fa-clock', title: 'Time Request', path: 'time-tracking' },
        { link: 'task', icon: 'fa-solid fa-list-check', title: 'Task', path: 'task-tasks' },
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
      this.logoutClick();
      return;
    }
    this.activeLink = link;
    this.router.navigate(['/' + path]);
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

toggleDropdown(event: Event) {
  event.stopPropagation();  // prevent document click from closing it
  this.dropdownOpen = !this.dropdownOpen;
}

goToProfile(event: Event) {
  event.stopPropagation();
  this.dropdownOpen = false;
  this.router.navigate(['/new-home/emp-profile']);
}

logoutClick(event? : Event) {
 if(event) event.stopPropagation();
  this.dropdownOpen = false;
  this.confirmation = true;
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
