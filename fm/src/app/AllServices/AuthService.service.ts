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
  login(emailOrPhone: string, password: string): Observable<any> {
  return this.http.get<any[]>(this.apiUrl).pipe(
    map(users => {
    console.log("AuthService login called with:", emailOrPhone, password)
      const user = users.find(u =>
        (u.useremail === emailOrPhone || u.phone === emailOrPhone) &&
        u.password === password
      );

      if (!user) return null;

      // Return only required fields
      return {
        id: user.id,
        username: user.username || "",
        useremail: user.email || "",
        role: user.role || "user",
        token: "mock-jwt-token-" + user.id
      };
    })
  );
}

  register(user: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, user);
  }
  logout() {
    this.userRole = null;
    localStorage.removeItem('userRole');
    this.router.navigate(['/login']);
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