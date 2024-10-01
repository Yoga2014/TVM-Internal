import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Employee } from '../Interface/Emplyee';  // Import the Employee interface

@Component({
  selector: 'app-new-joiners',
  templateUrl: './new-joiners.component.html',
  styleUrls: ['./new-joiners.component.scss']
})
export class NewJoinersComponent implements OnInit {

  employee: Employee[] = [];
  originalEmployee: Employee[] = []; // Store the original data
  apiUrl: string = 'http://localhost:8080/api/approval'; 
  approveUrl: string = 'http://localhost:8080/api/approval'; // URL for approval API
   
  startDate: string | null = null; // To hold the selected start date
  endDate: string | null = null;   // To hold the selected end date

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadInactiveWorkers();
  }

  loadInactiveWorkers(): void {
    this.http.get<Employee[]>(this.apiUrl).subscribe(data => {
      this.employee = data;
      this.originalEmployee = [...data]; // Store a copy of the original data
      console.log(this.employee);
    });
  }

  filterByDate(): void {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);

      // Check for valid date range
      if (!isNaN(start.getTime()) && !isNaN(end.getTime())) {
        this.employee = this.originalEmployee.filter(worker => {
          const joinDate = new Date(worker.createdDate);
          return joinDate >= start && joinDate <= end;
        });
      } else {
        console.error('Invalid date range');
      }
    } else {
      console.error('Both start date and end date must be provided');
    }
  }

  undoFilter(): void {
    this.employee = [...this.originalEmployee]; // Restore the original data
  }

  approveEmployee(id: number): void {
    if (confirm('Are you sure you want to approve this employee?')) {
      this.http.put(`${this.approveUrl}/${id}`, null).subscribe(
        response => {
          alert(`Employee ${id} approved successfully.`);
          this.loadInactiveWorkers(); // Reload the data to reflect changes
        },
        error => {
          console.error('Error approving employee', error);
        }
      );
    } else {
      console.log('Approval action cancelled');
    }
  }
}
