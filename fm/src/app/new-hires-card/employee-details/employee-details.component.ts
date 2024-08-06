import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewHiresService } from '../../AllServices/new-hires.service';
import { Employee } from 'src/app/Interface/employee.model';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent implements OnInit {

  employee: Employee | any = null;
  isEditing: boolean = false;

  constructor(private route: ActivatedRoute, private newHiresService: NewHiresService, private router: Router) { }

  ngOnInit(): void 
  {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) 
      {
      this.newHiresService.getEmployeeById(id).subscribe(employee => {
        this.employee = employee || null;
      });
    } 
    else 
    {
      console.error('Employee ID is null');
    }
  }

  startEdit(): void 
  {
    this.isEditing = true;
  }

  cancelEdit(): void 
  {
    this.isEditing = false;
  }

  saveEmployee(employee: Employee): void 
  {
    if (this.employee) 
      {
      this.newHiresService.updateEmployee({ ...this.employee, ...employee }).subscribe(updatedEmployee => {
        this.employee = updatedEmployee;
        this.isEditing = false;
      });
    }
  }

  deleteEmployee(): void 
  {
    if (this.employee) 
      {
      this.newHiresService.deleteEmployee(this.employee.id).subscribe(() => {
        this.router.navigate(['/new-hires']);
      });
    }
  }

 }

