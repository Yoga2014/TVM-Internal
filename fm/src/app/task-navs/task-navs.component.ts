import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-navs',
  templateUrl: './task-navs.component.html',
  styleUrl: './task-navs.component.scss'
})
export class TaskNavsComponent {

  activeNavItem: string = 'my-task';

  constructor(private router: Router) { }


  navigateToMyTask()
  {
    this.activeNavItem = 'my-task';
    this.router.navigate(['task-tasks/tasks', 'my-task']);
  }

  navigateToTrackTask()
  {
    this.activeNavItem = 'track-task',
    this.router.navigate(['task-tasks/tasks', 'track-task'])
  }

  navigateToFormView()
  {
    this.activeNavItem = 'form-view',
    this.router.navigate(['task-tasks/tasks', 'form-view']) 
  }

}
