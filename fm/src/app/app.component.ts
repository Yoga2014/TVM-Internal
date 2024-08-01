import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
[x: string]: any;
  title = 'fleet-management';

  columnDefs=[];
  rowDefs=[];
  // isExpanded = false;

  isExpanded = true;
  isConfigurationExpanded = false;

  constructor(private router: Router) {}

  handleSidebarToggle() {
    this.isExpanded = !this.isExpanded;
  }

  toggleConfiguration() {
    this.isConfigurationExpanded = !this.isConfigurationExpanded;
  }

  // navigateTo(path: string) {
  //   this.router.navigate([path]);
  // }

  headerNavigate(){
    this.router.navigate(['/header'])
  }

  navigatecalendar(){
    this.router.navigate(['calendar'])

  }

}
