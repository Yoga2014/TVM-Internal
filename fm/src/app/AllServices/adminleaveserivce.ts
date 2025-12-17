import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaveRequest } from '../Interface/leave-request.model';
import { API_CONFIG } from '../api-config';

@Injectable({
  providedIn: 'root'
})
export class AdminleaveService {

  // 🔴 MUST MATCH BACKEND CONTROLLER
  // @RequestMapping("/api/admin/leave")
  private baseUrl = `${API_CONFIG.BASE_URL}/api/admin/leave`;

  constructor(private http: HttpClient) {}

  // ================= COMMON HEADERS =================
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // =================================================
  // ✅ ADMIN – GET ALL LEAVE REQUESTS
  // GET /api/admin/leave/requests
  // =================================================
  getLeaves(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(
      `${this.baseUrl}/requests`,
      { headers: this.getHeaders() }
    );
  }

  // =================================================
  // ✅ ADMIN – APPROVE / REJECT LEAVE
  // PUT /api/admin/leave/action
  // Payload:
  // {
  //   leaveId: number,
  //   status: "Approved" | "Rejected",
  //   approvedBy: string
  // }
  // =================================================
  updateLeaveRequest(
    leaveId: string,
    status: 'Approved' | 'Rejected',
    approvedBy: string = 'Admin'
  ): Observable<any> {

    const payload = {
      leaveId: Number(leaveId),
      status,
      approvedBy
    };

    return this.http.put(
      `${this.baseUrl}/action`,
      payload,
      { headers: this.getHeaders() }
    );
  }

  // =================================================
  // ✅ ADMIN – DELETE LEAVE REQUEST
  // DELETE /api/admin/leave/{id}
  // =================================================
  deleteLeaveRequest(id: string): Observable<any> {
    return this.http.delete(
      `${this.baseUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  // =================================================
  // ✅ ADMIN – LEAVE SUMMARY (ALL EMPLOYEES)
  // GET /api/admin/leave/summary
  // =================================================
  getLeaveSummary(): Observable<LeaveRequest[]> {
    return this.http.get<LeaveRequest[]>(
      `${this.baseUrl}/summary`,
      { headers: this.getHeaders() }
    );
  }


  getEmployeeLeaveSummary(employeeId: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/summary/${employeeId}`,
      { headers: this.getHeaders() }
    );
  }
}
