import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private apiUrl = 'http://localhost:3001/profile';  // JSON server URL

  constructor(private http: HttpClient) { }

  // Get profile data
  getProfile(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Update profile data
  updateProfile(updatedProfile: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<any>(this.apiUrl, updatedProfile, { headers });
  }
}
