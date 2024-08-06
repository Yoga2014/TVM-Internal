import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../Interface/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = 'your-api-url'; 

  activeTab: string = '';

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl);
  }

  getEmployeesOnLeave(date: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees?date=${date}`);
  }
}
