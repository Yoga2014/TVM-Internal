import { Component, OnInit, OnDestroy } from '@angular/core';
import { GoalService } from '../AllServices/goal.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Goal } from '../Interface/Goals.model';
import { Subscription } from 'rxjs';
import { DeleteGoalsComponent } from '../delete-goals/delete-goals.component';
import { CommentsComponent } from '../comments/comments.component';
import { AddGoalsComponent } from '../add-goals/add-goals.component';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit, OnDestroy {
  goals: Goal[] = [];
  filteredGoals: Goal[] = [];
  private goalsSub!: Subscription;

  allGoalsCount: number = 0;
  thisWeekCount: number = 0;
  thisMonthCount: number = 0;
  thisYearCount: number = 0;
  step1Completed: boolean = false;
  step2Completed: boolean = false;
  step3Completed: boolean = false;
  step4Completed: boolean = false;

  constructor(
    private goalService: GoalService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadGoals();

    this.goalsSub = this.goalService.getGoalsUpdatedListener().subscribe(() => {
      this.loadGoals();
    });

    this.updateStepperState();
  }

  ngOnDestroy(): void {
    this.goalsSub.unsubscribe();
  }

  private isValidDate(date: any): boolean {
    return date instanceof Date && !isNaN(date.valueOf());
  }

  private normalizeDate(date: Date): Date {
    const normalized = new Date(date);
    normalized.setUTCHours(0, 0, 0, 0);
    return normalized;
  }

  private loadGoals(): void {
    this.goalService.getGoals().subscribe(data => {
      this.goals = data;
      this.updateCounts();
      this.filterGoals('all');
      this.updateStepperState();
    });
  }

  private updateCounts(): void {
    const now = new Date();
    const startOfWeek = this.normalizeDate(new Date(now));
    startOfWeek.setUTCDate(now.getUTCDate() - now.getUTCDay());

    const startOfMonth = this.normalizeDate(new Date(now.getUTCFullYear(), now.getUTCMonth(), 1));
    const startOfYear = this.normalizeDate(new Date(now.getUTCFullYear(), 0, 1));

    console.log('Current Date:', now);
    console.log('Start of Week (UTC):', startOfWeek);
    console.log('Start of Month (UTC):', startOfMonth);
    console.log('Start of Year (UTC):', startOfYear);

    this.allGoalsCount = this.goals.length;

    this.thisWeekCount = this.goals.filter(goal => {
      const goalDate = new Date(goal.startDate);
      if (!this.isValidDate(goalDate)) {
        console.warn('Invalid startDate for goal:', goal);
        return false;
      }
      return goalDate >= startOfWeek && goalDate <= now;
    }).length;

    this.thisMonthCount = this.goals.filter(goal => {
      const goalDate = new Date(goal.startDate);
      if (!this.isValidDate(goalDate)) {
        console.warn('Invalid startDate for goal:', goal);
        return false;
      }
      return goalDate >= startOfMonth && goalDate <= now;
    }).length;

    this.thisYearCount = this.goals.filter(goal => {
      const goalDate = new Date(goal.startDate);
      if (!this.isValidDate(goalDate)) {
        console.warn('Invalid startDate for goal:', goal);
        return false;
      }
      return goalDate >= startOfYear && goalDate <= now;
    }).length;

    console.log('Counts - All:', this.allGoalsCount, 'This Week:', this.thisWeekCount, 'This Month:', this.thisMonthCount, 'This Year:', this.thisYearCount);
  }

  private updateStepperState(): void {
    this.step1Completed = this.goals.some(goal => goal.status === 'GoalsAdded');
    this.step2Completed = this.goals.some(goal => goal.status === 'PendingManagerApproval');
    this.step3Completed = this.goals.some(goal => goal.status === 'PendingUserApproval');
    this.step4Completed = this.goals.every(goal => goal.status === 'GoalFinished');
  }

  filterGoals(period: string): void {
    console.log('Filtering goals for period:', period);
    console.log('All goals before filtering:', this.goals);
  
    const now = new Date();
    const startOfWeek = this.normalizeDate(new Date(now));
    startOfWeek.setUTCDate(now.getUTCDate() - now.getUTCDay());
  
    const startOfMonth = this.normalizeDate(new Date(now.getUTCFullYear(), now.getUTCMonth(), 1));
    const startOfYear = this.normalizeDate(new Date(now.getUTCFullYear(), 0, 1));
  
    switch (period) {
      case 'all':
        this.filteredGoals = this.goals;
        break;
      case 'thisWeek':
        this.filteredGoals = this.goals.filter(goal => {
          const goalDate = new Date(goal.startDate);
          const goalDay = this.normalizeDate(goalDate).getTime();
          return goalDay >= startOfWeek.getTime() && goalDay <= now.getTime();
        });
        break;
      case 'thisMonth':
        this.filteredGoals = this.goals.filter(goal => {
          const goalDate = new Date(goal.startDate);
          const goalDay = this.normalizeDate(goalDate).getTime();
          return goalDay >= startOfMonth.getTime() && goalDay <= now.getTime();
        });
        break;
      case 'thisYear':
        this.filteredGoals = this.goals.filter(goal => {
          const goalDate = new Date(goal.startDate);
          const goalDay = this.normalizeDate(goalDate).getTime();
          return goalDay >= startOfYear.getTime() && goalDay <= now.getTime();
        });
        break;
    }
  
    console.log('Filtered Goals:', this.filteredGoals);
  }
  

  navigateToGoalSpace(goalId: string): void {
    this.router.navigate(['/goal-space', goalId]);
  }

  openCommentsDialog(goalId: string): void {
    const dialogRef = this.dialog.open(CommentsComponent, {
      width: '600px',
      data: { goalId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadGoals();
      }
    });
  }

  addGoal(): void {
    const dialogRef = this.dialog.open(AddGoalsComponent, {
      width: '600px',
      data: { goalId: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadGoals();
      }
    });
  }

  editGoal(goal: Goal): void {
    const dialogRef = this.dialog.open(AddGoalsComponent, {
      width: '600px',
      data: { goalId: goal.goalId }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadGoals();
      }
    });
  }

  deleteGoal(goal: Goal): void {
    this.openDeleteDialog(goal);
  }

  openDeleteDialog(goal: Goal): void {
    const dialogRef = this.dialog.open(DeleteGoalsComponent, {
      width: '400px',
      data: { id: goal.goalId, name: goal.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.goalService.deleteGoal(goal.goalId).subscribe({
          next: () => {
            console.log('Goal deleted successfully');
            this.loadGoals();
          },
          error: (err) => {
            console.error('Error deleting goal:', err);
          }
        });
      }
    });
  }
}
