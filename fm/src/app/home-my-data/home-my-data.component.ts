import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-my-data',
  templateUrl: './home-my-data.component.html',
  styleUrls: ['./home-my-data.component.scss']
})
export class HomeMyDataComponent implements OnInit {

  

  activeNavItem: string = 'overview';

  showTotalEmployee: boolean = false;
  showParticular: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen when user clicks view button (from TotalEmployeeComponent)
    window.addEventListener("showParticularTab", () => {
      this.showParticular = true;
      this.activeNavItem = 'particular-emp';
      this.router.navigate(['new-home/my-space/particular-emp']);
    });

    // Listen when clicking Total Employee card from Overview
    window.addEventListener("showTotalEmployeeTab", () => {
      this.showTotalEmployee = true;
      this.showParticular = false;
      this.navigateToEmpDetails();
    });
  }

  navigateToOverview() {
    this.activeNavItem = 'overview';
    this.showTotalEmployee = false;
    this.showParticular = false;
  }

  navigateToEmpDetails() {
    this.activeNavItem = 'total-employee';
    this.showTotalEmployee = true;
    this.showParticular = false;
    this.router.navigate(['new-home/my-space/total-employee']);
  }

  navigateToParticularDetails() {
    this.activeNavItem = 'particular-emp';
    this.showParticular = true;
    this.router.navigate(['new-home/my-space/particular-emp']);
  }

}
