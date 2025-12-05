import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from 'src/app/Interface/employee.model';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  standalone: false,
  styleUrls: ['./edit-employee.component.scss']
})
export class EditEmployeeComponent implements OnInit {

  @Input() employee: Employee | null = null;
  @Output() cancel = new EventEmitter<void>();
  @Output() save = new EventEmitter<Employee>();

  employeeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.employeeForm = this.fb.group({
      employeeName: ['', Validators.required],
      joinDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    if (this.employee) {
          const joinDateValue = this.employee.joinDate
        ? new Date(this.employee.joinDate).toISOString().slice(0, 10)
        : '';

      this.employeeForm.patchValue({
        employeeName: this.employee.employeeName,
        joinDate: joinDateValue
      });
    }

    }
  

  onSubmit(): void {
    if (this.employeeForm.valid) {
     const formValue = this.employeeForm.value;
      this.save.emit(formValue);
    }
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
