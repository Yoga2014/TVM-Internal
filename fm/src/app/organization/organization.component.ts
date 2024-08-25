import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrl: './organization.component.scss'
})
export class OrganizationComponent {
  
  activeNavItem: string = 'announcements';

  constructor(private router: Router) {}
  
  navigateAnnouncements(){
    this.activeNavItem = 'announcements';
    this.router.navigate(['/announcements']);
  }
  
  navigatePolicies(){
    this.activeNavItem = 'policies';
    this.router.navigate(['/policies']);
  }
  
  navigateEmployeeTree(){
    this.activeNavItem = 'employeeTree';
    this.router.navigate(['/employeeTree']);
  }
  
  navigateDepartmentTree(){
    this.activeNavItem = 'departmentTree';
    this.router.navigate(['/departmentTree']);
  }
  
  navigateDepartmentDirectory(){
    this.activeNavItem = 'departmentDirectory';
    this.router.navigate(['/departmentDirectory']);
  }
  
  navigateBirthdayFolks(){
    this.activeNavItem = 'birthdayFolks';
    this.router.navigate(['/birthdayFolks']);
  }
  
  navigateNewHires(){
    this.activeNavItem = 'newHires';
    this.router.navigate(['/newHires']);
  }

}
