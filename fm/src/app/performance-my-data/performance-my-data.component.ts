import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-performance-my-data',
  templateUrl: './performance-my-data.component.html',
  styleUrl: './performance-my-data.component.scss'
})
export class PerformanceMyDataComponent {

  activeNavItem: string = 'myData';

  constructor(private router : Router) {}

  navigateToMyData()
  {
    this.activeNavItem = 'myData';
    this.router.navigate(['myData']);
  }

  navigateToMySkillSetMatrix()
  {
    this.activeNavItem = 'myData';
    this.router.navigate(['myData']);
  }

}
