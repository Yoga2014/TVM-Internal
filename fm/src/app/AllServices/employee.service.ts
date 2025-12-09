import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Employee } from '../Interface/employee.model';
import { API_CONFIG } from '../api-config';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl = `${API_CONFIG.BASE_URL}/api`;
  activeTab: string = '';

  constructor(private http: HttpClient) { }

  // 🔥 Get Bearer Token
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }
getEmployeeByCode(employeeCode: string): Observable<any> {
  const token = localStorage.getItem('token');

  const headers = {
    Authorization: `Bearer ${token}`
  };

  return this.http.get<any>(`${this.apiUrl}/employees/${employeeCode}`, { headers });
}


  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/employees`, this.getAuthHeaders());
  }

  getRecentHires(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}?recent=true`, this.getAuthHeaders());
  }

  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }

  getEmployeesOnLeave(date: string): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiUrl}/employees?date=${date}`, this.getAuthHeaders());
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return this.http.put<Employee>(`${this.apiUrl}/${employee.employeeId}`, employee, this.getAuthHeaders());
  }

  deleteEmployee(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }

  // 🔥 BehaviorSubject for selected employee
  private selectedEmployeeSource = new BehaviorSubject<any>(null);
  selectedEmployee$ = this.selectedEmployeeSource.asObservable();


  setSelectedEmployee(employeeCode: string) {
    this.selectedEmployeeSource.next(employeeCode);
  }


}
