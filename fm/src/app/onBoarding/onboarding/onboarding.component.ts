import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatDatepicker, MatDatepickerControl, MatDatepickerPanel } from '@angular/material/datepicker';
import { OnboardingService } from './onboarding.service';


interface Documents {
  resume: File | null;
  idDocuments: File | null;
  certifications: File | null;
  nda: File | null;
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
  @ViewChildren(MatDatepicker) datePickers!: QueryList<MatDatepicker<any>>;
  onboardingForm: FormGroup;

  constructor(private fb: FormBuilder, private onboardingService: OnboardingService) {
    this.onboardingForm = this.fb.group({
      jobTitle: ['', Validators.required],
      department: ['', Validators.required],
      manager: ['', Validators.required],
      startDate: ['', Validators.required],
      onboardingTasks: this.fb.array([]),
      documents: this.fb.group({
        resume: [null, Validators.required],
        idDocuments: [null, Validators.required],
        certifications: [null, Validators.required],
        nda: [null, Validators.required]
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

  removeOnboardingTask(index: number): void {
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

  removeEmergencyContact(index: number): void {
    this.emergencyContacts.removeAt(index);
  }

  onSubmit(): void {
    if (this.onboardingForm.valid) {
      // Here we call the service to submit the data
      this.onboardingService.submitOnboardingData(this.onboardingForm.value).subscribe({
        next: response => {
          console.log('Form submitted successfully', response);
          // Optionally, reset the form or show a success message
          this.onboardingForm.reset(); // Reset the form if needed
          this.addOnboardingTask(); // Reinitialize with one onboarding task
          this.addEmergencyContact(); // Reinitialize with one emergency contact
        },
        error: error => {
          console.error('Error submitting form', error);
          // Handle the error accordingly, maybe show a message to the user
        }
      });
    } else {
      this.onboardingForm.markAllAsTouched(); // Highlight all invalid fields
    }
  }
  

  updateOnboardingData(id: string): void {
    if (this.onboardingForm.valid) {
      this.onboardingService.updateOnboardingData(id, this.onboardingForm.value).subscribe({
        next: response => console.log('Form updated successfully', response),
        error: error => console.error('Error updating form', error)
      });
    }
  }

  onFileSelected(event: Event, controlName: keyof Documents): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      this.onboardingForm.get(['documents', controlName])?.setValue(file);
    }
  }}
