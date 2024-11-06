import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaveRequest } from '../Interface/leave-request.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private apiUrl = 'http://localhost:3001/Leave';

  constructor(private http: HttpClient) {}

  getEmployeeDetails(): Observable<any> {
    return this.http.get(`${this.apiUrl}/employee-details`);
  }

  getLeaves(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(`${this.apiUrl}`);
  }

  addLeaveRequest(request: LeaveRequest): Observable<LeaveRequest> {
    return this.http.post<LeaveRequest>(`${this.apiUrl}`, request);
  }

  updateLeaveRequest(index: number, leaveRequest: Partial<LeaveRequest>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${index}`, leaveRequest);
  }

  deleteLeaveRequest(index: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${index}`);
  }
}
