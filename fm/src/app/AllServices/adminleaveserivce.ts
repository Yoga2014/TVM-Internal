import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LeaveRequest } from '../Interface/leave-request.model';
import { API_CONFIG } from '../api-config';

@Injectable({
  providedIn: 'root'
})
export class AdminleaveService {

  // ✅ Base URL → http://localhost:8080/api/admin/leave
  private baseUrl = `${API_CONFIG.BASE_URL}/api/admin/leave`;

  constructor(private http: HttpClient) {}

  // ================= COMMON HEADERS =================
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,   // ✅ token attached
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
  //   status: "APPROVED" | "REJECTED",
  //   role: "ADMIN"
  // }
  // =================================================
  updateLeaveRequest(payload: any): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/action`,   // ✅ FIXED URL
      payload,                    // ✅ correct body
      { headers: this.getHeaders() } // ✅ correct headers
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
  getLeaveSummary(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/summary`,
      { headers: this.getHeaders() }
    );
  }

  // =================================================
  // ✅ ADMIN – SINGLE EMPLOYEE SUMMARY
  // GET /api/admin/leave/summary?employeeId=1
  // =================================================
  getEmployeeLeaveSummary(employeeId: number): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/summary?employeeId=${employeeId}`,
      { headers: this.getHeaders() }
    );
  }
}