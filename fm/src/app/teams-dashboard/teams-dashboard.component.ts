import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams-dashboard',
  templateUrl: './teams-dashboard.component.html',
  styleUrl: './teams-dashboard.component.scss'
})
export class TeamsDashboardComponent {

  activeNavItem: string = 'team-space';

  constructor(private router : Router) {}

  navigateToMySpace()
  {
    this.activeNavItem = 'team-space';
    this.router.navigate(['new-Home/teams-dashboard', 'team-space']);
  }

  navigateToReportees()
  {
    this.activeNavItem = 'team-reportees';
    this.router.navigate(['new-Home/teams-dashboard', 'team-reportees']);
  }

  navigateToDepartment()
  {
    this.activeNavItem = 'department';
    this.router.navigate(['new-Home/teams-dashboard', 'department']);
  }

  navigateToProjects()
  {
    this.activeNavItem = 'projects';
    this.router.navigate(['new-Home/teams-dashboard', 'projects'])
  }

  navigateToTeamList()
  {
    this.activeNavItem = 'team-list';
    this.router.navigate(['new-Home/teams-dashboard', 'team-list']);
  }

}
