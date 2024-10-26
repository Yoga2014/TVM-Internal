import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user = {
    email: '',
    phone: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (!this.user.email || !this.user.phone || !this.user.password) {
      alert('failed register')
      this.errorMessage = 'All fields are required';
      return;
      
    }

    this.authService.register(this.user).subscribe(
      () => {
        alert('Registeration Success now complete your form')
        this.router.navigate(['/personalDataForm']);
      },
      (error) => {
        this.errorMessage = 'Error during registration. Try again later.';
      }
    );
  }

  tologin() {
    this.router.navigate(['/login']);
  }
}
