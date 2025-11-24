import { Component, OnInit, OnDestroy } from '@angular/core';
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
  isExpanded = true;
  showPopup = true;
  showLayout = true;
  isLoggedIn = false;

  private routerSubscription!: Subscription;

  userRole: string | null = null;

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

  ngOnInit() {
    // Login check
    this.isLoggedIn = !!localStorage.getItem('token');

    // Get role
    this.userRole = localStorage.getItem('userRole');
    this.filterMenuByRole();

    // Listen to route changes (for hiding layout)
    this.routerSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const noLayoutRoutes = ['/login'];
        this.showLayout = !noLayoutRoutes.includes(event.urlAfterRedirects);

        this.updateActiveLink();
      }
    });
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }

  // Filter based on role
  filterMenuByRole() {
    if (this.userRole === 'admin') return;

    if (this.userRole === 'user') {
      this.menuItems = this.menuItems.filter(item =>
        ['task', 'time', 'leave'].includes(item.link)
      );
      return;
    }
  
    this.menuItems = this.menuItems.filter(item => item.link === 'time');
  }

  updateActiveLink() {
    const currentPath = this.router.url;
    const activeItem = this.menuItems.find(item =>
      currentPath.includes(item.path)
    );
    this.activeLink = activeItem ? activeItem.link : 'home';
  }

  navigateTo(link: string, path: string) {
    this.activeLink = link;
    this.router.navigate([path]).catch(err => console.error('Navigation error:', err));
  }

  handleSidebarToggle() {
    this.isExpanded = !this.isExpanded;
  }

  togglePopup() {
    this.showPopup = false;
  }

  handleLoginSuccess() {
    this.isLoggedIn = true;
    localStorage.setItem('token', 'logged-in');
    this.router.navigate(['/home']);
  }
}
