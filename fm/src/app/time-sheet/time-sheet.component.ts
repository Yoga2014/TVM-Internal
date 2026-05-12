import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-time-sheet',
  templateUrl: './time-sheet.component.html',
  styleUrls: ['./time-sheet.component.scss']
})
export class TimeSheetComponent implements OnInit {

  form!: FormGroup;
  popupForm!: FormGroup;

  weekDates: Date[] = [];
  currentDate = new Date();

  showPopup = false;
  popupRowIndex!: number;
  popupDayIndex!: number;

  leaveDates: Set<string> = new Set();

  taskOptions = [
    'Development UI',
    'Development Backend',
    'Testing',
    'Deployment',
    'HR'
  ];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.dateleave(); // FIRST CALL LEAVE API
    this.generateWeek();
    this.buildForm();

    this.popupForm = this.fb.group({
      tasks: this.fb.array([this.createTask()])
    });
  }

  // ================= LEAVE API =================
  dateleave() {
    this.http.get<any[]>(
      'http://localhost:8080/api/leave/summary/weekly-window',
      { headers: this.getHeaders() }
    ).subscribe({
      next: (data) => {
        this.leaveDates = new Set(
          data.map(d =>
            new Date(d.startDate).toISOString().split('T')[0]
          )
        );
      },
      error: (err) => console.error(err)
    });
  }

  isLeaveDay(date: Date): boolean {
    const key = date.toISOString().split('T')[0];
    return this.leaveDates.has(key);
  }

  // ================= WEEK =================
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

  // ================= FORM =================
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
        this.weekDates.map(() => this.fb.array([]))
      )
    });
  }

  get rows(): FormArray {
    return this.form.get('rows') as FormArray;
  }

  getHours(i: number): FormArray {
    return this.rows.at(i).get('hours') as FormArray;
  }

  // ================= CHECKS =================
  isWeekend(date: Date): boolean {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  // ================= ROW =================
  addRow() {
    this.rows.push(this.createRow());
  }

  getRowTotal(i: number): number {
    let total = 0;

    this.weekDates.forEach((date, index) => {
      if (!this.isLeaveDay(date)) {
        total += Number(this.getHours(i).at(index).value || 0);
      }
    });

    return total;
  }

  getTotalForDay(i: number): number {
    const date = this.weekDates[i];

    if (this.isLeaveDay(date)) return 0;

    return this.rows.controls.reduce((sum: number, row: any) => {
      return sum + Number(row.get('hours').at(i).value || 0);
    }, 0);
  }

  getTotalWeekHours(): number {
    return this.weekDates.reduce((sum, _, i) => {
      if (!this.isWeekend(this.weekDates[i]) && !this.isLeaveDay(this.weekDates[i])) {
        return sum + this.getTotalForDay(i);
      }
      return sum;
    }, 0);
  }

  getBillableTotal(): number {
    return this.rows.controls.reduce((sum: number, row: any, i: number) => {
      if (row.value.billable) {
        return sum + this.getRowTotal(i);
      }
      return sum;
    }, 0);
  }

  getNonBillableTotal(): number {
    return this.getTotalWeekHours() - this.getBillableTotal();
  }

  // ================= SUBMIT =================
  submit() {

    const rows = this.rows.value.map((row: any) => {
      const updatedHours = this.weekDates.map((date, i) =>
        this.isLeaveDay(date) ? 0 : row.hours[i] || 0
      );

      return {
        ...row,
        hours: updatedHours
      };
    });

    const payload = {
      username: localStorage.getItem('username'),
      weekStart: this.weekDates[0],
      weekEnd: this.weekDates[6],
      rows,
      total: this.getTotalWeekHours(),
      status: 'PENDING'
    };

    this.http.post(
      'http://localhost:8080/api/timesheets',
      payload,
      { headers: this.getHeaders() }
    ).subscribe({
      next: () => {
        alert('Submitted Successfully');
        this.buildForm();
        this.generateWeek();
      },
      error: err => console.error(err)
    });
  }

  // ================= POPUP =================
  openDialog(rowIndex: number, dayIndex: number) {

    const date = this.weekDates[dayIndex];

    if (this.isLeaveDay(date)) {
      return; // BLOCK POPUP
    }

    this.popupRowIndex = rowIndex;
    this.popupDayIndex = dayIndex;
    this.showPopup = true;

    this.popupForm.setControl('tasks', this.fb.array([]));

    const detailsArray = this.rows.at(rowIndex).get('details') as FormArray;
    const dayTasksArray = detailsArray.at(dayIndex) as FormArray;

    if (dayTasksArray && dayTasksArray.length > 0) {
      dayTasksArray.controls.forEach(ctrl => {
        const group = ctrl as FormGroup;

        this.tasks.push(this.fb.group({
          date: group.value.date,
          hours: group.value.hours,
          billable: group.value.billable,
          notes: group.value.notes
        }));
      });
    } else {
      this.addTask(this.weekDates[dayIndex]);
    }
  }
saveDialog() {
  const tasks = this.popupForm.value.tasks || [];

  const total = tasks.reduce(
    (sum: number, t: any) => sum + Number(t.hours || 0),
    0
  );

  // update selected day hours
  this.getHours(this.popupRowIndex)
    .at(this.popupDayIndex)
    .setValue(total);

  this.showPopup = false;
}
  closeDialog() {
    this.showPopup = false;
  }

  get tasks(): FormArray {
    return this.popupForm.get('tasks') as FormArray;
  }

  createTask(date?: Date): FormGroup {
    return this.fb.group({
      date: [date ? date.toISOString().split('T')[0] : '', Validators.required],
      hours: ['', Validators.required],
      billable: [true],
      notes: ['']
    });
  }

  addTask(date?: Date) {
    this.tasks.push(this.createTask(date));
  }

  // ================= NAV =================
  goPrevWeek() {
    this.currentDate.setDate(this.currentDate.getDate() - 7);
    this.generateWeek();
  }

  goNextWeek() {
    this.currentDate.setDate(this.currentDate.getDate() + 7);
    this.generateWeek();
  }

  goToday() {
    this.currentDate = new Date();
    this.generateWeek();
  }

  // ================= HEADERS =================
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }
}