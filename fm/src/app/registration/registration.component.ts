import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../AllServices/AuthService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {

  registerForm!: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  register() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.errorMessage = 'Please fill all fields';
      return;
    }

    const { username, password, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // Use register API
    this.authService.register(username, password).subscribe({
      next: (res: any) => {
        this.successMessage = 'Registration successful!';
        this.errorMessage = '';
        this.registerForm.reset();
        this.goToLogin(); // navigate after register
      },
      error: (err) => {
        this.errorMessage = err?.error?.message || 'Registration failed';
        this.successMessage = '';
      }
    });
  }

  /** 🔹 Navigate to login page */
  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}
