import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewHiresService } from '../../AllServices/new-hires.service';
import { Employee } from 'src/app/Interface/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl:'./employee-details.component.html',
  standalone: false,
  styleUrls: ['./employee-details.component.scss']
})
export class EmployeeDetailsComponent implements OnInit {

  employee: Employee | null = null;
  isEditing: boolean = false;

  constructor(private route: ActivatedRoute, private newHiresService: NewHiresService, private router: Router) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.newHiresService.getEmployeeById(id).subscribe(
        (employee: Employee) => {
          this.employee = employee;
        },
        (error: any) => {
          console.error('Failed to fetch employee details', error);
        }
      );
    }else{
      console.error('Employee ID is null');
    }
  }

  startEdit(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  saveEmployee(partial: Partial<Employee>): void {
    if (!this.employee) return;

    
    const updatedEmployee: Employee = {
      ...this.employee,
      ...partial
    };

    
    if (updatedEmployee.joinDate && /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(updatedEmployee.joinDate)) {
      const dateOnly = updatedEmployee.joinDate;
      updatedEmployee.joinDate = new Date(dateOnly + 'T00:00:00.000Z').toISOString();
    }

    this.newHiresService.updateEmployee(updatedEmployee).subscribe(
      (res: Employee) => {
        this.employee = res;
        this.isEditing = false;
      },
      (error: any) => {
        console.error('Failed to save employee details', error);
      }
    );
  }

deleteEmployee(): void {
  if (!this.employee || !this.employee.id) {
    console.error('No Employee ID found!');
    return;
  }

  this.newHiresService.deleteEmployee(this.employee.id).subscribe({
    next: () => {
      alert('Employee deleted successfully');
       this.router.navigate(['/organization/new-hires']); 
    },
    error: (err) => {
      console.error('Delete failed:', err);
    }
  });
}


}
