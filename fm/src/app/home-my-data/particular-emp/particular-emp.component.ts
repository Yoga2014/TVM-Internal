import { Component, OnDestroy } from '@angular/core';
import { EmployeeService } from 'src/app/AllServices/employee.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-particular-emp',
  templateUrl: './particular-emp.component.html',
  styleUrls: ['./particular-emp.component.scss']
})
export class ParticularEmpComponent implements OnDestroy {

  selectedEmployee: any = null;
  loading: boolean = false;
  error: string = '';

  private sub!: Subscription;

  constructor(private employeeService: EmployeeService) {
    this.sub = this.employeeService.selectedEmployee$.subscribe((employeeCode: string) => {
      if (employeeCode) {
        this.fetchEmployeeDetails(employeeCode);
      }
    });
  }

  fetchEmployeeDetails(code: string) {
    this.loading = true;
    this.error = '';
    this.selectedEmployee = null;

    this.employeeService.getEmployeeByCode(code).subscribe({
      next: (res: any) => {
        this.selectedEmployee = res;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = "Failed to load employee details";
        this.loading = false;
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) this.sub.unsubscribe();
  }
}
