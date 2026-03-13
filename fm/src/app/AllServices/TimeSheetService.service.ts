import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TimeSheetService {
  private apiUrl = 'http://localhost:8080/api/timesheets';
  private api = 'http://localhost:3000/timesheets';

  constructor(private http: HttpClient) {}
  

 private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getTimesheets(): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl,
      { headers: this.getHeaders() }
    );
  }

  addTimesheet(timesheet: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, timesheet);
  }

    // Update timesheet status (Approve/Reject)
updateTimesheetStatus(
  id: string,
  status: 'Approved' | 'Rejected' | 'Pending',
  reason?: string  , 
  adminname?: string  
): Observable<any> {

  const payload = {
    id: id,
    status: status,
    reason: reason ,  
    adminName: adminname

  };

  return this.http.put(
    `${this.apiUrl}/${id}`,
    payload,
    { headers: this.getHeaders() }
  );
}

deleteTimesheet(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`,{ headers: this.getHeaders() });
}

submit(data: any) {
    return this.http.post(this.api, data);
  }


}


