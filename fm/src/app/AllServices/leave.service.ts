
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaveRequest } from '../Interface/leave-request.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  activeTab: string ='';

  private apiUrl = 'https://api.example.com/leaves';

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

  addLeaveRequests(leaveRequest: LeaveRequest): Observable<any> {
    return this.http.post(`${this.apiUrl}/leave-requests`, leaveRequest);
  }

  updateLeaveRequest(index: number, leaveRequest: Partial<LeaveRequest>): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${index}`, leaveRequest);
  }

  deleteLeaveRequest(index: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${index}`);
  }
}
export { LeaveRequest };

