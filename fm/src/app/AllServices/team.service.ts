import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { API_CONFIG } from '../api-config';
@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private apiUrl = `${API_CONFIG.BASE_URL}/api/teams`; // ✅ lowercase

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // ✅ get all teams
  getTeams(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  // ✅ get employees by team
  getEmployeesByTeam(teamName: string): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/${teamName}`,
      { headers: this.getHeaders() }
    );
  }
}
