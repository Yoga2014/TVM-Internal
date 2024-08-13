import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoalService } from '../AllServices/goal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Goal } from '../Interface/Goals.model';

@Component({
  selector: 'app-add-goals',
  templateUrl: './add-goals.component.html',
  styleUrls: ['./add-goals.component.scss']
})
export class AddGoalsComponent implements OnInit {
  addGoalForm!: FormGroup;
  isEditMode = false;
  goalId!: number;

  constructor(
    private fb: FormBuilder,
    private goalService: GoalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.addGoalForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      priority: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      progress: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    });

    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.goalId = +id;
        this.goalService.getGoalById(this.goalId).subscribe({
          next: (goal) => this.patchGoalData(goal),
          error: (err) => console.error('Error fetching goal:', err)
        });
      }
    });
  }

  patchGoalData(goal: Goal): void {
    if (goal) {
      this.addGoalForm.patchValue({
        name: goal.name,
        description: goal.description,
        priority: goal.priority,
        startDate: goal.startDate,
        endDate: goal.endDate,
        progress: goal.progress
      });
    }
  }

  addGoal(): void {
    if (this.addGoalForm.valid) {
      const goalData: Goal = this.addGoalForm.value;
      if (this.isEditMode) {
        this.goalService.updateGoal(this.goalId, goalData).subscribe({
          next: () => this.router.navigate(['/goals']),
          error: (err) => console.error('Error updating goal:', err)
        });
      } else {
        this.goalService.addGoal(goalData).subscribe({
          next: () => this.router.navigate(['/goals']),
          error: (err) => console.error('Error adding goal:', err)
        });
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/goals']);
  }
}
