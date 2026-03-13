import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TemplateRef, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

enum WeekDay {
  Monday = 'Monday',
  Tuesday = 'Tuesday',
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
}
interface TimeEntry {
  project: string;
  task: string;
  hours: number[];
}

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  standalone: false,
  styleUrls: ['./time-sheet.component.scss']
})
export class TimeSheetComponent {
  form!: FormGroup;
  weekDates: Date[] = [];
  currentDate = new Date();
  showPopup = false;
  popupForm!: FormGroup;
  popupRowIndex!: number;
  popupDayIndex!: number;


  @ViewChild('entryDialog') entryDialog!: TemplateRef<any>;

  taskOptions = [
    'Development UI',
    'Development Backend',
    'Testing',
    'Deployment',
    'HR'
  ];

  constructor(private fb: FormBuilder, private http: HttpClient, private dialog: MatDialog) {}

  ngOnInit() {
  this.generateWeek();
  this.buildForm();
  this.popupForm = this.fb.group({
    tasks: this.fb.array([this.createTask()])
  });

  }

  generateWeek() {
    const start = new Date(this.currentDate);
    start.setDate(start.getDate() - start.getDay());
    this.weekDates = [];

    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      this.weekDates.push(d);
    }
  }

  buildForm() {
    this.form = this.fb.group({
      rows: this.fb.array([this.createRow()])
    });
  }

 createRow(): FormGroup {
  return this.fb.group({
    project: ['', Validators.required],
    task: ['', Validators.required],
    billable: [true],
    hours: this.fb.array(
      this.weekDates.map(date =>
        this.fb.control(
          { value: '', disabled: this.isWeekend(date) },
          [Validators.min(0), Validators.max(9)]
        )
      )
    ),
    details: this.fb.array(
  this.weekDates.map(() =>
    this.fb.array([]) // each day holds multiple tasks
  )
)

  });
}

  get rows(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  getHours(rowIndex: number): FormArray {
    return this.rows.at(rowIndex).get('hours') as FormArray;
  }

  isWeekend(date: Date): boolean {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  addRow() {
    this.rows.push(this.createRow());
  }

  getRowTotal(rowIndex: number): number {
    return this.getHours(rowIndex).controls
      .reduce((sum, ctrl) => sum + Number(ctrl.value), 0);
  }

  getTotalForDay(dayIndex: number): number {
    return this.rows.controls.reduce((sum, row: any) => {
      return sum + Number(row.get('hours').at(dayIndex).value);
    }, 0);
  }

  getTotalWeekHours(): number {
    return this.weekDates.reduce((sum, _, i) => {
      if (!this.isWeekend(this.weekDates[i])) {
        return sum + this.getTotalForDay(i);
      }
      return sum;
    }, 0);
  }

  getBillableTotal(): number {
    return this.rows.controls.reduce((sum: number, row: any, i) => {
      if (row.value.billable) {
        return sum + this.getRowTotal(i);
      }
      return sum;
    }, 0);
  }

  getNonBillableTotal(): number {
    return this.getTotalWeekHours() - this.getBillableTotal();
  }

  validateMandatoryHours(): boolean {
    for (let i = 0; i < 7; i++) {
      if (!this.isWeekend(this.weekDates[i])) {
        if (this.getTotalForDay(i) !== 9) {
          return false;
        }
      }
    }
    return true;
  }
private getHeaders(): HttpHeaders {
  const token = localStorage.getItem('token');

  return new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
}

submit() {
  if (!this.validateMandatoryHours()) {
    alert('Each weekday must total exactly 9 hours.');
    return;
  }

  const payload = {
    username: localStorage.getItem('username'),
    weekStart: this.weekDates[0],
    weekEnd: this.weekDates[6],
    rows: this.rows.value,
    total: this.getTotalWeekHours(),
    billable: this.getBillableTotal(),
    nonBillable: this.getNonBillableTotal(),
    status: 'PENDING'
  };

  this.http.post(
    'http://localhost:8080/api/timesheets',
    payload,
    { headers: this.getHeaders() }   
  ).subscribe({
    next: (res) => {
      alert('Timesheet Submitted Successfully');
      this.buildForm();
      this.generateWeek();
    },
    error: (err) => {
      console.error('Submission Error:', err);

      if (err.status === 401) {
        alert('Unauthorized! Please login again.');
      } else if (err.status === 403) {
        alert('Access Denied!');
      } else if (err.status === 500) {
        alert('Server Error! Check backend logs.');
      } else {
        alert('Something went wrong!');
      }
    }
  });
}
  goPrevWeek() {
  alert('You cant fill the Timesheet for the Previous Week.');
}

goNextWeek() {
  this.currentDate.setDate(this.currentDate.getDate() + 7);
  this.generateWeek();
}

goToday() {
  this.currentDate = new Date();
  this.generateWeek();
}

openDialog(rowIndex: number, dayIndex: number) {
  this.popupRowIndex = rowIndex;
  this.popupDayIndex = dayIndex;
  this.showPopup = true;

  // reset popup tasks array
  this.popupForm.setControl('tasks', this.fb.array([]));

  // get the details array for this row
  const detailsArray = this.rows.at(rowIndex).get('details') as FormArray;
  const dayTasksArray = detailsArray.at(dayIndex) as FormArray;

  if (dayTasksArray && dayTasksArray.length > 0) {
    // load all existing tasks for this day
    dayTasksArray.controls.forEach(ctrl => {
      const group = ctrl as FormGroup; // cast AbstractControl to FormGroup
      this.tasks.push(this.fb.group({
        date: [group.value.date, Validators.required],
        hours: [group.value.hours, [Validators.required, Validators.min(0), Validators.max(9)]],
        billable: [group.value.billable],
        notes: [group.value.notes]
      }));
    });
  } else {
    this.addTask(this.weekDates[dayIndex]);
  }
}

closeDialog() {
  this.showPopup = false;
}

saveDialog() {
  if (this.popupForm.valid) {
    const tasks = this.tasks.value; // all tasks entered in popup
    const detailsArray = this.rows.at(this.popupRowIndex).get('details') as FormArray;
    const dayTasksArray = detailsArray.at(this.popupDayIndex) as FormArray;

    // clear existing tasks for that day
    dayTasksArray.clear();

    // push all tasks
    tasks.forEach((t: any) => {
      dayTasksArray.push(this.fb.group(t));
    });

    // update hours for totals (sum of all tasks for that day)
    const totalHours = tasks.reduce((sum: number, t: any) => sum + Number(t.hours), 0);
    this.getHours(this.popupRowIndex).at(this.popupDayIndex).setValue(totalHours);

    this.showPopup = false;
  }
}

get tasks(): FormArray {
  return this.popupForm.get('tasks') as FormArray;
}


createTask(date?: Date): FormGroup {
  return this.fb.group({
    date: [date ? date.toISOString().substring(0,10) : '', Validators.required],
    hours: ['', [Validators.required, Validators.min(0), Validators.max(9)]],
    billable: [true],
    notes: ['']
  });
}

addTask(date?: Date) {
  if (this.tasks.length < 5) {
    this.tasks.push(this.createTask(date));
  } else {
    alert('You can only add up to 5 tasks.');
  }
}



}
