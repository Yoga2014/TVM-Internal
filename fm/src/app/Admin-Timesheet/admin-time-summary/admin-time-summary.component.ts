import { WeekDay } from '@angular/common';
import { Component } from '@angular/core';
import { TimeSheetService } from 'src/app/AllServices/TimeSheetService.service';

@Component({
  selector: 'app-admin-time-summary',
  templateUrl: './admin-time-summary.component.html',
  styleUrl: './admin-time-summary.component.scss'
})
export class AdminTimeSummaryComponent {

  years: number[] = [];
  months: string[] = [];
  weekendDates: string[] = [];
  weekDays: WeekDay[] = [WeekDay.Monday, WeekDay.Tuesday, WeekDay.Wednesday, WeekDay.Thursday, WeekDay.Friday];

  timesheet = {
    year: new Date().getFullYear(),
    month: '',
    weekendDate: '',
    employeeName: ''
  };

  timesheetEntry = {
    wfol: false,
    project: '',
    location: '',
    hrsType: '',
    hours: {
      [WeekDay.Monday]: '',
      [WeekDay.Tuesday]: '',
      [WeekDay.Wednesday]: '',
      [WeekDay.Thursday]: '',
      [WeekDay.Friday]: ''
    } as { [key in WeekDay]: string },
    totalHours: '',
    description: ''
  };

  timesheetSummary: any[] = [];
  accordionState = [false, false, false];

  name: any = localStorage.getItem('Name');
  adminname:any= localStorage.getItem('username');

  rejectPopup = false;
rejectEntry: any = null;
rejectReason = '';


  constructor(
    private timesheetService: TimeSheetService
  ) { }

  ngOnInit(): void {
    this.loadTimesheets();
  }

  timesheetEntries: any[] = [];


loadTimesheets(): void {
  this.timesheetService.getTimesheets().subscribe((data: any) => {
    // Check if timesheetEntries exists in response
    this.timesheetEntries = data.timesheets;
  });
}

updateStatus(entry: any, status: 'Approved' | 'Rejected') {

  this.timesheetService
    .updateTimesheetStatus(entry.id, status)
    .subscribe({
      next: () => entry.status = status
    });

}
revertStatus(entry: any) {

  this.timesheetService
    .updateTimesheetStatus(entry.id, 'Pending')
    .subscribe({
      next: () => entry.status = 'Pending'
    });

}

selectedEntry: any = null;
showPopup = false;

openNotes(entry: any) {
  this.selectedEntry = entry;
  this.showPopup = true;
}

closePopup() {
  this.showPopup = false;
}

openRejectPopup(entry: any) {
  this.rejectEntry = entry;
  this.rejectReason = '';
  this.rejectPopup = true;
}

closeRejectPopup() {
  this.rejectPopup = false;
}

confirmReject() {

  this.timesheetService
    .updateTimesheetStatus(
      this.rejectEntry.id,
      'Rejected',
    this.rejectReason,
    this.adminname
    )
    .subscribe({
      next: () => {
        this.rejectEntry.status = 'Rejected';
        this.rejectPopup = false;
      }
    });

}
}
