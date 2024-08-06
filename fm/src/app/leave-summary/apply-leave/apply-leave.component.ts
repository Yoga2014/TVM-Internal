import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LeaveService } from 'src/app/AllServices/leave.service';
import { LeaveRequest } from 'src/app/Interface/leave-request.model';

@Component({
  selector: 'app-apply-leave',
  templateUrl: './apply-leave.component.html',
  styleUrls: ['./apply-leave.component.scss']
})
export class ApplyLeaveComponent implements OnInit {
  leaveTypes: string[] = ['Casual Leave', 'Earned Leave', 'Leave Without Pay', 'Paternity Leave', 'Sabbatical Leave', 'Sick Leave'];
  leaveType: string = '';
  startDate: Date | null = null;
  endDate: Date | null = null;
  teamEmail: string = '';
  reason: string = '';
  startDateError: string = '';
  endDateError: string = '';

  employee: any = {};

  constructor(private router: Router, private leaveService: LeaveService, private previousPage: Location) {}

  ngOnInit() {
    this.leaveService.getEmployeeDetails().subscribe(
      data => {
        this.employee = data;
      },
      error => {
        alert('Failed to fetch employee details');
      }
    );
  }

  validateDates() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.startDate) {
      const start = new Date(this.startDate);
      if (start < today) {
        this.startDateError = 'Start date cannot be in the past.';
      } else {
        this.startDateError = '';
      }
    }

    if (this.endDate) {
      const end = new Date(this.endDate);
      if (end < today) {
        this.endDateError = 'End date cannot be in the past.';
      } else {
        this.endDateError = '';

        if (this.startDate && end < new Date(this.startDate)) {
          this.endDateError = 'End date cannot be before start date.';
        }
      }
    }
  }

  onSubmit() {
    if (this.startDate && this.endDate && this.leaveType) {
      const currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);

      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      if (start < currentDate) {
        this.startDateError = 'Start date must be today or a future date.';
        return;
      }
      this.startDateError = '';

      if (end < currentDate) {
        this.endDateError = 'End date must be today or a future date.';
        return;
      }
      this.endDateError = '';

      if (end < start) {
        this.endDateError = 'End date cannot be before start date.';
        return;
      }
      this.endDateError = '';

      const leaveDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24)) + 1;
      const leaveRequest: LeaveRequest = {
        employeeId: this.employee.id,
        employeeName: this.employee.name,
        email: this.employee.email,
        designation: this.employee.designation,
        leaveType: this.leaveType,
        teamId: this.employee.teamId,
        startDate: this.formatDate(start),
        endDate: this.formatDate(end),
        totalDays: leaveDays,
        reasonforLeave: this.reason,
        status: 'Pending',
        dateOfRequest: this.formatDate(new Date())
      };

      this.leaveService.addLeaveRequests(leaveRequest).subscribe(() => {
        alert(`Leave applied successfully! ${leaveDays} days of ${this.leaveType}`);
        this.previousPage.back();
      }, error => {
        alert('Failed to apply leave');
      });
    } else {
      alert('Please fill all required fields');
    }
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }

  cancel() {
    this.previousPage.back();
  }
}
