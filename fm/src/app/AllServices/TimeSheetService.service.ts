import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  private apiUrl = 'http://localhost:3011/timesheet';

  constructor(private http: HttpClient) {}

  getTimesheets(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  updateDailyHours(employeeId: string, date: Date, hours: number): Observable<any> {
    const payload = { employeeId, date, hours };
    return this.http.post<any>(`${this.apiUrl}/updateDailyHours`, payload);
  }

  getWeeklyTimesheets(employeeId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/weekly?employeeId=${employeeId}`);
  }

  getTimesheetsByDateRange(startDate: Date, endDate: Date): Observable<any[]> {
    const params = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString()
    };
    
    return this.http.get<any[]>(`${this.apiUrl}/byDateRange`, { params });
  }
}
