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
  isLoggedIn = false;
  showLayout = false;
  username: string = '';
  avatarInitials: string = '';
  confirmation = false;
  dropdownOpen = false;

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

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.showLayout = this.isLoggedIn;
    this.setUsernameFromStorage();

    // Listen to router changes
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.activeLink = this.getActiveLink(event.urlAfterRedirects);
      }
    });

    // Listen to browser back button
    window.addEventListener('popstate', this.handleBackButton.bind(this));

    // Prevent leaving app on first load
    history.pushState(null, '', location.href);
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
    window.removeEventListener('popstate', this.handleBackButton.bind(this));
  }

  private handleBackButton() {
    if (!this.authService.isLoggedIn()) return;

    // Only show confirmation if the current URL is login or root
    const path = location.pathname;
    if (path === '/login' || path === '/') {
      this.confirmation = true;
      history.pushState(null, '', location.href); // stay on the app
    }
  }

  getActiveLink(url: string): string {
    const item = this.menuItems.find(m => url.includes(m.path));
    return item ? item.link : 'home';
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
    this.authService.logout();
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
    history.pushState(null, '', location.href);
  }

  handleLoginSuccess(): void {
    this.isLoggedIn = true;
    this.showLayout = true;
    this.setUsernameFromStorage();
  }

  private setUsernameFromStorage(): void {
    this.username = localStorage.getItem('username') || '';
    this.avatarInitials = this.username
      .split(' ')
      .map(n => n[0].toUpperCase())
      .join('')
      .slice(0, 2);
  }
}
