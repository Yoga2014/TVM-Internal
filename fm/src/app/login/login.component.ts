import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from '../AllServices/AuthService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone:false
})
export class LoginComponent {
  @Output() loginSuccess = new EventEmitter<void>(); // Emit event on successful login

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
        // Save logged-in data
        localStorage.setItem('userId', user.id);
        localStorage.setItem('username', user.username);
        localStorage.setItem('useremail', user.useremail);
        localStorage.setItem('userRole', user.role);
        localStorage.setItem('token', user.token);

        // Reset form
        this.emailOrPhone = '';
        this.password = '';

        // Emit success event
        this.loginSuccess.emit();

        // Navigate to Home
        this.router.navigate(['/new-Home']);
      } else {
        this.errorMessage = 'Invalid credentials';
      }
    },
    (error) => {
      console.error('Login error:', error);
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
