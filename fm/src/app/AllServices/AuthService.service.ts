import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import{ API_CONFIG } from '../api-config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = `${API_CONFIG.BASE_URL}/login`;
  private registerUrl = 'http://localhost:8080/register';

  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.loginUrl, { username, password });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  register(username: string, password: string): Observable<any> {
    return this.http.post<any>(this.registerUrl, { username, password });
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
    return Date.now() > decoded.exp * 1000;
  }

isLoggedIn(): boolean {
  const token = this.getToken();
  if (!token) return false;
  return !this.isTokenExpired();
}


 generateStaticToken() {
  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const payload = {
    sub: 'user',
    iat: now,
    exp: now + 6, // 1 minute token
    role: 'user',
  };

  const base64url = (obj: any) =>
    btoa(JSON.stringify(obj))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');

  const token = `${base64url(header)}.${base64url(payload)}.STATIC_SIGNATURE`;
  this.setToken(token);
}

  getUserRole(): string | null {
    // Get role from localStorage (or implement your logic)
    return localStorage.getItem('userRole');
  }
    isAdmin(): boolean {
    return this.getUserRole() === 'admin';
  }
}


