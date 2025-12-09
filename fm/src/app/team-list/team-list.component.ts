import { Component, OnInit } from '@angular/core';
import { TeamService } from '../AllServices/team.service';



@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  standalone: false,
  styleUrls: ['./team-list.component.scss']
})
export class TeamListComponent implements OnInit {
  employees: any[] = [];
  filteredEmployees: any[] = [];
  teams: any[] = [];
  selectedTeam: string = '';
  selectedEmployee: any = null;
  avatarInitials: string = ''; // <-- For avatar
  searchText: string = '';

  currentPage: number = 1; 
  itemsPerPage: number = 5;

  constructor(
    private teamService: TeamService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.teamService.getEmployees().subscribe({
      next: data => {
        this.employees = data;

        this.teams = [...new Set(data.map(emp => emp.team))];

        if (this.teams.length > 0) {
          this.selectTeam(this.teams[0]);
        }
      },
      error: err => console.error('Error fetching employees:', err)
    });
  }

 
  selectTeam(team: string) {
    this.selectedTeam = team;
    this.filteredEmployees = this.employees.filter(e => e.team === team);
    this.applySearch();
  }


  applySearch() {
    const text = this.searchText.toLowerCase();
    this.filteredEmployees = this.employees
      .filter(e => e.team === this.selectedTeam)
      .filter(e =>
        e.employeeId?.toString().toLowerCase().includes(text) ||
        e.firstName.toLowerCase().includes(text) ||
        e.lastName.toLowerCase().includes(text) ||
        e.nickName?.toLowerCase().includes(text) ||
        e.email.toLowerCase().includes(text) ||
        e.designation.toLowerCase().includes(text)
      );
  }

 
  viewEmployee(emp: any) {
    this.selectedEmployee = emp;
    this.avatarInitials = this.getAvatarInitials(emp.firstName);
  }


  getAvatarInitials(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '?';
  }


}
