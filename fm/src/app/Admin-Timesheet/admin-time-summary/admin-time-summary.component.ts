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
    this.timesheetEntries = data;
  });
}


updateStatus(entry: any, status: 'Approved' | 'Rejected') {
  entry.status = status;

  this.timesheetService.updateTimesheetStatus(entry.id, status).subscribe({
    next: (res) => console.log('Status updated', res),
    error: (err) => console.error('Error updating status', err)
  });
}

revertStatus(entry: any) {
  entry.status = 'Pending';

  this.timesheetService.updateTimesheetStatus(entry.id, 'Pending').subscribe({
    next: (res) => console.log('Status reverted', res),
    error: (err) => console.error('Error reverting status', err)
  });
}



}
