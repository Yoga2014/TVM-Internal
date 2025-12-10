import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './AuthService.service';

@Injectable({
  providedIn: 'root'
})
export class LoginRouteGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

canActivate(): boolean {
  if (this.authService.isLoggedIn()) {
    this.router.navigate(['/new-home']);
    return false;
  }
  return true;
}

}
