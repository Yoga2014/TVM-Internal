import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goals-my-data',
  templateUrl: './goals-my-data.component.html',
  styleUrl: './goals-my-data.component.scss'
})
export class GoalsMyDataComponent {

  activeNavItem: string = 'skillset';

  constructor(private router: Router) { }


  navigateToGoal()
  {
    this.activeNavItem = 'goals';
    this.router.navigate(['perfomance-myData/myData', 'goals']);
  }

  navigateToSkillSet()
  {
    this.activeNavItem = 'skillset',
    this.router.navigate(['perfomance-myData/myData', 'skillset'])
  }

  navigateToCompetency()
  {
    this.activeNavItem = 'competency',
    this.router.navigate(['perfomance-myData/myData', 'competency']) 
  }

  navigateToFeedback()
  {
    this.activeNavItem = 'feedback',
    this.router.navigate(['perfomance-myData/myData', 'feedback'])
  }

}
