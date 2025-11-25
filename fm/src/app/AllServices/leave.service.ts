import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { LeaveRequest } from '../Interface/leave-request.model';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private leaveSummaryURL = 'http://localhost:3008/LeaveSummary';
  private applyLeaveURL = 'http://localhost:3004/Leave';
  private leaveApprovalURL = 'http://localhost:3003/leaveRequest';

  private leaveAppliedSubject = new Subject<LeaveRequest>();

  constructor(private http: HttpClient) { }

  // Fetch leave summary data
  getLeaveSummary(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.leaveSummaryURL);
  }

  // Get all leave requests
  getLeaves(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.applyLeaveURL);
  }

  // Add a new leave request
  addLeaveRequest(leaveRequest: LeaveRequest): Observable<void> {
    return this.http.post<void>(this.applyLeaveURL, leaveRequest);
  }

  // Emit the newly applied leave request
  setLeaveApplied(leave: LeaveRequest): void {
    this.leaveAppliedSubject.next(leave);
  }

  // Fetch available leave types from leave summary
  getLeaveTypes(): Observable<string[]> {
    return this.http.get<LeaveRequest[]>(this.leaveSummaryURL).pipe(
      map((leaveSummary: LeaveRequest[]) =>
        leaveSummary
          .map((leave) => leave.typeLeave)
          .filter((typeLeave): typeLeave is string => !!typeLeave)
      )
    );
  }


  // Listen for newly applied leave requests
  getLeaveApplied(): Observable<LeaveRequest> {
    return this.leaveAppliedSubject.asObservable();
  }

  // Update an existing leave request
  updateLeaveRequest(id: string | number, leaveRequest: Partial<LeaveRequest>): Observable<void> {
    const leaveId = typeof id === 'string' ? Number(id) : id;
    return this.http.put<void>(`${this.applyLeaveURL}/${leaveId}`, leaveRequest);
  }

  // Delete a leave request
  deleteLeaveRequest(id: string | number): Observable<void> {
    const leaveId = typeof id === 'string' ? Number(id) : id;
    return this.http.delete<void>(`${this.applyLeaveURL}/${leaveId}`);
  }

  // Approve a leave request
  approveLeaveRequest(id: string | number): Observable<void> {
    const leaveId = typeof id === 'string' ? Number(id) : id;
    return this.http.post<void>(`${this.leaveApprovalURL}/approve/${leaveId}`, {});
  }

  // Reject a leave request with a comment
  rejectLeaveRequest(id: string | number, comment: string): Observable<void> {
    const leaveId = typeof id === 'string' ? Number(id) : id;
    return this.http.post<void>(`${this.leaveApprovalURL}/reject/${leaveId}`, { comment });
  }

  // Add a method to calculate total available leaves
  getTotalAvailableLeaves(): Observable<number> {
    return this.getLeaveSummary().pipe(
      map((leaves) => leaves.reduce((sum, leave) => sum + (leave.available || 0), 0))
    );
  }
}
