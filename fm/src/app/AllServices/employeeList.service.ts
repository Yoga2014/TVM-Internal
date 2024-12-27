import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Employee } from '../Interface/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeTeamService {
  private apiUrl = 'http://localhost:3001/EmployeeList';  // Ensure this URL is correct

  constructor(private http: HttpClient) { }

  getTeamData(): Observable<Employee[]> {
  return this.http.get<Employee[]>(`${this.apiUrl}`)
      .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse) 
  {
    let errorMessage = 'An unknown error occurred!';

    if (error.error instanceof ErrorEvent) 
      {
      // Client-side or network error occurred
      errorMessage = `Error: ${error.error.message}`;
    } 
    else 
    {
      // Backend returned an unsuccessful response code
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
