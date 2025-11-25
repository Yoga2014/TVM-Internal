import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss'],
  standalone:false,
})
export class GeneralComponent implements OnInit {
  photoPreview: string | ArrayBuffer | null = null;
  informationForm!: FormGroup;
  active: boolean = true;
  showpassportNumberField: boolean = false;

  constructor(
    private fbuilder: FormBuilder,
    private route: Router,
    private serv: ServerService
  ) { }

  ngOnInit(): void {
    this.informationForm = this.fbuilder.group({
      firstName: ['', Validators.required],
      dob: ['', Validators.required],
      position: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      employeePhoto: [null, Validators.required],
      bloodGroup: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      homeNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      emergencyNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
      email: ['', [Validators.required, Validators.email]],
      presentAddress: ['', Validators.required],
      city: ['', Validators.required],
      district: ['', Validators.required],
      country: ['', Validators.required],
      locality: ['', Validators.required],
      pincode: ['', Validators.required],
      state: ['', Validators.required],
      passport: ['', Validators.required],
      passportNumber: [''],
      landmark: ['', Validators.required],
      visa: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      familyMembers: this.fbuilder.array([]),
      languages: this.fbuilder.array([]) 
    });
  
  }
  saveClick(): void {
    if (this.informationForm.invalid) {
    alert('Please fill out the required fields.');
    this.informationForm.markAllAsTouched(); 
    return;
  }
  
    if (this.informationForm.invalid) {
      alert('Please fill out the required fields.');
      this.informationForm.markAllAsTouched(); 
      return;
    }
    const formData = this.informationForm.value;
  
    this.serv.basicPostMethod(formData).subscribe({
      next: (res: any) => {
        this.informationForm.reset();
        this.photoPreview = null;
      },
      error: (err: any) => {
        console.error('Error submitting form:', err);
      }
    });
  }
  onPhotoSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
  
    if (input && input.files && input.files[0]) {
      const file = input.files[0];
      const maxFileSize = 2 * 1024 * 1024; // 2MB
  
      if (file.type.startsWith('image/') && file.size <= maxFileSize) {
        const previewReader = new FileReader();
        previewReader.onload = () => {
          this.photoPreview = previewReader.result;
        };
        previewReader.readAsDataURL(file);
  
        
        const base64Reader = new FileReader();
        base64Reader.onload = () => {
          const base64DataWithPrefix = base64Reader.result as string;
          const base64Data = base64DataWithPrefix.split(',')[1]; 
          console.log(base64Data);
          this.informationForm.get('employeePhoto')?.setValue(base64Data);
        };
        base64Reader.readAsDataURL(file);
      } else if (file.size > maxFileSize) {
        alert('File size exceeds 2MB. Please select a smaller file.');
      } else {
        alert('Please select a valid image file.');
      }
    }
  }
  
  


  clearPhoto(): void {
    this.photoPreview = null;
    this.informationForm.get('employeePhoto')?.setValue(null);
    const input = document.getElementById('employeePhoto') as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  }
  onPassportChange(value: string): void {
    this.showpassportNumberField = value === 'yes';
    const passportNumberControl = this.informationForm.get('passportNumber');
  
    if (this.showpassportNumberField) {
      passportNumberControl?.setValidators([Validators.required, Validators.pattern(/^[A-Z0-9]+$/)]);
    } else {
      passportNumberControl?.clearValidators();
      passportNumberControl?.setValue(''); 
    }
    passportNumberControl?.updateValueAndValidity();
  }

  addLanguageRow(): void {
    const languageGroup = this.fbuilder.group({
      language: ['', Validators.required],
      speak: [false],
      read: [false],
      write: [false]
    }, {
      validators: this.languageValidator 
    });
    this.languages.push(languageGroup);
  }
  
  
  languageValidator(group: FormGroup) {
    const speak = group.get('speak')?.value;
    const read = group.get('read')?.value;
    const write = group.get('write')?.value;
    
    return speak || read || write ? null : { atLeastOne: true };
  }

  removeLanguageRow(index: number): void {
    this.languages.removeAt(index);
  }



  addFamilyMember(): void {
    const familyMemberGroup = this.fbuilder.group({
      name: ['', Validators.required],
      relationship: ['', Validators.required],
      age: ['', Validators.required],
      occupation: ['', Validators.required]
    });
    this.familyMembers.push(familyMemberGroup);
  }

  removeFamilyMember(index: number): void {
    this.familyMembers.removeAt(index);
  }
  
  
  get firstName() {
    return this.informationForm.get('firstName');
  }
  get dob() {
    return this.informationForm.get('dob');
  }
  get position() {
    return this.informationForm.get('position');
  }
  get lastName() {
    return this.informationForm.get('lastName');
  }
  get employeePhoto() {
    return this.informationForm.get('employeePhoto');
  }
  get mobileNumber() {
    return this.informationForm.get('mobileNumber');
  }
  get homeNumber() {
    return this.informationForm.get('homeNumber');
  }
  get emergencyNumber() {
    return this.informationForm.get('emergencyNumber');
  }
  get email() {
    return this.informationForm.get('email');
  }
  get presentAddress() {
    return this.informationForm.get('presentAddress');
  }
  get city() {
    return this.informationForm.get('city');
  }
  get district() {
    return this.informationForm.get('district');
  }
  get country() {
    return this.informationForm.get('country');
  }
  get locality() {
    return this.informationForm.get('locality');
  }
  get pincode() {
    return this.informationForm.get('pincode');
  }
  get state() {
    return this.informationForm.get('state');
  }
  get passport() {
    return this.informationForm.get('passport');
  }
  get landmark() {
    return this.informationForm.get('landmark');
  }
  get visa() {
    return this.informationForm.get('visa');
  }
  get maritalStatus() {
    return this.informationForm.get('maritalStatus');
  }
  get name() {
    return this.informationForm.get('name');
  }
  get relationship() {
    return this.informationForm.get('relationship');
  }
  get age() {
    return this.informationForm.get('age');
  }
  get occupation() {
    return this.informationForm.get('occupation');
  }
  get languages(): FormArray {
    return this.informationForm.get('languages') as FormArray;
  }
  get familyMembers(): FormArray {
    return this.informationForm.get('familyMembers') as FormArray;
  }
  get speak() {
    return this.informationForm.get('speak');
  }
  get bloodGroup(){
    return this.informationForm.get('bloodGroup')
  }
  get passportNumber() {
    return this.informationForm.get('passportNumber');
  }
}
