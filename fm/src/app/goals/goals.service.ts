import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalsService {

  private apiUrl = 'http://localhost:3001/Goals'; // Replace with your actual JSON server URL

  constructor(private http: HttpClient) { }

  addGoal(goal: any): Observable<any> {
    return this.http.post(this.apiUrl, goal);
  }

  getGoals(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  deleteGoal(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
