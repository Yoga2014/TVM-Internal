// 
import { Component, OnInit } from '@angular/core';
import { TimeLogService } from '../AllServices/timeLog.service';
import { EmployeeAuthService } from '../AllServices/authService.service';
import { TimesheetService } from '../AllServices/TimeSheetService.service';

@Component({
  selector: 'app-time-log',
  templateUrl: './time-log.component.html',
  styleUrls: ['./time-log.component.scss']
})
export class TimeLogComponent implements OnInit {
  selectedProject: string = '';
  selectedJob: string = '';
  taskDescription: string = '';
  projects: any[] = []; 
  logs: any[] = []; 
  timerStarted: boolean = false;
  timerDisplay: string = '00:00:00';
  startTime!: Date;
  endTime!: Date;
  timerInterval: any;
  userLogs: any[] = [];
  selectedDateLogs: any[] = [];

  showWeeklyCalendar: boolean = false;
  currentWeek: Date = new Date();
  endOfWeek!: Date; 
  weekDays: Date[] = [];
  selectedDate!: Date;

  constructor(
    private timeLogService: TimeLogService, 
    private employeeAuthService : EmployeeAuthService,
    private timeSheetService: TimesheetService) {}

  ngOnInit() {
    this.timeLogService.getProjects().subscribe((data) => {
      this.projects = data || [];
    });

    this.timeLogService.getTimeLogs().subscribe((data) => {
      this.logs = data || [];
      this.filterUserLogs();
    });

    this.calculateWeekDates();
  }

  filterUserLogs() {
    const loggedInUser = this.employeeAuthService.getAuthenticatedEmployee(); 
    this.userLogs = this.logs.filter(log => log.employeeId === loggedInUser.employeeId);
  }

  toggleTimer() {
    if (!this.timerStarted) {
      this.startTime = new Date();
      this.timerStarted = true;
      this.startTimer();
    } else {
      this.stopTimer();
    }
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - this.startTime.getTime();
      this.timerDisplay = this.formatTime(diff); 
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.timerInterval);
    this.endTime = new Date();
    this.timerStarted = false;
    this.saveTimeLog();
  }

  saveTimeLog() {
    const authenticateEmployee = this.employeeAuthService.getAuthenticatedEmployee();
    const totalMilliseconds = this.endTime.getTime() - this.startTime.getTime();
    const formattedTime = this.formatTime(totalMilliseconds);

    const log = {
      project: this.selectedProject,
      job: this.selectedJob,
      description: this.taskDescription,
      startTime: this.startTime,
      endTime: this.endTime,
      employeeId: authenticateEmployee.employeeId,
      hours: formattedTime 
    };

    this.logs.push(log);
    this.timeLogService.saveTimeLog(log).subscribe(() => {
      console.log('Log saved successfully!');
      this.filterUserLogs(); 
    });

    const totalHours = totalMilliseconds / (1000 * 60 * 60);

    this.timeSheetService.updateDailyHours(authenticateEmployee.employeeId, this.startTime, totalHours)
      .subscribe(() => {
        console.log('Timesheet updated successfully!');
        alert('Timesheet updated successfully!');
      });
  }

  showCalendar() {
    this.showWeeklyCalendar = !this.showWeeklyCalendar;  // Toggle visibility
  }

  calculateWeekDates() {
    const startOfWeek = this.getStartOfWeek(this.currentWeek);
    this.endOfWeek = new Date(startOfWeek.getTime() + 6 * 24 * 60 * 60 * 1000);  
    this.weekDays = [];
    for (let i = 0; i < 7; i++) {
      this.weekDays.push(new Date(startOfWeek.getTime() + i * 24 * 60 * 60 * 1000)); 
    }
  }

  getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);  
    return new Date(date.setDate(diff));
  }

  prevWeek() {
    this.currentWeek.setDate(this.currentWeek.getDate() - 7);
    this.calculateWeekDates();
  }

  nextWeek() {
    this.currentWeek.setDate(this.currentWeek.getDate() + 7);
    this.calculateWeekDates();
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    this.selectedDateLogs = this.getLogsForDate(date);
  }

  getLogTimeFormatted(date: Date): string | null {
    const dayLogs = this.getLogsForDate(date);
    const totalMilliseconds = dayLogs.reduce((sum, log) => {
      const start = new Date(log.startTime).getTime();
      const end = new Date(log.endTime).getTime();
      return sum + (end - start);
    }, 0);

    if (totalMilliseconds === 0) {
      return null;
    }

    const totalSeconds = Math.floor(totalMilliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
  }

  padNumber(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }

  getLogsForDate(date: Date): any[] {
    return this.userLogs.filter(log => {
      const logDate = new Date(log.startTime);
      return logDate.toDateString() === date.toDateString();
    });
  }

  formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
  } 
}

