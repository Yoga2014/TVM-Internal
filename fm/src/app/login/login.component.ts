import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../AllServices/AuthService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false
})
export class LoginComponent {

  @Output() loginSuccess = new EventEmitter<void>();

  login!: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.login = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  /** 🔹 LOGIN */
  enter(): void {
    if (this.login.invalid) {
      this.login.markAllAsTouched();
      this.errorMessage = 'Please enter username and password.';
      return;
    }

    const { username, password } = this.login.value;

    this.auth.login(username, password).subscribe({
      next: (res: any) => {
        if (res?.token) {
          // localStorage.setItem('token', res.token);
          this.auth.generateStaticToken();
          this.loginSuccess.emit();
          this.router.navigate(['/new-Home']);
        } else {
          this.errorMessage = res.message || 'Invalid username or password';
        }
      },
      error: () => {
        this.errorMessage = 'Login failed. Try again.';
      }
    });
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }

  navigateToForgotPassword(): void {
    this.router.navigate(['/forgot-password']);
  }
}
