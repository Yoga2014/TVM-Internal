import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
    private apiUrl = 'http://localhost:3001/Teams';

    constructor(private http: HttpClient) { }

    getEmployees(): Observable<any[]> {
      return this.http.get<any[]>(`${this.apiUrl}`).pipe(
        catchError(this.handleError<any[]>('getEmployees', []))
      );
    }

    private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        console.error(`${operation} failed: ${error.message}`);
        return of(result as T);
      };
    }
}
