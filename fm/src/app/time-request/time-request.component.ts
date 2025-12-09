import { Component } from '@angular/core';
import { TimeSheetService } from '../AllServices/TimeSheetService.service';
import { WeekDay } from '@angular/common';

@Component({
  selector: 'app-time-request',
  templateUrl: './time-request.component.html',
  styleUrl: './time-request.component.scss'
})
export class TimeRequestComponent {
  
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
     selectedRequests: any[] = [];


  
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

  // Select all checkboxes
  selectAll(event: any): void {
    const checked = event.target.checked;
    this.timesheetSummary.forEach(entry => entry.selected = checked);
    this.selectedRequests = checked ? [...this.timesheetSummary] : [];
  }

  // Select single checkbox
  onRowSelect(event: any, entry: any): void {
    const checked = event.target.checked;
    if (checked) {
      this.selectedRequests.push(entry);
    } else {
      this.selectedRequests = this.selectedRequests.filter(r => r !== entry);
    }
  }

  // Delete selected
  deleteSelectedRequests(): void {
    if (this.selectedRequests.length === 0) {
      alert("Select at least one request to delete.");
      return;
    }

    if (confirm("Are you sure you want to delete selected timesheet entries?")) {
      this.selectedRequests.forEach(entry => {

        const id = entry.id || entry._id || entry.timesheetId; // Auto detect ID

        if (!id) {
          console.error("No valid ID found for:", entry);
          return;
        }

        this.timesheetService.deleteTimesheet(id).subscribe({
          next: () => this.loadTimesheets(),
          error: (err: any) => console.error("Delete failed:", err)
        });
      });

      this.selectedRequests = [];
    }
  }
}
