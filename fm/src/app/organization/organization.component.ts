import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  standalone: false,
  styleUrl: './organization.component.scss'
})
export class OrganizationComponent {
  @Output() subNavChange = new EventEmitter<string>();  // Specify string type
  activeNavItem: string = 'announcements';

  constructor(private router: Router) {}

  ngOnInit(): void {
  const currentUrl = this.router.url;

  if (currentUrl.includes('new-hires')) {
    this.activeNavItem = 'newHires';
    window.scrollTo(0,0); // optional scroll reset
  }
}
  
  navigatePolicies(){
    this.activeNavItem = 'policies';
    this.subNavChange.emit('Policies'); 
    this.router.navigate(['/new-home/organization/policies']);
  }
  
  navigateAnnouncements(){
    this.activeNavItem = 'announcements';
    this.subNavChange.emit('Announcements'); 
    this.router.navigate(['/new-home/organization/announcements']);
  }
  
  navigateEmployeeTree(){
    this.activeNavItem = 'employeeTree';
    this.subNavChange.emit('Employee Tree'); 
    this.router.navigate(['/new-home/organization/employee-tree']);
  }
  
  navigateDepartmentTree(){
    this.activeNavItem = 'departmentTree';
    this.subNavChange.emit('Department Tree'); 
    this.router.navigate(['/new-home/organization/department-tree']);
  }
  
  navigateDepartmentDirectory(){
    this.activeNavItem = 'departmentDirectory';
    this.subNavChange.emit('Department Directory'); 
    this.router.navigate(['/new-home/organization/department-directory']);
  }
  
  navigateBirthdayFolks(){
    this.activeNavItem = 'birthdayFolks';
    this.subNavChange.emit('Birthday Folks'); 
    this.router.navigate(['/new-home/organization/birthday-folks']);
  }
  
  navigateNewHires(){
    this.activeNavItem = 'newHires';
    this.subNavChange.emit('New Hires'); 
    this.router.navigate(['/new-home/organization/new-hires']);
  }

}
