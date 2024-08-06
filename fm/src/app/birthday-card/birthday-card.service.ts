import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from '../Interface/employee.model';


@Injectable({
  providedIn: 'root'
})
export class BirthdayService {

  private apiUrl = 'https://your-api-endpoint.com/api/employees';

  constructor(private http: HttpClient) {}

  getTodayBirthdays(): Observable<Employee[]> {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    return this.http.get<Employee[]>(this.apiUrl).pipe(
      map(employees => employees.filter(emp => emp.dob.slice(5) === todayStr.slice(5)))
    );
  }
}
