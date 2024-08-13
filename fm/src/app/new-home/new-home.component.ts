import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  styleUrl: './new-home.component.scss'
})
export class NewHomeComponent {

  activeNavItem: string = 'my-space';

  constructor(private router: Router) {}

  navigateToMySpace() {
    this.activeNavItem = 'my-space';
    this.router.navigate(['my-space']);
  }

  teamsDashboardNavigate() {
    this.activeNavItem = 'teams-dashboard';
    this.router.navigate(['/teams-dashboard']);
  }

  navigateToOrganization()
  {
    this.activeNavItem = 'organization';
    this.router.navigate(['/organization']);
  }

}
