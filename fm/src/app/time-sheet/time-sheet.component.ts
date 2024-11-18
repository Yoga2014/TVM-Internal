import { Component, OnInit } from '@angular/core';
import { TimesheetService } from '../AllServices/TimeSheetService.service';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.scss']
})
export class TimeSheetComponent implements OnInit {
  selectedTimeframe: string = 'weekly';
  selectedDateRange: string = '';
  hourFilter: string = 'all';
  groupFilter: string = 'all';
  scheduleFilter: string = 'all';
  searchText: string = '';
  dateRanges: string[] = [];
  userTimesheets: any[] = [];
  filteredTimesheets: any[] = [];
  isTooltipVisible: boolean = false;
  tooltipStyle: any = {};
  days: string[] = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  groups: string[] = ['Group A', 'Group B', 'Group C'];
  schedules: string[] = ['Schedule 1', 'Schedule 2'];

  constructor(private timesheetService: TimesheetService) {}

  ngOnInit(): void {
    this.initializeDateRanges();
    this.fetchTimesheetData();
  }

  initializeDateRanges() {
    // Logic for setting date ranges based on the selected timeframe
    const today = new Date();
    const startOfWeek = this.getStartOfWeek(today);
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    if (this.selectedTimeframe === 'weekly') {
      this.dateRanges = ['This Week', 'Last Week', 'Last 2 Weeks', 'Last 3 Weeks'];
    } else if (this.selectedTimeframe === 'monthly') {
      this.dateRanges = ['This Month', 'Last Month', 'Last 2 Months', 'Last 3 Months'];
    } else if (this.selectedTimeframe === 'yearly') {
      this.dateRanges = ['This Year', 'Last Year', 'Last 2 Years', 'Last 3 Years'];
    }
  }

  fetchTimesheetData() {
    if (this.selectedTimeframe === 'weekly') {
      this.loadWeeklyData(new Date());
    } else if (this.selectedTimeframe === 'monthly') {
      this.loadMonthlyData(new Date());
    } else if (this.selectedTimeframe === 'yearly') {
      this.loadYearlyData(new Date());
    }
  }

  loadWeeklyData(date: Date) {
    const startOfWeek = this.getStartOfWeek(date);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 6);

    this.timesheetService.getTimesheetsByDateRange(startOfWeek, endOfWeek).subscribe(data => {
      this.userTimesheets = data;
      this.applyFilters();
    });
  }

  loadMonthlyData(date: Date) {
    const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const endOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0);

    this.timesheetService.getTimesheetsByDateRange(startOfMonth, endOfMonth).subscribe(data => {
      this.userTimesheets = data.map(item => ({
        ...item,
        date: this.formatDate(item.date)
      }));
      this.applyFilters();
    });
  }

  loadYearlyData(date: Date) {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const endOfYear = new Date(date.getFullYear(), 11, 31);

    this.timesheetService.getTimesheetsByDateRange(startOfYear, endOfYear).subscribe(data => {
      this.userTimesheets = data.map(item => ({
        ...item,
        date: this.formatDate(item.date)
      }));
      this.applyFilters();
    });
  }

  applyFilters() {
    this.filteredTimesheets = this.userTimesheets
      .filter(item => 
        this.hourFilter === 'all' || 
        (this.hourFilter === 'above8' && item.totalHours > 8) || 
        (this.hourFilter === 'below8' && item.totalHours < 8)
      )
      .filter(item => this.groupFilter === 'all' || item.group === this.groupFilter)
      .filter(item => this.scheduleFilter === 'all' || item.schedule === this.scheduleFilter)
      .filter(item => item.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  exportData() {
    const csvContent = this.convertToCSV(this.filteredTimesheets);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'timesheet_data.csv');
    link.click();
  }

  convertToCSV(data: any[]): string {
    const header = Object.keys(data[0] || {}).join(',') + '\n';
    const rows = data.map(row => Object.values(row).join(',')).join('\n');
    return header + rows;
  }

  showTooltip(event: MouseEvent, hours: number) {
    this.isTooltipVisible = true;
    this.tooltipStyle = {
      left: `${event.pageX}px`,
      top: `${event.pageY}px`
    };
  }

  hideTooltip() {
    this.isTooltipVisible = false;
  }

  getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  formatDate(date: Date): string {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
