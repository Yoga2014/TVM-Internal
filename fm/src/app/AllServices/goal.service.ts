import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Goal, Comment } from '../Interface/Goals.model';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private apiUrl = 'http://localhost:3001/Goals';
  private goalsUpdated = new Subject<void>();

  constructor(private http: HttpClient) { }

  getGoals(): Observable<Goal[]> {
    return this.http.get<Goal[]>(this.apiUrl);
  }

  getGoalById(id: number): Observable<Goal> {
    return this.http.get<Goal>(`${this.apiUrl}/${id}`).pipe(
      tap((goal) => console.log('Fetched goal:', goal)),
      catchError(this.handleError<Goal>(`getGoalById id=${id}`))
    );
  }

  addGoal(goal: Goal): Observable<Goal> {
    return this.http.post<Goal>(this.apiUrl, goal).pipe(
      map((newGoal: Goal) => {
        this.goalsUpdated.next(); // Notify about the new goal
        return newGoal;
      })
    );
  }

  updateGoal(id: number, goal: Goal): Observable<Goal> {
    return this.http.put<Goal>(`${this.apiUrl}/${id}`, goal).pipe(
      map((updatedGoal: Goal) => {
        this.goalsUpdated.next(); // Notify about the update
        return updatedGoal;
      })
    );
  }

  deleteGoal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      map(() => {
        this.goalsUpdated.next(); // Notify about the deletion
      })
    );
  }

  getGoalsUpdatedListener(): Observable<void> {
    return this.goalsUpdated.asObservable();
  }

  getComments(goalId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/goals/${goalId}/comments`);
  }

  addComment(goalId: number, comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}/goals/${goalId}/comments`, comment);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);
      return throwError(() => error);
    };
  }
}
