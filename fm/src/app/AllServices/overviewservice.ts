import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface OverviewData {
  totalEmployees: number;
  presentToday: number;
  absentToday: number;
  leaveToday: number;
  newJoinees: number;
  resignations: number;
  departmentCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  private apiUrl = 'https://your-api-endpoint.com/overview'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  getOverviewData(): Observable<OverviewData> {
    return this.http.get<OverviewData>(this.apiUrl);
  }
}
