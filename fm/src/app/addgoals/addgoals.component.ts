// addgoals.component.ts
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoalsComponent } from '../goals/goals.component';
import { GoalsService } from '../goals/goals.service';


@Component({
  selector: 'app-addgoals',
  templateUrl: './addgoals.component.html',
  styleUrls: ['./addgoals.component.scss'],
})
export class AddgoalsComponent implements OnInit {
  goalForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private goalService: GoalsService
  ) {}

  ngOnInit(): void {
    this.goalForm = this.fb.group({
      startDate: [null, Validators.required],
      goalName: ['', Validators.required],
      dueDate: [null, Validators.required],
      priority: ['', Validators.required],
      description: [''],
      progress: [0, [Validators.min(0), Validators.max(100)]],
    });
  }

  onSubmit(): void {
    if (this.goalForm.valid) {
      this.goalService.addGoal(this.goalForm.value).subscribe(
        response => {
          console.log('Goal added successfully!', response);
          this.router.navigate(['/goals']); // Navigate back to goals after submission
        },
        error => {
          console.error('Error adding goal', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
}
