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
  currentSection: string = '';
  columnDefs=[];
  rowDefs=[];
  // isExpanded = false;
  showPopup:boolean=false
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

  headerNavigate(values:any){
    this.currentSection = values;
    this.router.navigate(['/header'])
  }

  navigatecalendar(){
    this.router.navigate(['calendar'])

  }

  leaveNavigate(values:any){
    this.currentSection = values;
    this.router.navigate(['/apply-leave'])

  }

  holidaysClick(){
    this.router.navigate(['leave-balance'])

  }

  teamsClick(){
    this.router.navigate(['teams'])

  }

  userClick(){
  this.showPopup=true
  }

  hideClick(my:any){
    this.showPopup=my
    console.log(my,'dhsdvfdvfeeyr')
  }
}
