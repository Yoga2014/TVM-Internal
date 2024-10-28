import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerControl, MatDatepickerPanel } from '@angular/material/datepicker';

interface Documents {
  resume: string;
  idDocuments: string;
  certifications: string;
  nda: string;
}

interface Training {
  orientationSchedule: Date;
  trainingModules: string[];
  resourcesProvided: string;
}

interface SystemAccess {
  accountSetup: { email: string; software: string; };
  access: string[];
}

interface OnboardingTask {
  taskId: string;
  taskDescription: string;
  dueDate: Date;
  status: string;
}

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss'
})
export class OnboardingComponent implements OnInit {
  @ViewChildren(MatDatepicker)
  datePickers!: QueryList<MatDatepicker<any>> | string;
  onboardingForm: FormGroup;
  dueDatePicker!: MatDatepickerPanel<MatDatepickerControl<any>, any, any>;

  constructor(private fb: FormBuilder) {
    this.onboardingForm = this.fb.group({
      jobTitle: ['', Validators.required],
      department: ['', Validators.required],
      manager: ['', Validators.required],
      startDate: ['', Validators.required],
      onboardingTasks: this.fb.array([]),
      documents: this.fb.group({
        resume: ['', Validators.required],
        idDocuments: ['', Validators.required],
        certifications: ['', Validators.required],
        nda: ['', Validators.required],
      }),
      training: this.fb.group({
        orientationSchedule: ['', Validators.required],
        trainingModules: ['', Validators.required],
        resourcesProvided: ['', Validators.required],
      }),
      systemAccess: this.fb.group({
        accountSetup: this.fb.group({
          email: ['', [Validators.required, Validators.email]],
          software: ['', Validators.required],
        }),
        access: ['', Validators.required],
      }),
      emergencyContact: this.fb.array([]),
      acknowledgment: this.fb.group({
        terms: [false, Validators.requiredTrue],
        codeOfConduct: [false, Validators.requiredTrue],
        policyAgreement: [false, Validators.requiredTrue],
      }),
    });
  }

  ngOnInit() {
    this.addOnboardingTask(); // Initialize with one onboarding task
    this.addEmergencyContact(); // Initialize with one emergency contact
  }

  get onboardingTasks(): FormArray {
    return this.onboardingForm.get('onboardingTasks') as FormArray;
  }

  get emergencyContacts(): FormArray {
    return this.onboardingForm.get('emergencyContact') as FormArray;
  }

  addOnboardingTask(): void {
    const taskGroup = this.fb.group({
      taskId: ['', Validators.required],
      taskDescription: ['', Validators.required],
      dueDate: ['', Validators.required],
      status: ['', Validators.required]
    });
    this.onboardingTasks.push(taskGroup);
  }

  removeOnboardingTask(index: number) {
    this.onboardingTasks.removeAt(index);
  }
  addEmergencyContact(): void {
    const contactGroup = this.fb.group({
      name: ['', Validators.required],
      relationship: ['', Validators.required],
      phoneNumber: ['', Validators.required]
    });
    this.emergencyContacts.push(contactGroup);
  }


  removeEmergencyContact(index: number) {
    this.emergencyContacts.removeAt(index);
  }

  onSubmit() {
    if (this.onboardingForm.valid) {
      console.log('Form Submitted!', this.onboardingForm.value);
      // Handle form submission, e.g., send to backend
    } else {
      console.log('Form not valid!');
      this.onboardingForm.markAllAsTouched(); // Mark all fields as touched for validation feedback
    }
  }
}
