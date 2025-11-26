import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../AllServices/AuthService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent implements OnInit {
  @Output() loginSuccess = new EventEmitter<void>();

  login!: FormGroup;
  errorMessage: string = '';
  loading: boolean = false;


  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.login = this.fb.group({
      username: ['oohn', Validators.required],
      password: ['2234', Validators.required],
    });
  }

enter(): void {
  if (this.login.invalid) {
    this.login.markAllAsTouched();
    this.errorMessage = 'Please enter username and password.';
    return;
  }

  this.loading = true; 
  const { username, password } = this.login.value;
  this.auth.login(username, password).subscribe({
    next: (res: any) => {
      this.loading = false; 

      if (res?.token) {
        this.auth.setToken(res.token);
        this.loginSuccess.emit();
        this.router.navigate(['/new-Home']);
      } else {
        this.errorMessage = res.error || 'Invalid username or password';
      }
    },
    error: () => {
      this.loading = false;
      this.errorMessage = 'Login failed. Try again.';
    },
  });
}

    navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
