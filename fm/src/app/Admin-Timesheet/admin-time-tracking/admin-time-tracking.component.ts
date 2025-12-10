import { WeekDay } from '@angular/common';
import { Component } from '@angular/core';
import { TimeSheetService } from 'src/app/AllServices/TimeSheetService.service';

@Component({
  selector: 'app-admin-time-tracking',
  templateUrl: './admin-time-tracking.component.html',
  styleUrl: './admin-time-tracking.component.scss'
})
export class AdminTimeTrackingComponent {

      name: any = localStorage.getItem('Name');
  
  
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
  
  
    
      constructor(
        private timesheetService: TimeSheetService
      ) {}
    
      ngOnInit(): void {
        this.loadTimesheets();
      }
    
    
      loadTimesheets(): void {
        this.timesheetService.getTimesheets().subscribe((data:any) => {
          this.timesheetSummary = data;
        });
      }

}
