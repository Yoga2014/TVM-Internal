import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppraisalService } from '../AllServices/AppraisalService.service';
import { EmployeeAuthService } from '../AllServices/authService.service';

@Component({
  selector: 'app-appraisal',
  templateUrl: './appraisal.component.html',
  styleUrls: ['./appraisal.component.scss']
})
export class AppraisalComponent implements OnInit {
  appraisalForm!: FormGroup;
  appraisals: any[] = [];

  constructor(private fb: FormBuilder, private appraisalService: AppraisalService, private authenticate: EmployeeAuthService) {}

  ngOnInit() {
    this.appraisalForm = this.fb.group({
      employeeName: [{ value: '', disabled: true }],
      employeeId: [{ value: '', disabled: true }],
      jobTitle: ['', Validators.required],
      department: ['', Validators.required],
      managerName: ['', Validators.required],
      appraisalPeriod: ['', Validators.required],
      performanceGoals: this.fb.array([this.createPerformanceGoal()]),
      selfAssessment: this.fb.group({
        strengths: [''],
        accomplishments: [''],
        challenges: [''],
        areasForImprovement: [''],
        overallPerformance: [''],
      }),
      managerAssessment: this.fb.group({
        jobKnowledge: ['', Validators.required],
        qualityOfWork: ['', Validators.required],
        productivity: ['', Validators.required],
        communicationSkills: ['', Validators.required],
        problemSolvingSkills: ['', Validators.required],
        teamwork: ['', Validators.required],
        initiative: ['', Validators.required],
        overallRating: ['', Validators.required],
      }),
      strengths: this.fb.group({
        keyStrengths: [''],
        examples: [''],
      }),
      areasForImprovement: this.fb.group({
        keyAreasForImprovement: [''],
        trainingDevelopmentNeeds: [''],
      }),
      feedback: this.fb.group({
        managerFeedback: [''],
        peerTeamFeedback: [''],
        employeeFeedbackOnProcess: [''],
      }),
      actionPlanAndGoals: this.fb.array([this.createActionPlan()]),
      finalPerformanceRating: ['', Validators.required],
      managerSignature: [''],
      date: ['', Validators.required],
    });

    const loggedInUser = this.authenticate.getAuthenticatedEmployee();
    this.appraisalForm.patchValue({
      employeeId: loggedInUser.employeeId,
      employeeName: loggedInUser.employeeName
    });
  }

  createPerformanceGoal(): FormGroup {
    return this.fb.group({
      goal: ['', Validators.required],
      goalType: ['', Validators.required],
      completionStatus: ['', Validators.required],
      comments: [''],
    });
  }

  createActionPlan(): FormGroup {
    return this.fb.group({
      action: ['Action Placeholder', Validators.required],
      deadline: ['2024-12-31', Validators.required],
      responsible: ['John Doe', Validators.required],
    });
  }

  get performanceGoals(): FormArray {
    return this.appraisalForm.get('performanceGoals') as FormArray;
  }

  addPerformanceGoal(): void {
    this.performanceGoals.push(this.createPerformanceGoal());
  }

  get actionPlanAndGoals(): FormArray {
    return this.appraisalForm.get('actionPlanAndGoals') as FormArray;
  }

  addActionPlan(): void {
    this.actionPlanAndGoals.push(this.createActionPlan());
  }

  onSubmit(): void {
    console.log('Form Valid:', this.appraisalForm.valid);
    console.log('Form Value:', this.appraisalForm.value);

    Object.keys(this.appraisalForm.controls).forEach(controlName => {
      const control = this.appraisalForm.get(controlName);
      if (control instanceof FormArray || control instanceof FormGroup) {
        console.log(`${controlName} is valid:`, control.valid);
        control instanceof FormArray && control.controls.forEach((group, index) => {
          console.log(`Index ${index} in ${controlName} is valid:`, group.valid);
          if (group instanceof FormGroup) {
            Object.keys(group.controls).forEach(innerControlName => {
              const innerControl = group.get(innerControlName);
              if (innerControl?.invalid) {
                console.log(`${innerControlName} in ${controlName} at index ${index} is invalid`, innerControl.errors);
              }
            });
          }
        });
      }
    });

    if (this.appraisalForm.valid) {
      const formData = this.appraisalForm.getRawValue();
      this.appraisals.push(formData);
      alert('Form submitte Succecfully!');
      console.log('Form Submitted and saved to appraisals!', this.appraisals); 

      this.appraisalService.addAppraisal(formData).subscribe(response => {
        console.log('Appraisal saved to server:', response);
      });

    } else {
      this.appraisalForm.markAllAsTouched();
    }
  }
}
