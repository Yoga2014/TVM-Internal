import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  emailOrPhone: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    if (!this.emailOrPhone || !this.password) {
      this.errorMessage = 'Email/Phone and password are required';
      return;
    }

    this.authService.login(this.emailOrPhone, this.password).subscribe(
      (user) => {
        if (user) {
          localStorage.setItem('userRole', user.role);
          alert("Login success");
          this.emailOrPhone = '';
          this.password = '';
          this.router.navigate(['/new-Home']);
        } else {
          this.errorMessage = 'Invalid credentials';
        }
      },
      (error) => {
        this.errorMessage = 'Error logging in. Please try again.';
      }
    );
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }

  navigateToForgotPassword() {
    this.router.navigate(['/forgot-password']);
  }
}
