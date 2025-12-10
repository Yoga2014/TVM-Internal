import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subject } from 'rxjs';
import { LeaveRequest } from '../Interface/leave-request.model';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  
  private leaveSummaryURL = 'http://localhost:3006/LeaveSummary';
  private applyLeaveURL = 'http://localhost:3007/Leave';
  private leaveApprovalURL = 'http://localhost:3001/leaveRequest';

  private leaveAppliedSubject = new Subject<LeaveRequest>();

  constructor(private http: HttpClient) {}

  /** ---------------------------------------
   *  GET LEAVE SUMMARY
   * --------------------------------------- */
  getLeaveSummary(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.applyLeaveURL);
  }

  /** ---------------------------------------
   *  GET ALL LEAVE REQUESTS
   * --------------------------------------- */
  getLeaves(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(this.applyLeaveURL);
  }

  /** ---------------------------------------
   *  ADD NEW LEAVE REQUEST
   * --------------------------------------- */
  addLeaveRequest(leaveRequest:any){
    return this.http.post<LeaveRequest>(this.applyLeaveURL, leaveRequest);
  }

  /** ---------------------------------------
   *  EMIT NEW LEAVE REQUEST EVENT
   * --------------------------------------- */
  setLeaveApplied(leave: LeaveRequest): void {
    this.leaveAppliedSubject.next(leave);
  }

  getLeaveApplied(): Observable<LeaveRequest> {
    return this.leaveAppliedSubject.asObservable();
  }

  /** ---------------------------------------
   *  GET LEAVE TYPES FROM SUMMARY
   * --------------------------------------- */
  getLeaveTypes(): Observable<string[]> {
    return this.http.get<LeaveRequest[]>(this.leaveSummaryURL).pipe(
      map((summary: LeaveRequest[]) =>
        summary
          .map((item) => item.typeLeave)
          .filter((type): type is string => !!type)
      )
    );
  }

  /** ---------------------------------------
   *  UPDATE LEAVE REQUEST
   * --------------------------------------- */
  updateLeaveRequest(
    id: string,
    leaveRequest: Partial<LeaveRequest>
  ): Observable<LeaveRequest> {
    return this.http.patch<LeaveRequest>(`${this.applyLeaveURL}/${id}`, leaveRequest);
  }


  /** ---------------------------------------
   *  DELETE LEAVE REQUEST
   * --------------------------------------- */
deleteLeaveRequest(id: string): Observable<void> {
  return this.http.delete<void>(`${this.applyLeaveURL}/${id}`);
}

  /** ---------------------------------------
   *  APPROVE A LEAVE REQUEST
   * --------------------------------------- */
  approveLeaveRequest(id: string | number): Observable<void> {
    return this.http.post<void>(`${this.leaveApprovalURL}/approve/${id}`, {});
  }

  /** ---------------------------------------
   *  REJECT LEAVE REQUEST WITH COMMENT
   * --------------------------------------- */
  rejectLeaveRequest(id: string | number, comment: string): Observable<void> {
    return this.http.post<void>(`${this.leaveApprovalURL}/reject/${id}`, { comment });
  }

  /** ---------------------------------------
   *  CALCULATE TOTAL AVAILABLE LEAVES
   * --------------------------------------- */
  getTotalAvailableLeaves(): Observable<number> {
    return this.getLeaveSummary().pipe(
      map((leaves) =>
        leaves.reduce((sum, leave) => sum + (leave.available ? leave.available : 0), 0)
      )
    );
  }
}