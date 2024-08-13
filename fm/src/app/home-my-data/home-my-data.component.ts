import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-my-data',
  templateUrl: './home-my-data.component.html',
  styleUrl: './home-my-data.component.scss'
})
export class HomeMyDataComponent {

  activeNavItem: string = 'overview';

  constructor(private router: Router) {}

  navigateToDashboard() {
    this.activeNavItem = 'dashboard';
    this.router.navigate(['new-Home/my-space', 'dashboard']);
  }

  navigateToOverview()
  {
    this.activeNavItem = 'overview';
    this.router.navigate(['new-Home/my-space', 'overview'])
  }

  navigateToCalendar()
  {
    this.activeNavItem = 'calendar';
    this.router.navigate(['new-Home/my-space', 'calendar'])
  }

}
