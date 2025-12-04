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
  selectedTeam: string = ''; 

  currentPage: number = 1; 
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
        this.filteredEmployees = this.employees; 
      },
      error: err => console.error('Error fetching employees:', err) 
    });
  }

selectTeam(team: string) {
  this.selectedTeam = team;
  this.filteredEmployees = this.employees.filter(e => e.department === team);
}


  filterReportees(): void {
    if (this.reporteeFilter) {
      this.filteredEmployees = this.employees.filter(employee =>
        employee.role.toLowerCase() === this.reporteeFilter.toLowerCase()
      );
    } else {
      this.filteredEmployees = [...this.employees]; 
    }
  }

  sortBy(column: string): void {
    const direction = this.sortDirection === 'asc' ? 1 : -1;

  
    if (this.employees.length && this.employees[0][column] !== undefined) {
      this.filteredEmployees.sort((a, b) => {
        const valA = a[column].toString().toLowerCase();
        const valB = b[column].toString().toLowerCase();

        if (valA < valB) {
          return -1 * direction;
        } else if (valA > valB) {
          return 1 * direction;
        }
        return 0;
      });
    }

    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.currentSortColumn = column;
  }

  maskData(data: string): string {
    return data.replace(/./g, '*');
  }

  onItemsPerPageChange(event: any) {
    this.itemsPerPage = +event.target.value; 
    this.currentPage = 1;
  }
  goBack() {
  this.selectedTeam = '';
  this.filteredEmployees = [];
}
}
