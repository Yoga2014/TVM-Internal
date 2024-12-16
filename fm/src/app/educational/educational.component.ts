import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-educational',
  templateUrl: './educational.component.html',
  styleUrls: ['./educational.component.scss']
})
export class EducationalComponent {
  educationGroup!: FormGroup;

  constructor(private fb: FormBuilder, private route: Router, private server: ServerService) {}

  ngOnInit() {
    this.educationGroup = this.fb.group({
      educationArray: this.fb.array([this.createEducationFormGroup()]), // Initialize with one row
    });
  }

  get educationArray(): FormArray {
    return this.educationGroup.get('educationArray') as FormArray;
  }

  createEducationFormGroup(): FormGroup {
    return this.fb.group({
      coursePursued: ['', Validators.required],
      institutionName: ['', Validators.required],
      durationFrom: ['', Validators.required],
      durationTo: ['', Validators.required],
      cgpaObtained: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
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
}
