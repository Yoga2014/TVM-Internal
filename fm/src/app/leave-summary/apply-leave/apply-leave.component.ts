import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LeaveService } from 'src/app/AllServices/leave.service';
import { LeaveRequest } from 'src/app/Interface/leave-request.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss']
})
export class ApplyLeaveComponent implements OnInit {
  leaveTypes: string[] = [
    'Casual Leave',
    'Earned Leave',
    'Leave Without Pay',
    'Paternity Leave',
    'Sabbatical Leave',
    'Sick Leave'
  ];
  leaveType: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  reason: string = '';
  startDateError: string = '';
  endDateError: string = '';
  teamEmail: string = '';

  employee: any = {};
  leaveForm!: FormGroup;
  dateForm: FormGroup | null = null;
  today = new Date();
  minEndDate: Date | null = null;
  constructor(
    private router: Router,
    private leaveService: LeaveService,
    public location: Location
  ) {}

  ngOnInit() {
    this.loadEmployeeDetails();
  }

  loadEmployeeDetails() {
    this.leaveService.getEmployeeDetails().subscribe({
      next: (data) => {
        this.employee = data;
      },
      error: (err) => {
        alert('Failed to fetch employee details');
        console.error('Error fetching employee details', err);
      }
    });
  }

  validateDates() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.startDate) {
      const start = new Date(this.startDate);
      this.startDateError = start < today ? 'Start date cannot be in the past.' : '';
    }

    if (this.endDate) {
      const end = new Date(this.endDate);
      if (end < today) {
        this.endDateError = 'End date cannot be in the past.';
      } else {
        this.endDateError = this.startDate && end < new Date(this.startDate) ? 'End date cannot be before start date.' : '';
      }
    }
  }

  onSubmit() {
    if (this.isValidLeaveRequest()) {
      const leaveDays = this.calculateLeaveDays();
      if (leaveDays < 0) {
        this.endDateError = 'End date cannot be before start date.';
        return;
      }

      const leaveRequest: LeaveRequest = {
        employeeId: this.employee.id,
        employeeName: this.employee.name,
        teamEmail: this.employee.email,
        designation: this.employee.designation,
        leaveType: this.leaveType,
        teamId: this.employee.teamId,
        startDate: this.startDate ? this.formatDate(this.startDate) : '',
        endDate: this.endDate ? this.formatDate(this.endDate) : '',
        totalDays: leaveDays + 1,
        reasonforLeave: this.reason,
        status: 'Pending',
        dateOfRequest: this.formatDate(new Date()),
        available: this.employee.availableLeave,
        booked: leaveDays + 1,
        comment: '',
        reasonforRejected: '',
        color: ''
      };

      this.leaveService.addLeaveRequest(leaveRequest).subscribe({
        next: () => {
          alert(`Leave applied successfully! ${leaveDays + 1} days of ${this.leaveType}`);
          this.location.back();
        },
        error: (err) => {
          alert('Failed to apply leave');
          console.error('Error applying leave', err);
        }
      });
    } else {
      alert('Please fill all required fields and ensure dates are valid');
    }
  }

  isValidLeaveRequest(): boolean {
    this.validateDates();
    return Boolean(this.leaveType && this.startDate && this.endDate && !this.startDateError && !this.endDateError);
  }

  calculateLeaveDays(): number {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      return Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
    }
    return 0;
  }

  formatDate(date: Date): string {
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${year}-${month}-${day}`;
  }

  cancel(): void {
    this.location.back();
  }
}
