import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_CONFIG } from '../api-config';

@Injectable({
  providedIn: 'root'
})
export class TeamProjectService {

  constructor(private http: HttpClient) {}


  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); 
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

 
  getProjects(): Observable<any> {
    return this.http.get(`${API_CONFIG.BASE_URL}/projects`, { headers: this.getAuthHeaders() });
  }


  addProject(body: any): Observable<any> {
    return this.http.post(`${API_CONFIG.BASE_URL}/projects`, body, { headers: this.getAuthHeaders() });
  }


  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${API_CONFIG.BASE_URL}/projects/${id}`, { headers: this.getAuthHeaders() });
  }

searchEmployees(keyword: string) {
  return this.http.get(`${API_CONFIG.BASE_URL}/api/employees/search?keyword=${keyword}`, {
    headers: this.getAuthHeaders()
  });
}

}
