import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeLogService {
  private baseUrl = 'http://localhost:3005/projects';
  private timeLogUrl = 'http://localhost:3005/timeLogs';

  constructor(private http: HttpClient) {}

 
  getProjects(): Observable<any> {
    return this.http.get(this.baseUrl);
  }

  
  saveTimeLog(timeLog: any): Observable<any> {
    return this.http.post(this.timeLogUrl, timeLog);
  }

  getTimeLogs(): Observable<any> {
    return this.http.get(this.timeLogUrl);
  }
}
