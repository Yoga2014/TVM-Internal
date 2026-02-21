import { Component, OnInit } from '@angular/core';
import { details } from '../AllServices/details.service';
import { ToastService } from '../toast.service';

@Component({
  selector: 'app-department-tree',
  templateUrl: './department-tree.component.html',
  standalone: false,
  styleUrls: ['./department-tree.component.scss']
})
export class DepartmentTreeComponent implements OnInit {
  employees!: any[];
  selectedDepartment: any = null;
  
  constructor(private userRoleService:details, private toastservice: ToastService ) {
    
  }

  ngOnInit() {
    this.userRole();
  }

  selectDepartment(department: any) {
    this.selectedDepartment = department;
  }
  userRole(){
    this.userRoleService.getUserRoleDetails().subscribe({
      next: (data) => {
        this.transformData(data);
      },
      error: (err) => {
        this.toastservice.error('Failed to fetch employee details');
        console.error('Error fetching employee details', err);
      }
    });
  }

  transformData(data: any) {
    const departments: { [key: string]: string[] } = {};

    data.forEach((user:any) => {
      const department = user.roles;

      if (!departments[department]) {
        departments[department] = [];
      }
      departments[department].push(user.username);
    });

    this.employees = [{
      children: Object.keys(departments).map(department => ({
        label: department,
        children: departments[department].map(username => ({ label: username })) 
      }))
    }];
  }
}
