import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CheckinCheckoutService {
  private apiUrl = 'http://localhost:3000/shifts';

  constructor(private http: HttpClient) {}

  // Get the latest shift (sorted by ID, descending order)
  getLatestShift(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}?_sort=id&_order=desc&_limit=1`);
  }

  // Create a new shift with check-in time
  checkIn(checkInTime: string): Observable<any> {
    const shiftData = { checkInTime, checkOutTime: null };
    return this.http.post<any>(this.apiUrl, shiftData);
  }

  // Update an existing shift with check-out time
  checkOut(shiftId: number, checkOutTime: string): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${shiftId}`, { checkOutTime });
  }
}
