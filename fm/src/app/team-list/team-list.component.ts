import { Component, OnInit } from '@angular/core';
import { TeamService } from '../AllServices/team.service';

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  standalone: false,
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {

  teams: string[] = [];
  employees: any[] = [];
  filteredEmployees: any[] = [];
  selectedTeam = '';

  // Added missing properties and methods to resolve template errors
  selectedEmployee: any = null; // Holds the currently selected employee
  searchText: string = ''; // Holds the search text input

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.loadTeams();
  }

  loadTeams() {
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
      if (teams.length > 0) {
        this.selectTeam(teams[0]);
      }
    });
  }

  selectTeam(team: string) {
    this.selectedTeam = team;

    this.teamService.getEmployeesByTeam(team).subscribe(data => {
      this.employees = data;
      this.filteredEmployees = data;
    });
  }

  // Filters employees based on the search text
  applySearch(): void {
    const lowerSearchText = this.searchText.toLowerCase();
    this.filteredEmployees = this.employees.filter(emp =>
      emp.firstName.toLowerCase().includes(lowerSearchText) ||
      emp.email.toLowerCase().includes(lowerSearchText) ||
      emp.project.toLowerCase().includes(lowerSearchText) ||
      emp.designation.toLowerCase().includes(lowerSearchText)
    );
  }

  // Sets the selected employee for viewing details
  viewEmployee(emp: any): void {
    this.selectedEmployee = emp;
  }
}
