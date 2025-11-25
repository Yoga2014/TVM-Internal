import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppraisalService } from '../AllServices/appraisalFormService';
import { EmployeeAuthService } from '../AllServices/EmployeeAuthService';

@Component({
  selector: 'app-appraisal-form',
  standalone: false,
  templateUrl: './appraisal-form.component.html',
  styleUrl: './appraisal-form.component.scss'
})
export class AppraisalFormComponent {

  
  appraisalForm!: FormGroup;

  constructor(private fb: FormBuilder, private appraisalService: AppraisalService, private authenticate:EmployeeAuthService) {}

  ngOnInit() {
    this.appraisalForm = this.fb.group({
      employeeName: ['', Validators.required],
      employeeId: ['', Validators.required],
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
      // actionPlanAndGoals: this.fb.array([this.createActionPlan()]),
      finalPerformanceRating: ['', Validators.required],
      managerSignature: [''],
      date: ['', Validators.required],
    });

    const loggedInUser = this.authenticate.getAuthenticatedEmployee();
    this.appraisalForm.patchValue({
      employeeId: loggedInUser.employeeId,
      employeeName: loggedInUser.employeeName
    });

    this.appraisalForm.controls['employeeName'].disable();
    this.appraisalForm.controls['employeeId'].disable();
  }

  createPerformanceGoal(): FormGroup {
    return this.fb.group({
      goal: ['', Validators.required],
      goalType: ['', Validators.required],
      completionStatus: ['', Validators.required],
      comments: [''],
    });
  }

  // createActionPlan(): FormGroup {
  //   return this.fb.group({
  //     action: ['', Validators.required],
  //     deadline: ['', Validators.required],
  //     responsible: ['', Validators.required],
  //   });
  // }

  get performanceGoals(): FormArray {
    return this.appraisalForm.get('performanceGoals') as FormArray;
  }

  addPerformanceGoal(): void {
    this.performanceGoals.push(this.createPerformanceGoal());
  }

  get actionPlanAndGoals(): FormArray {
    return this.appraisalForm.get('actionPlanAndGoals') as FormArray;
  }

  // addActionPlan(): void {
  //   this.actionPlanAndGoals.push(this.createActionPlan());
  // }

  onSubmit(): void {
    console.log('Form Valid:', this.appraisalForm.valid);
    console.log('Form Value:', this.appraisalForm.value);

    if (this.appraisalForm.valid) {
      console.log('Form Submitted!', this.appraisalForm.value); 
      const appraisalData = this.appraisalForm.getRawValue(); 

      this.appraisalService.addAppraisal(appraisalData).subscribe({
        next: (response) => {
          console.log('Appraisal data saved successfully:', response);
          alert('Appraisal data submitted successfully!');
          this.appraisalForm.reset();
        },
        error: (error) => {
          console.error('Error saving appraisal data:', error);
          alert('Failed to submit appraisal data. Please try again.');
        },
      });
    } else {
      this.appraisalForm.markAllAsTouched();
    }
  }

}



// ,
//       "strengths": {
//         "keyStrengths": "",
//         "examples": ""
//       },
//       "areasForImprovement": {
//         "keyAreasForImprovement": "",
//         "trainingDevelopmentNeeds": ""
//       },
//       "feedback": {
//         "managerFeedback": "",
//         "peerTeamFeedback": "",
//         "employeeFeedbackOnProcess": ""
//       }