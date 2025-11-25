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

  constructor(private userRoleService:details ) {
    this.userRole()
  }

  selectDepartment(department: any): void {
    this.selectedDepartment = department;
  }

  userRole(){
    this.userRoleService.getUserRoleDetails().subscribe({
      next: (data) => {
        this.departments =  [...new Set(data.map((item:any) => item.roles))].map(role => ({ label: role }));
      },
      error: (err) => {
        console.error('Error fetching employee details', err);
      }
    });
  }
}