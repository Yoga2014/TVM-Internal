import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeSheetService {
  private apiUrl = 'http://localhost:3030/timesheetEntries';

  constructor(private http: HttpClient) {}

  getTimesheets(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTimesheet(timesheet: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, timesheet);
  }

    // Update timesheet status (Approve/Reject)
  updateTimesheetStatus(id: string, status: 'Approved' | 'Rejected' | 'Pending'): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(entries => entries.find(e => e.id === id)),
      switchMap(entry => {
        if (!entry) throw new Error('Entry not found');
        entry.status = status;
        return this.http.put<any>(`${this.apiUrl}/${id}`, entry);
      })
    );
  }

deleteTimesheet(id: string): Observable<any> {
  return this.http.delete(`${this.apiUrl}/${id}`);
}


}


//http://localhost:8080/api/timesheets