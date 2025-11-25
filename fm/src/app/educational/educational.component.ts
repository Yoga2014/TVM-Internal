import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-educational',
  templateUrl: './educational.component.html',
  standalone: false,
  styleUrls: ['./educational.component.scss']
})
export class EducationalComponent {
  educationGroup!: FormGroup;

  constructor(private fb: FormBuilder, private route: Router, private server: ServerService) {}
 // isSaveEnabled: boolean = false;
  ngOnInit() {
    this.educationGroup = this.fb.group({
      educationArray: this.fb.array([this.createEducationFormGroup()]), 
    });
  }

  get educationArray(): FormArray {
    return this.educationGroup.get('educationArray') as FormArray;
  }

  createEducationFormGroup(): FormGroup {
    return this.fb.group({
      coursePursued: ['', Validators.required],
      specialization: ['', Validators.required],
      institutionName: ['', Validators.required],
      durationFrom: ['', Validators.required],
      durationTo: ['', Validators.required],
      cgpaObtained: ['', [Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      percentage: ['', Validators.required],
      studyMode:['',Validators.required]
    });
  }

  addRow(): void {
    this.educationArray.push(this.createEducationFormGroup());
  }

  saveClick(): void {
    if (this.educationGroup.valid) {
      this.server.EducationalMethod(this.educationGroup.value.educationArray).subscribe((res: any) => {
        console.log('Form saved successfully', res);
      });
    } else {
      console.log('Form is invalid');
    }
  }

  removeRow(index: number): void {
    this.educationArray.removeAt(index);
  }

  isSaveEnabled(): boolean {
    const requiredCourses = ['SSLC', 'HSC', 'UG'];
    const completedCourses = this.educationArray.controls
      .map(group => group.get('coursePursued')?.value)
      .filter(value => requiredCourses.includes(value));

    return requiredCourses.every(course => completedCourses.includes(course)) && this.educationGroup.valid;
  }
}
