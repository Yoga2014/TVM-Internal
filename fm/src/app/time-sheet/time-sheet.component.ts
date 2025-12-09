import { Component } from '@angular/core';
import { TimeSheetService } from '../AllServices/TimeSheetService.service';
import { EmployeeAuthService } from '../AllServices/EmployeeAuthService';

enum WeekDay {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
}

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  standalone: false,
  styleUrls: ['./time-sheet.component.scss']
})
export class TimeSheetComponent {
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
    description: '',
     status: 'Pending' 
  };

  popupVisible: { [day in WeekDay]: boolean } = {
    [WeekDay.Monday]: false,
    [WeekDay.Tuesday]: false,
    [WeekDay.Wednesday]: false,
    [WeekDay.Thursday]: false,
    [WeekDay.Friday]: false,
  };

  dayNotes: { [key in WeekDay]: string } = {
    [WeekDay.Monday]: '',
    [WeekDay.Tuesday]: '',
    [WeekDay.Wednesday]: '',
    [WeekDay.Thursday]: '',
    [WeekDay.Friday]: '',
  };

  timesheetSummary: any[] = [];

  constructor(
    private timesheetService: TimeSheetService,
    private employeeAuthService: EmployeeAuthService
  ) {}

  ngOnInit(): void {
    const employee = this.employeeAuthService.getAuthenticatedEmployee();
    this.timesheet.employeeName = employee.employeeName;
    this.initializeYears();
    this.initializeMonths();
    this.loadTimesheets();
  }

  togglePopup(day: WeekDay): void {
    this.openNotePopup(day);
  }

  saveNoteForDay(day: WeekDay): void {
    const selectedDate = this.getSelectedDateForDay(day);

    if (this.dayNotes[day]?.trim()) {
      const noteKey = `note_${selectedDate}`;
      localStorage.setItem(noteKey, this.dayNotes[day]);
      console.log(`Note for ${day} (${selectedDate}) saved:`, this.dayNotes[day]);
    } else {
      console.warn(`No note provided for ${day}`);
    }

    this.popupVisible[day] = false;
  }

  getSelectedDateForDay(day: WeekDay): string {
    const mondayDate = new Date(this.timesheet.weekendDate);
    const dayOffset = this.weekDays.indexOf(day);

    if (dayOffset >= 0) {
      const selectedDate = new Date(mondayDate);
      selectedDate.setDate(mondayDate.getDate() + dayOffset);
      return selectedDate.toISOString().split('T')[0];
    }

    return '';
  }

  openNotePopup(day: WeekDay): void {
    const selectedDate = this.getSelectedDateForDay(day);
    const noteKey = `note_${selectedDate}`;
    this.dayNotes[day] = localStorage.getItem(noteKey) || '';
    this.popupVisible[day] = true;
  }

  initializeYears(): void {
    const currentYear = new Date().getFullYear();
    this.years = Array.from({ length: 5 }, (_, i) => currentYear + i);
  }

  initializeMonths(): void {
    this.months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
  }

  loadTimesheets(): void {
    this.timesheetService.getTimesheets().subscribe(data => {
      this.timesheetSummary = data;
    });
  }

  onMonthChange(): void {
    if (this.timesheet.month) {
      this.updateMondays(this.timesheet.year, this.timesheet.month);
    }
  }

  updateMondays(year: number, month: string): void {
    const monthIndex = this.months.indexOf(month);
    if (monthIndex >= 0) {
      const date = new Date(year, monthIndex, 1);
      this.weekendDates = [];
      while (date.getMonth() === monthIndex) {
        if (date.getDay() === 1) {                                  // Monday
          this.weekendDates.push(date.toDateString());
        }
        date.setDate(date.getDate() + 1);
      }
    }
  }

  onWeekendDateSelect(): void {
    if (this.timesheet.weekendDate) {
      this.populateWeekDays(this.timesheet.weekendDate);
    }
  }

  populateWeekDays(selectedMonday: string): void {
    const mondayDate = new Date(selectedMonday);
    this.weekDays = [];

    for (let i = 0; i < 5; i++) {
      const day = new Date(mondayDate);
      day.setDate(mondayDate.getDate() + i);

      const dayOfWeek = day.toLocaleDateString('en-US', { weekday: 'long' }) as WeekDay;
      this.weekDays.push(dayOfWeek);
    }
  }

  calculateTotalHours(): void {
    const hours = this.timesheetEntry.hours;
    let total = 0;
    for (const day of this.weekDays) {
      const dailyHours = parseFloat(hours[day]) || 0;
      total += dailyHours;
    }
    this.timesheetEntry.totalHours = total.toString();
  }

  openFillYourTimesheetAccordion(): void {
    // this.accordionState = [false, false, true];
  }

onSubmit(form: any): void {
  if (form.valid) {
    const payload = {
      ...this.timesheetEntry,
      status: 'Pending',  // Always store as Pending when submitting
      employeeName: this.timesheet.employeeName
    };

    this.timesheetService.addTimesheet(payload).subscribe(() => {
      this.loadTimesheets();
      form.resetForm();
      this.timesheetEntry.status = 'Pending';
    });
  }
}


  validateWeekDay(day: string): boolean {
    return this.weekDays.includes(day as WeekDay);
  }
}
