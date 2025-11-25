import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppraisalService {
  private apiUrl = 'http://localhost:3012/appraisals'; 

  constructor(private http: HttpClient) {}

  getAppraisals(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  getAppraisalById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  addAppraisal(appraisalData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, appraisalData);
  }

  updateAppraisal(id: number, appraisalData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, appraisalData);
  }

  deleteAppraisal(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}