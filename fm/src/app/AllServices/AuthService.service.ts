import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:8080/login';
  private registerUrl = 'http://localhost:8080/register';

  constructor(private http: HttpClient, private router: Router) {}

  /** 🔹 LOGIN */
  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username, password });
  }

  /** 🔹 REGISTER */
  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.registerUrl, { username, password });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  decodeToken(token: string): any {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (error) {
      return null;
    }
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    const decoded = this.decodeToken(token);
    if (!decoded || !decoded.exp) return true;

    const expiryTime = decoded.exp * 1000; 
    return Date.now() > expiryTime;
  }

  isLoggedIn(): boolean {
    return !!this.getToken() && !this.isTokenExpired();
  }

  generateStaticToken() {
    const header = { alg: 'HS256', typ: 'JWT' };
    const now = Math.floor(Date.now() / 1000); 
    const payload = {
      sub: 'oohn',
      iat: now,
      exp: now + 30, 
    };

    const base64url = (obj: any) =>
      btoa(JSON.stringify(obj))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');

    const token = `${base64url(header)}.${base64url(payload)}.STATIC_SIGNATURE`;
    this.setToken(token);
  }

  isAdmin(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const decoded = this.decodeToken(token);
    return decoded?.role === 'admin';
  }
}
