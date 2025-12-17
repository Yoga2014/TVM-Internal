import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../api-config';
import { LeaveRequest } from '../Interface/leave-request.model';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private baseUrl = `${API_CONFIG.BASE_URL}/api/leave`;
  private adminUrl = `${API_CONFIG.BASE_URL}/api/admin/leave`;

  constructor(private http: HttpClient) {}

  // ================= AUTH HEADER =================
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // ================= EMPLOYEE SIDE =================

  // ✅ Apply Leave
  applyLeave(payload: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/apply`,
      payload,
      { headers: this.getHeaders() }
    );
  }

  // ✅ Employee Leave Summary
  getLeaveSummary(employeeId: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/summary/${employeeId}`,
      { headers: this.getHeaders() }
    );
  }

  // ✅ Employee Leave Requests
  getMyLeaveRequests(employeeId: number): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(
      `${this.baseUrl}/my-requests/${employeeId}`,
      { headers: this.getHeaders() }
    );
  }

  // ✅ Delete Leave Request (Employee)
  deleteLeaveRequest(id: number): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  // ✅ Get All Leaves
  getLeaves(): Observable<any> {
    return this.http.get(`${this.baseUrl}/all`, { headers: this.getHeaders() });
  }

  // ✅ Update Leave Request
  updateLeaveRequest(employeeId: number, payload: any): Observable<any> {
    return this.http.put(
      `${this.adminUrl}/update/${employeeId}`,
      payload,
      { headers: this.getHeaders() }
    );
  }

  // ✅ Add Leave Request
  addLeaveRequest(payload: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/add`,
      payload,
      { headers: this.getHeaders() }
    );
  }

  // ✅ Set Leave Applied
  setLeaveApplied(payload: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}/set-applied`,
      payload,
      { headers: this.getHeaders() }
    );
  }

  // ================= ADMIN SIDE =================

  // ✅ Admin – All Leave Requests
  getAllLeaveRequests(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(
      `${this.adminUrl}/requests`,
      { headers: this.getHeaders() }
    );
  }

  // ✅ Admin – Pending Requests
  getPendingLeaveRequests(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(
      `${this.adminUrl}/pending`,
      { headers: this.getHeaders() }
    );
  }

  // ✅ Admin – Approve / Reject Leave
  updateLeaveStatus(payload: {
    leaveId: number;
    status: 'Approved' | 'Rejected';
    approvedBy: string;
  }): Observable<any> {
    return this.http.put(
      `${this.adminUrl}/action`,
      payload,
      { headers: this.getHeaders() }
    );
  }

  // ✅ Admin – Employee Leave Summary
  getEmployeeLeaveSummary(employeeId: number): Observable<any> {
    return this.http.get(
      `${this.adminUrl}/summary/${employeeId}`,
      { headers: this.getHeaders() }
    );
  }
}
