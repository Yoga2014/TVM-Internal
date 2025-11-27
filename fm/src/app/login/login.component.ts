import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../AllServices/AuthService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @Output() loginSuccess = new EventEmitter<void>();

  login!: FormGroup;
  errorMessage = '';
  loading = false;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const savedUsername = localStorage.getItem('username') || '';

    this.login = this.fb.group({
      username: [savedUsername, Validators.required],
      password: ['', Validators.required],
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
          localStorage.setItem('username', username);
          localStorage.setItem('role', res.role);
          this.auth.setToken(res.token);

          this.loginSuccess.emit();
          this.router.navigate(['/new-Home/my-space/overview']);
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
}
