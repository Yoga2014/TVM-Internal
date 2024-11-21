import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaveRequest } from '../Interface/leave-request.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  private apiUrl = 'http://localhost:3001/Leave';
  leaveAppliedSubject: any;

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

  bookLeave(leaveType: string, days: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { leaveType, days });
  }

  cancelLeave(leaveType: string, days: number): Observable<any> {
    return this.http.post<any>(this.apiUrl, { leaveType, days, cancel: true });
  }

  applyLeave(leaveData: LeaveRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, leaveData);
  }

  setLeaveApplied(leaveData: LeaveRequest): void {
    this.leaveAppliedSubject.next(leaveData); // Emit updated leave data
  }

  getLeaveApplied(): Observable<any> {
    return this.leaveAppliedSubject.asObservable();
  }

  approveLeaveRequest(employeeId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/approve/${employeeId}`, {});
  }

  // Reject leave request (assuming an API endpoint for rejection exists)
  rejectLeaveRequest(employeeId: number): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reject/${employeeId}`, {});
  }

  getLeaveSummary(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.apiUrl);
  }

  
}
