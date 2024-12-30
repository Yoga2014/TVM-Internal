import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeSheetService {
  private apiUrl = 'http://localhost:8080/api/timesheets';

  constructor(private http: HttpClient) {}

  getTimesheets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTimesheet(timesheet: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, timesheet);
  }
}


//http://localhost:8080/api/timesheets