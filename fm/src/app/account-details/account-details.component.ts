import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServerService } from '../server.service';
import { FormsModule,FormArray,FormBuilder, Validator, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-account-details',
  standalone: false,
  templateUrl: './account-details.component.html',
  styleUrl: './account-details.component.scss'
})
export class AccountDetailsComponent {

  bankDetailsGroup!: FormGroup;
  constructor(private fb: FormBuilder, private route: Router, private server: ServerService) {}

  ngOnInit() {
    this.bankDetailsGroup = this.fb.group({
      bankDetailsArray: this.fb.array([this.CreateAccountFromGroup()]), 
    });
  }

  get bankDetailsArray(): FormArray {
    return this.bankDetailsGroup.get('bankDetailsArray') as FormArray;
  }



  CreateAccountFromGroup(): FormGroup {
      return this.fb.group({
        aadharNumber:['',Validators.required],
        panNumber:['',Validators.required],
        name:['',Validators.required],
        bankAccountNumber:['',Validators.required],
        bankIFSCCode:['',Validators.required],
        bankName:['',Validators.required],
        branchName:['',Validators.required]
      });
    }
    saveClick(): void {
      if (this.bankDetailsGroup.valid) {
        const bankDetailsList = this.bankDetailsArray.value; // Extract array values
        bankDetailsList.forEach((bankDetails: any) => {
          this.server.AccountPostMethod(bankDetails).subscribe((res: any) => {
            console.log('Individual bank detail saved successfully', res);
          });
        });
      } else {
        console.log('Form is invalid');
      }
    }
}
