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
  reporteeFilter: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentSortColumn: string = '';
  teams: any[] = [];
  selectedTeam:string='';

  currentPage: number = 1; // Initialize to the first page
itemsPerPage: number = 5;

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.teamService.getEmployees().subscribe({
      next: data => {
        this.employees = data;
       this.teams = [...new Set(data.map(emp => emp.department))];
        this.filteredEmployees = this.employees; // Initialize filtered employees
      },
      error: err => console.error('Error fetching employees:', err) 
    });
  }

selectTeam(team: string) {
  this.selectedTeam = team;
  this.filteredEmployees = this.employees.filter(e => e.department === team);
}
maskData(data: string): string {
    return data.replace(/./g, '*');
  }

  onItemsPerPageChange(event: any) {
    this.itemsPerPage = +event.target.value; 
    this.currentPage = 1;
  }
 
}
