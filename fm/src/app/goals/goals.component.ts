import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoalsService } from './goals.service'; // Adjust the import path as needed

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss'],
})
export class GoalsComponent implements OnInit {
  isContainerVisible: boolean = false;
  isGoalTrackerVisible: boolean = false;
  goals: any[] = [];
  filteredGoals: any[] = [];

  allGoalsCount: number = 0;
  thisWeekGoalsCount: number = 0;
  lastWeekGoalsCount: number = 0;
  thisMonthGoalsCount: number = 0;
  lastMonthGoalsCount: number = 0;

  constructor(private goalsService: GoalsService, private router: Router) {}

  ngOnInit(): void {
    this.fetchGoals();
  }

  fetchGoals(): void {
    this.goalsService.getGoals().subscribe(
      data => {
        this.goals = data;
        this.filteredGoals = this.goals; // Initialize filtered goals with all goals
        this.updateCounts(); // Update counts after fetching goals
      },
      error => {
        console.error('Error fetching goals', error);
      }
    );
  }

  showContainer(): void {
    this.isContainerVisible = true;
    this.isGoalTrackerVisible = false;
  }

  showGoalTracker(): void {
    this.isGoalTrackerVisible = true;
    this.isContainerVisible = true;
  }

  addGoal(): void {
    this.router.navigate(['addgoal']);
  }

  updateCounts(): void {
    const today = new Date();

    const startOfThisWeek = new Date();
    startOfThisWeek.setDate(today.getDate() - today.getDay());

    const endOfThisWeek = new Date();
    endOfThisWeek.setDate(startOfThisWeek.getDate() + 6);

    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfLastWeek.getDate() - 7);

    const endOfLastWeek = new Date(startOfThisWeek);
    endOfLastWeek.setDate(endOfLastWeek.getDate() - 1);

    const startOfThisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfThisMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const startOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const endOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0);

    this.allGoalsCount = this.goals.length;
    this.thisWeekGoalsCount = this.goals.filter(goal => new Date(goal.dueDate) >= startOfThisWeek && new Date(goal.dueDate) <= endOfThisWeek).length;
    this.lastWeekGoalsCount = this.goals.filter(goal => new Date(goal.dueDate) >= startOfLastWeek && new Date(goal.dueDate) <= endOfLastWeek).length;
    this.thisMonthGoalsCount = this.goals.filter(goal => new Date(goal.dueDate) >= startOfThisMonth && new Date(goal.dueDate) <= endOfThisMonth).length;
    this.lastMonthGoalsCount = this.goals.filter(goal => new Date(goal.dueDate) >= startOfLastMonth && new Date(goal.dueDate) <= endOfLastMonth).length;
  }

  filterGoals(filter: string): void {
    const today = new Date();
    let startDate = new Date();
    let endDate = new Date();

    switch (filter) {
      case 'this-week':
        startDate.setDate(today.getDate() - today.getDay()); // Start of the week
        endDate.setDate(startDate.getDate() + 6); // End of the week
        break;
      case 'last-week':
        startDate.setDate(today.getDate() - today.getDay() - 7); // Start of the last week
        endDate.setDate(startDate.getDate() + 6); // End of the last week
        break;
      case 'this-month':
        startDate = new Date(today.getFullYear(), today.getMonth(), 1); // Start of the month
        endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0); // End of the month
        break;
      case 'last-month':
        startDate = new Date(today.getFullYear(), today.getMonth() - 1, 1); // Start of the last month
        endDate = new Date(today.getFullYear(), today.getMonth(), 0); // End of the last month
        break;
      default:
        this.filteredGoals = this.goals;
        return;
    }

    this.filteredGoals = this.goals.filter(goal => {
      const goalDate = new Date(goal.dueDate); // Use the correct date field
      return goalDate >= startDate && goalDate <= endDate;
    });
  }

  deleteGoal(id: number): void {
    if (confirm('Are you sure you want to delete this goal?')) {
      this.goalsService.deleteGoal(id).subscribe(
        () => {
          console.log('Goal deleted successfully!');
          this.fetchGoals(); // Refresh the list after deletion
        },
        error => {
          console.error('Error deleting goal', error);
        }
      );
    }
  }
}
