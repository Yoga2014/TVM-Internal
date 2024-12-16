import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class details {
  private apiUrl = 'http://localhost:3000/Workers';

  private userRole =  'http://localhost:8080/api';

  constructor(private http: HttpClient) {}

  // Update the method to not require an argument for GET requests
  EmployeesPostMethod(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  // New method to delete a worker by ID (DELETE request)
  deleteWorker(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }


  getUserRoleDetails(): Observable<any> {
    return this.http.get(`${this.userRole}/users/allDetails`);
  }
}
