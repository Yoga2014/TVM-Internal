import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users';
  private userRole: string | null = null;
  constructor(private http: HttpClient, private router: Router) {}
  // login(username: string, password: string): Observable<boolean> {
  //   return this.http.get<any[]>(`${this.baseUrl}?username=${username}&password=${password}`).pipe(
  //     map((users) => {
  //       if (users.length > 0) {
  //         const user = users[0];
  //         this.userRole = user.role;
  //         localStorage.setItem('userRole', user.role);
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     })
  //   );
  // }
  
  login(emailOrPhone: string, password: string): Observable<any> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => users.find(user => 
        (user.email === emailOrPhone || user.phone === emailOrPhone) && user.password === password
      ) || null)
    );
  }
  register(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
  logout() {
    localStorage.removeItem('userRole'); // or sessionStorage
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }
  isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }
  isUser(): boolean {
    return this.getUserRole() === 'user';
  }
}