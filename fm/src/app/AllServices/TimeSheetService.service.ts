import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeSheetService {
private baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

getTimesheets(path: string): Observable<any> {
  if (['year','month','weekendDate','employeeName'].includes(path)) {
    return this.http.get(`${this.baseUrl}/${path}`, { responseType: 'text' });
  }
  return this.http.get<any>(`${this.baseUrl}/${path}`);
}




  addTimesheet(path: string, payload: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/${path}`, payload);
  }
}


//http://localhost:8080/api/timesheets