import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-tasks',
  templateUrl: './task-tasks.component.html',
  styleUrl: './task-tasks.component.scss'
})
export class TaskTasksComponent {
    
  activeNavItem: string = 'tasks';

  constructor(private router : Router) {}

  navigateTasks()
  {
    this.activeNavItem = 'tasks';
    this.router.navigate(['tasks']);
  }

  navigateCheckLists()
  {
    this.activeNavItem = 'checkLists';
    this.router.navigate(['tasks']);
  }
}
