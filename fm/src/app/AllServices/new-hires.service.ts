import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Employee } from '../Interface/employee.model';

@Injectable({
  providedIn: 'root'
})
export class NewHiresService {

  private apiUrl = 'http://localhost:3001/NewHires';

  constructor(private http: HttpClient) {}

  getRecentHires(): Observable<Employee[]> {
    debugger
    const today = new Date();
    const fifteenDaysAgo = new Date(today.setDate(today.getDate() - 15));

    return this.http.get<Employee[]>(this.apiUrl).pipe(
      map((employees: Employee[]) =>
        employees.filter((employee: Employee) => {
          if (employee.joinDate) {
            const joinDate = new Date(employee.joinDate); // Safe cast
            return joinDate >= fifteenDaysAgo && joinDate <= new Date();
          }
          return false;
        })
      )
    );
  }


  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.employeeId}`, employee);
  }

  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
