import { Component, EventEmitter, Output } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-teams-dashboard',
  templateUrl: './teams-dashboard.component.html',
  standalone: false,
  styleUrl: './teams-dashboard.component.scss'
})
export class TeamsDashboardComponent {

  activeNavItem: string = '';
  @Output() subNavChange = new EventEmitter<string>();  // Emit string for breadcrumb

  constructor(private router : Router) {
      router.events.subscribe(event => {
    if (event instanceof NavigationEnd) {
      const url = event.urlAfterRedirects;

      if (url.includes('department')) {
        this.activeNavItem = 'department';
      }
      else if (url.includes('projects')) {
        this.activeNavItem = 'projects';
      }
      else if (url.includes('team-list')) {
        this.activeNavItem = 'team-list';
      }
    }
  });
  }

  navigateToMySpace()
  {
    this.activeNavItem = 'team-space';
    this.subNavChange.emit('Team Space');

    this.router?.navigate(['new-home/teams-dashboard', 'team-space']);
  }

  navigateToReportees()
  {
    this.activeNavItem = 'team-reportees';
    this.subNavChange.emit('Reportees');
    this.router.navigate(['new-home/teams-dashboard', 'team-reportees']);
  }

  navigateToDepartment()
  {
    this.activeNavItem = 'department';
    this.subNavChange.emit('Department');
    this.router.navigate(['new-home/teams-dashboard', 'department']);
  }

  navigateToProjects()
  {
    this.activeNavItem = 'projects';
    this.subNavChange.emit('Projects');

    this.router.navigate(['new-home/teams-dashboard', 'projects'])
  }

  navigateToTeamList()
  {
    this.activeNavItem = 'team-list';
    this.subNavChange.emit('Team List');
    this.router.navigate(['new-home/teams-dashboard', 'team-list']);
  }

}
