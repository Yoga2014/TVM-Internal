import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../api-config';
import { OverviewData } from "../Interface/OverviewData";

@Injectable({
  providedIn: 'root'
})
export class OverviewService {
  private apiUrl = `${API_CONFIG.BASE_URL}/api/dashboard`;

  constructor(private http: HttpClient) {}

  getOverviewData(): Observable<OverviewData> {
    // Get token from local storage
    const token = localStorage.getItem('token');  

    // Set headers
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    // Call API with headers
    return this.http.get<OverviewData>(this.apiUrl, { headers });
  }
}
