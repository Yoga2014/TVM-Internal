import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../auth.service';
import { ForgotPasswordService } from './forgot-password.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent { 
  emailOrPhone: string = '';
  newPassword: string = '';
  enteredOtp: string = '';
  generatedOtp: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  otpSent: boolean = false;
  passwordUpdated: boolean = false; // Flag to check if password is updated
  otpResendInProgress: boolean = false; // Flag to manage resend OTP state

  constructor(private forgotPasswordService: ForgotPasswordService, private router: Router) {}

  // First step: Find user by email or phone, send OTP
  verifyEmailOrPhone() {
    this.errorMessage = '';
    this.successMessage = '';
    if (!this.emailOrPhone) {
      this.errorMessage = 'Please enter your email or phone number.';
      return;
    }

    // Find the user by email or phone
    this.forgotPasswordService.getUserByEmailOrPhone(this.emailOrPhone).subscribe(
      (users: string | any[]) => {
        if (users.length === 0) {
          this.errorMessage = 'No user found with that email or phone number.';
        } else {
          const user = users[0]; // Assuming email or phone number is unique

          // Generate and send OTP to the user's account
          this.forgotPasswordService.sendTemporaryOTP(user.id).subscribe(
            (response: { otp: string; }) => {
              this.generatedOtp = response.otp;
              alert(`Temporary OTP sent: ${this.generatedOtp} `); // Show OTP in alert
              this.otpSent = true; // Set flag to allow OTP verification
            },
            (error: any) => {
              this.errorMessage = 'Error sending OTP.';
              console.error(error);
            }
          );
        }
      },
      (error: any) => {
        this.errorMessage = 'Error finding user.';
        console.error(error);
      }
    );
  }

  // Step 2: Verify OTP and allow new password entry
  verifyOtp() {
    if (this.enteredOtp !== this.generatedOtp) {
      this.errorMessage = 'Incorrect OTP. Please try again.';
      return;
    }

    // OTP is correct, allow user to reset the password
    this.successMessage = 'OTP verified successfully. Enter new password.';
    this.passwordUpdated = true; // Allow password update step
    this.otpSent = false; // Hide OTP input
  }

  // Step 3: Update password after OTP verification
  resetPassword() {
    this.errorMessage = '';
    this.successMessage = '';

    // Validate new password input
    if (!this.newPassword) {
      this.errorMessage = 'New password is required.';
      return;
    }

    // Find the user again to update the password
    this.forgotPasswordService.getUserByEmailOrPhone(this.emailOrPhone).subscribe(
      (users: string | any[]) => {
        if (users.length === 0) {
          this.errorMessage = 'No user found with that email or phone number.';
        } else {
          const user = users[0]; // Assuming email or phone number is unique

          // Update the user's password
          this.forgotPasswordService.updateUserPassword(user.id, this.newPassword).subscribe(
            () => {
              this.successMessage = 'Password has been updated successfully.';
              alert('Password updated successfully. Please log in again'); // Display success message
              this.router.navigate(['/login']); // Redirect to login page
              this.emailOrPhone = '';
              this.newPassword = '';
              this.enteredOtp = '';
              this.generatedOtp = '';
              this.otpSent = false;
              this.passwordUpdated = false;
            },
            (error: any) => {
              this.errorMessage = 'Error updating password.';
              console.error(error);
            }
          );
        }
      },
      (error: any) => {
        this.errorMessage = 'Error finding user.';
        console.error(error);
      }
    );
  }

  // Resend OTP function
  resendOtp() {
    this.otpResendInProgress = true; // Disable the button during OTP resend
    this.errorMessage = '';
    this.successMessage = '';

    // Find the user by email or phone
    this.forgotPasswordService.getUserByEmailOrPhone(this.emailOrPhone).subscribe(
      (users: string | any[]) => {
        if (users.length === 0) {
          this.errorMessage = 'No user found with that email or phone number.';
          this.otpResendInProgress = false; // Re-enable the button
        } else {
          const user = users[0]; // Assuming email or phone number is unique

          // Generate and send a new OTP
          this.forgotPasswordService.sendTemporaryOTP(user.id).subscribe(
            (response: { otp: string; }) => {
              this.generatedOtp = response.otp;
              alert(`New OTP sent: ${this.generatedOtp}`); // Show new OTP in alert
              this.otpResendInProgress = false; // Re-enable the button
            },
            (error: any) => {
              this.errorMessage = 'Error sending new OTP.';
              this.otpResendInProgress = false; // Re-enable the button
              console.error(error);
            }
          );
        }
      },
      (error: any) => {
        this.errorMessage = 'Error finding user.';
        this.otpResendInProgress = false; // Re-enable the button
        console.error(error);
      }
    );
  }}