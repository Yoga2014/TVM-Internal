import { Component } from '@angular/core';
import { ForgotPasswordService } from '../AllServices/forgetPasswordService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: false,
 templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {

  emailOrPhone: string = '';
  newPassword: string = '';
  enteredOtp: string = '';
  generatedOtp: string = '';
  errorMessage: string = '';
  successMessage: string = '';
  otpSent: boolean = false;
  isPasswordUpdated: boolean = false;
  otpResendInProgress: boolean = false;


  constructor(private forgotPasswordService: ForgotPasswordService, private router: Router) {}


  verifyEmailOrPhone() {
    this.errorMessage = '';
    this.successMessage = '';
    if (!this.emailOrPhone) {
      this.errorMessage = 'Please enter your email or phone number.';
      return;
    }
    this.forgotPasswordService.getUserByEmailOrPhone(this.emailOrPhone).subscribe(
      (users: string | any[]) => {
        if (users.length === 0) {
          this.errorMessage = 'No user found with that email or phone number.';
        } else {
          const user = users[0];
          this.forgotPasswordService.sendTemporaryOTP(user.id).subscribe(
            (response: { otp: string; }) => {
              this.generatedOtp = response.otp;
              alert(`Temporary OTP sent: ${this.generatedOtp} `);
              this.otpSent = true;
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
    this.successMessage = 'OTP verified successfully. Enter new password.';
    this.isPasswordUpdated = true;
    this.otpSent = false;
  }
  // Step 3: Update password after OTP verification
  resetPassword() {
    this.errorMessage = '';
    this.successMessage = '';

    if (!this.newPassword) {
      this.errorMessage = 'New password is required.';
      return;
    }
    this.forgotPasswordService.getUserByEmailOrPhone(this.emailOrPhone).subscribe(
      (users: string | any[]) => {
        if (users.length === 0) {
          this.errorMessage = 'No user found with that email or phone number.';
        } else {
          const user = users[0]; 

          this.forgotPasswordService.updateUserPassword(user.id, this.newPassword).subscribe(
            () => {
              this.successMessage = 'Password has been updated successfully.';
              alert('Password updated successfully. Please log in again');
              this.router.navigate(['/login']);
              this.emailOrPhone = '';
              this.newPassword = '';
              this.enteredOtp = '';
              this.generatedOtp = '';
              this.otpSent = false;
              this.isPasswordUpdated = false;
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
    this.otpResendInProgress = true;
    this.errorMessage = '';
    this.successMessage = '';
    this.forgotPasswordService.getUserByEmailOrPhone(this.emailOrPhone).subscribe(
      (users: string | any[]) => {
        if (users.length === 0) {
          this.errorMessage = 'No user found with that email or phone number.';
          this.otpResendInProgress = false;
        } else {
          const user = users[0];
          this.forgotPasswordService.sendTemporaryOTP(user.id).subscribe(
            (response: { otp: string; }) => {
              this.generatedOtp = response.otp;
              alert(`New OTP sent: ${this.generatedOtp}`);
              this.otpResendInProgress = false;
            },
            (error: any) => {
              this.errorMessage = 'Error sending new OTP.';
              this.otpResendInProgress = false;
              console.error(error);
            }
          );
        }
      },
      (error: any) => {
        this.errorMessage = 'Error finding user.';
        this.otpResendInProgress = false;
        console.error(error);
      }
    );
  }

}
