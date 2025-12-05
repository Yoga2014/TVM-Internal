// department-directory.component.ts
import { Component } from '@angular/core';
import { details } from '../AllServices/details.service';

@Component({
  selector: 'app-department-directory',
  templateUrl: './department-directory.component.html',
  standalone: false,
  styleUrls: ['./department-directory.component.scss']
})
export class DepartmentDirectoryComponent {
  departments :any;
 selectedDepartment: any;
   searchTerm: string = '';

  constructor(private userRoleService:details ) {
    this.userRole()
  }

  selectDepartment(department: any): void {
    this.selectedDepartment = department;
  }

  userRole(){
    this.userRoleService.getUserRoleDetails().subscribe({
      next: (data) => {
        console.log(data);
        this.departments =  [...new Set(data.map((item:any) => item.role))].map(role => ({ label: role }));
      },
      error: (err) => {
        console.error('Error fetching employee details', err);
      }
    });
  }
    get filteredDepartments() {
    if (!this.searchTerm) return this.departments;
    return this.departments.filter((d: any) =>
      d.label.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}