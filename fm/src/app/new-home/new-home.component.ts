import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-new-home',
  templateUrl: './new-home.component.html',
  standalone: false,
  styleUrls: ['./new-home.component.scss']
})
export class NewHomeComponent {
  activeNavItem: string = 'my-space';
  activeSubNavItem: string= 'Overview' ;

 constructor(private router: Router, private route: ActivatedRoute) {
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;

        if (url.includes('/new-Home/my-space')) {
          this.activeNavItem = 'my-space';

        } else if (url.includes('/new-Home/teams-dashboard')) {
          this.activeNavItem = 'teams-dashboard';

        } else if (url.includes('/new-Home/organization')) {
          this.activeNavItem = 'organization';

        }
      }
    });
  }
  

  navigateToMySpace() {
    this.activeNavItem = 'my-space';
    this.activeSubNavItem = 'Overview'; 
    this.router.navigate(['my-space']);
  }

  teamsDashboardNavigate() {
    this.activeNavItem = 'teams-dashboard';
    this.activeSubNavItem = 'Team Space';
    this.router.navigate(['/teams-dashboard']);    
  }

  navigateToOrganization() {
    this.activeNavItem = 'organization';
    this.activeSubNavItem = 'Announcements';
    this.router.navigate(['organization']);
  }

  updateBreadcrumb(subNav: any) {
    this.activeSubNavItem = subNav;
  }
  goToProjects() {
  // switch tab to teams-dashboard
  this.activeNavItem = 'teams-dashboard';
  this.activeSubNavItem = 'projects';
  this.router.navigate(['new-Home', 'teams-dashboard', 'projects']);
}
navigateTo(tab: string) {
  this.activeNavItem = tab;
  this.router.navigate([tab], { relativeTo: this.route });
}
  
}
