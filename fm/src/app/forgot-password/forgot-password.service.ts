import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {
  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}


  getUserByEmailOrPhone(emailOrPhone: string): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.filter(user => user.email === emailOrPhone || user.phone === emailOrPhone))
    );
  }

 
  updateUserPassword(id: string, newPassword: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}`, { password: newPassword });
  }

  
  sendTemporaryOTP(userId: string): Observable<any> {
    const tempOtp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate 6-digit OTP
    return this.http.patch(`${this.apiUrl}/${userId}`, { otp: tempOtp });
  }
}
