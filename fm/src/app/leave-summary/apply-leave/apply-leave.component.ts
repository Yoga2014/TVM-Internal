import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmployeeAuthService } from 'src/app/AllServices/authService.service';

import { LeaveService } from 'src/app/AllServices/leave.service';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss']
})
export class ApplyLeaveComponent implements OnInit {
  cancel() {
    this.dialogRef.close();
  }
  leaveTypes = ['Casual Leave', 'Earned Leave', 'Leave Without Pay', 'Paternity Leave', 'Sabbatical Leave', 'Sick Leave'];
  leaveForm!: FormGroup;
  startDateError: string | null = null;
  endDateError: string | null = null;
  dateForm: FormGroup | null = null;
  today = new Date();
  minEndDate: Date | null = null;
  private fb: FormBuilder;
  constructor(
    fb: FormBuilder,
    private leaveService: LeaveService,
    private authService: EmployeeAuthService,
    public dialogRef: MatDialogRef<ApplyLeaveComponent>
  ) { this.fb = fb; }

  ngOnInit(): void {
    this.leaveForm = new FormGroup({
      leaveType: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endDate: new FormControl('', Validators.required),
      teamEmail: new FormControl('', [Validators.required, Validators.email]),
      reason: new FormControl('', Validators.required)
    });
    this.dateForm = this.fb.group({
      startDate: [null, Validators.required],
      endDate: [{ value: null, disabled: true }, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.leaveForm.valid) {
      const leaveData = this.leaveForm.value;
      console.log(leaveData, "leave data");
      this.leaveService.applyLeave(leaveData).subscribe((res) => {
        console.log('Leave applied successfully', res);
        const employee = this.authService.getAuthenticatedEmployee();
        const startDate = new Date(leaveData.startDate);
        const endDate = new Date(leaveData.endDate);  
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];
        const diffInMs = endDate.getTime() - startDate.getTime();
        const days = Math.ceil(diffInMs / (1000 * 60 * 60 * 24)) + 1;
        let leaveType;
        switch (leaveData.leaveType) {
          case 'Casual Leave':
          case 'Earned Leave':
            leaveType = 'Paid';
            break;
          case 'Leave Without Pay':
            leaveType = 'Unpaid';
            break;
          default:
            leaveType = 'Paid';
        }
        this.dialogRef.close({
          leaveType: leaveData.leaveType,
          days: days
        });
        this.dialogRef.close({
          employeeName: employee.employeeName,
          leaveType: leaveData.leaveType,
          type: leaveType,
          leavePeriod: `${formattedStartDate} - ${formattedEndDate}`,
          days: days,
          dateOfRequest: new Date().toDateString()
        });
      });
    }
  }
  onStartDateChange(event: any) {
    const selectedStartDate = event.value;
    if (selectedStartDate) {
      this.minEndDate = selectedStartDate;
      this.dateForm?.get('endDate')?.enable();
      this.dateForm?.get('endDate')?.setValue(null);
    } else {
      this.minEndDate = null;
      this.dateForm?.get('endDate')?.disable();
      this.dateForm?.get('endDate')?.setValue(null);
    }
  }


}