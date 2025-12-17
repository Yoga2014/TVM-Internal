import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { LeaveService } from 'src/app/AllServices/leave.service';
import { EmployeeAuthService } from 'src/app/AllServices/EmployeeAuthService';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss']
})
export class ApplyLeaveComponent implements OnInit {

  leaveTypes: string[] = [
    'fever',
    'sick leave',
    'casual leave',
    'maternity leave',
    'paternity leave',
    'bereavement leave',
    'unpaid leave'
  ];

  leaveType = '';
  startDate!: Date;
  endDate!: Date;
  reason = '';
  teamEmail = '';

  startDateError = '';
  endDateError = '';

  employee: any;

  constructor(
    private leaveService: LeaveService,
    private employeeAuthService: EmployeeAuthService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.employee = this.employeeAuthService.getAuthenticatedEmployee();
  }

  onStartDateChange(event: any) {
    this.startDate = new Date(event.value);
    this.validateDates();
  }

  onEndDateChange(event: any) {
    this.endDate = new Date(event.value);
    this.validateDates();
  }

  validateDates() {
    if (this.startDate && this.endDate && this.endDate < this.startDate) {
      this.endDateError = 'End date cannot be before start date';
    } else {
      this.endDateError = '';
    }
  }

  calculateLeaveDays(): number {
    const diff =
      (this.endDate.getTime() - this.startDate.getTime()) /
      (1000 * 60 * 60 * 24);
    return Math.floor(diff) + 1;
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  onSubmit(form: NgForm) {
    if (form.invalid || this.endDateError) return;

    const payload = {
      employeeId: this.employee.employeeId,
      leaveType: this.leaveType,
      startDate: this.formatDate(this.startDate),
      endDate: this.formatDate(this.endDate),
      totalDays: this.calculateLeaveDays(),
      reason: this.reason,
      email: this.teamEmail
    };

    this.leaveService.applyLeave(payload).subscribe({
      next: () => {
        alert('Leave applied successfully');
        form.resetForm();
        this.router.navigate(['/leave-summary']);
      },
      error: err => {
        console.error(err);
        alert('Failed to apply leave');
      }
    });
  }

  cancel() {
    this.location.back();
  }
}
