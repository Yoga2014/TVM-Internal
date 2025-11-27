import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LeaveService } from 'src/app/AllServices/leave.service';
import { EmployeeAuthService } from 'src/app/AllServices/EmployeeAuthService';
import { LeaveRequest } from 'src/app/Interface/leave-request.model';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss']
})
export class ApplyLeaveComponent implements OnInit {

  leaveTypes: string[] = [
    'fever', 'sick leave', 'casual leave',
    'maternity leave', 'paternity leave',
    'bereavement leave', 'unpaid leave'
  ];

  leaveType: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  reason: string = '';
  teamEmail: string = '';

  startDateError: string = '';
  endDateError: string = '';

  employee: any = {};

  constructor(
    private router: Router,
    private leaveService: LeaveService,
    private employeeAuthService: EmployeeAuthService,
    public location: Location
  ) {}

  ngOnInit() {
    this.loadEmployeeDetails();
  }

  loadEmployeeDetails() {
    const emp = this.employeeAuthService.getAuthenticatedEmployee();
    if (emp) {
      this.employee = emp;
    } else {
      alert('Failed to fetch employee details');
    }
  }

  onStartDateChange(event: any) {
    this.startDate = new Date(event.value || event.target?.value);
    this.validateDates();
  }

  onEndDateChange(event: any) {
    this.endDate = new Date(event.value || event.target?.value);
    this.validateDates();
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
      } else if (this.startDate && end < new Date(this.startDate)) {
        this.endDateError = 'End date cannot be before start date.';
      } else {
        this.endDateError = '';
      }
    }
  }

  isValidLeaveRequest(): boolean {
    this.validateDates();

    return !!(
      this.leaveType &&
      this.reason &&
      this.teamEmail &&
      this.startDate &&
      this.endDate &&
      !this.startDateError &&
      !this.endDateError
    );
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
    const d = date.getDate().toString().padStart(2, '0');
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const y = date.getFullYear().toString();
    return `${y}-${m}-${d}`;
  }
onSubmit(form: any) {

  const leaveRequest: LeaveRequest = {
    employeeId: this.employee.employeeId,
    employeeName: this.employee.employeeName,
    email: this.teamEmail,
    designation: this.employee.designation,
    leaveType: this.leaveType,
    startDate: this.formatDate(this.startDate!),
    endDate: this.formatDate(this.endDate!),
    totalDays: this.calculateLeaveDays() + 1,
    reasonforLeave: this.reason,
    status: 'Pending',
    dateOfRequest: this.formatDate(new Date()),
    booked: this.calculateLeaveDays() + 1
  };

  this.leaveService.addLeaveRequest(leaveRequest).subscribe({
    next: () => {
      alert('Leave applied successfully!');

      form.resetForm();
      this.startDateError = '';
      this.endDateError = '';
      this.router.navigate(['/leave-summary']);
    },
    error: () => {
      alert("Failed to apply leave");
    }
  });
}


  cancel() {
    this.location.back();
  }
}