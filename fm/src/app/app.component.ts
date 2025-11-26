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

  username: string = '';       // Stores logged-in username
  avatarInitials: string = ''; // Stores initials for avatar
  dropdownOpen = false;
  confirmation = false; 
  private routerSubscription: Subscription | undefined;

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

  constructor(
    private router: Router,
    private authservice: AuthService,
    private location: Location
  ) {}

  ngOnInit() {
    this.isLoggedIn = this.authservice.isLoggedIn();
    this.showLayout = this.isLoggedIn;

    // Load username from localStorage if logged in
    if (this.isLoggedIn) {
      this.setUsernameFromStorage();
    }
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']);
    }
    // Prevent browser back navigation for logged-in users
    history.pushState(null, '', location.href);
    this.location.subscribe(() => {
      if (this.authservice.isLoggedIn()) {
        this.logout();
        history.pushState(null, '', location.href);
      }
    });

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.authservice.isLoggedIn();
        this.showLayout = this.isLoggedIn;
        this.updateActiveLink();
        this.checkTokenExpiry();

        if (this.isLoggedIn) {
          this.setUsernameFromStorage();
        } else {
          this.username = '';
          this.avatarInitials = '';
        }
      }
    });

    setInterval(() => this.checkTokenExpiry(), 1000);
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }

  // Load username and initials
  private setUsernameFromStorage(): void {
    this.username = localStorage.getItem('username') || '';
    this.avatarInitials = this.username
      .split(' ')
      .map(n => n[0].toUpperCase())
      .join('')
      .slice(0, 2); // First two initials
  }

checkTokenExpiry() {
  const tokenExpired = this.authservice.isTokenExpired() && this.authservice.getToken();

  if (tokenExpired) {
    // Show alert modal for expired session
    if (!this.confirmation) { // show only once
      alert('Your session has expired. Please log out.');
      this.confirmation = true; // show logout confirmation modal
    }
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
    if (!event.target.closest('.avatar-section')) {
      this.dropdownOpen = false;
    }
  }

  logout(): void {
    this.confirmation = true;
  }

  ok(): void {
    this.authservice.logout();
    localStorage.clear();
    sessionStorage.clear();
    this.isLoggedIn = false;
    this.showLayout = false;
    this.username = '';
    this.avatarInitials = '';
    this.confirmation = false;
    this.router.navigate(['/login']);
  }

  Cancel(): void {
    this.confirmation = false;
  }

  handleLoginSuccess(): void {
    this.isLoggedIn = true;
    this.showLayout = true;
    this.setUsernameFromStorage();
  }
}
