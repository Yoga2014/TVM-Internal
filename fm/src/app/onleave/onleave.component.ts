import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../AllServices/employee.service'; // Adjust the path as needed
import { Employee } from '../Interface/employee.model'; // Adjust the path as needed

interface Day {
  label: string;
  date: string;
  employees: Employee[];
  leaveCount: number;
}

@Component({
  selector: 'app-onleave',
  templateUrl: './onleave.component.html',
  styleUrls: ['./onleave.component.scss']
})
export class OnLeavesComponent implements OnInit {
  currentWeek: string = '';
  weekDays: Day[] = [];
  isCalendarVisible: boolean = false;
  selectedDate: Date | null = null;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.setWeek(new Date());
  }

  setWeek(date: Date): void {
    this.weekDays = [];
    const startOfWeek = this.getStartOfWeek(date);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);

    this.currentWeek = `${this.formatDate(startOfWeek)} - ${this.formatDate(endOfWeek)}`;

    for (let i = 0; i < 7; i++) {
      const dayDate = new Date(startOfWeek);
      dayDate.setDate(startOfWeek.getDate() + i);
      this.employeeService.getEmployeesOnLeave(this.formatDate(dayDate)).subscribe(
        (employees: Employee[]) => {
          this.weekDays.push({
            label: this.getDayLabel(dayDate),
            date: this.formatDate(dayDate),
            employees: employees,
            leaveCount: employees.length
          });
        },
        (error) => {
          console.error('Failed to fetch employees on leave', error);
        }
      );
    }
  }

  getStartOfWeek(date: Date): Date {
    const start = new Date(date);
    const day = start.getDay();
    const diff = start.getDate() - day + (day === 0 ? -6 : 1);
    let weekStartDate = new Date(start.setDate(diff));

    if (weekStartDate.getDay() === 6) {
      weekStartDate.setDate(weekStartDate.getDate() - 1);
    }
    else if (weekStartDate.getDay() === 0) {
      weekStartDate.setDate(weekStartDate.getDate() - 2);
    }

    return weekStartDate;
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  getDayLabel(date: Date): string {
    return date.toLocaleString('default', { weekday: 'short' });
  }

  previousWeek(): void {
    const currentStart = new Date(this.weekDays[0].date);
    const previousWeekStart = new Date(currentStart.setDate(currentStart.getDate() - 7));
    this.setWeek(previousWeekStart);
  }

  nextWeek(): void {
    const currentStart = new Date(this.weekDays[0].date);
    const nextWeekStart = new Date(currentStart.setDate(currentStart.getDate() + 7));
    this.setWeek(nextWeekStart);
  }

  toggleCalendar(): void {
    this.isCalendarVisible = !this.isCalendarVisible;
  }

  onDateChange(event: any): void {
    const selectedDate = event.value;
    if (selectedDate) {
      this.setWeek(new Date(selectedDate));
    }
  }
}
