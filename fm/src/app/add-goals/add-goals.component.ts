import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GoalService } from '../AllServices/goal.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
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
    public dialogRef: MatDialogRef<AddGoalsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { goalId?: number }
  ) {}

  ngOnInit(): void {
    this.addGoalForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      priority: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      progress: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
    });
    if (this.data.goalId) {
      this.goalId = this.data.goalId;
      this.isEditMode = true;
      this.loadGoalData(this.goalId);
    }
  }

  loadGoalData(id: number): void {
    this.goalService.getGoalById(id).subscribe(
      (goal: Goal) => {
        this.patchGoalData(goal);
      },
      (error: any) => {
        console.error('Error fetching goal data:', error);
      }
    );
  }

  patchGoalData(goal: Goal): void {
    this.addGoalForm.patchValue({
      name: goal.name,
      description: goal.description,
      priority: goal.priority,
      startDate: goal.startDate,
      endDate: goal.endDate,
      progress: goal.progress
    });
  }

  addGoal(): void {
    if (this.addGoalForm.valid) {
      const goalData: Goal = this.addGoalForm.value;
      if (this.isEditMode) {
        this.goalService.updateGoal(this.goalId, goalData).subscribe(
          (response) => {
            console.log('Goal updated successfully', response);
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error updating goal', error);
          }
        );
      } else {
        this.goalService.addGoal(goalData).subscribe(
          (response) => {
            console.log('Goal added successfully', response);
            this.dialogRef.close(true);
          },
          (error) => {
            console.error('Error adding goal', error);
          }
        );
      }
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
