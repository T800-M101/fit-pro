import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router, 
    private toastr: ToastrService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

onSubmit(): void {
    if (this.loginForm.valid) {
      const data = this.loginForm.value;

      this.authService.login(data).subscribe({
        next: (response) => {
          this.toastr.success('User logged in successcully!');
          const token = response?.token;

          if (token) {
            this.authService.saveToken(token);
            this.router.navigate(['/classes']);
          } else {
            this.toastr.error('Wrong credentials');
            console.error('No token received');
          }
        },
        error: (err) => {
          this.toastr.error('Something went wrong.');
          console.error('Login failed:', err);
        }
      });
    }
  }

   isInvalid(controlName: string): boolean {
    const control = this.loginForm.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

  getErrorMessage(controlName: string): string {
    const control = this.loginForm.get(controlName);
    if (!control || !control.errors) return '';

    if (control.errors['required']) {
      switch (controlName) {
        case 'name':
          return 'Name is required';
        case 'username':
          return 'Username is required';
        case 'email':
          return 'Email is required';
        case 'email':
          return 'Phone is required';
        case 'password':
          return 'Password is required';
        case 'confirmPassword':
          return 'Please confirm your password';
        case 'gender':
          return 'Please select a gender';
        case 'membership':
          return 'Please select a membership';
        default:
          return 'This field is required';
      }
    }

    if (control.errors['email']) return 'Invalid email format';

    if (control.errors['minlength']) {
      const requiredLength = control.errors['minlength'].requiredLength;
      return `Minimum length is ${requiredLength} characters`;
    }

    if (control.errors['maxlength']) {
      const requiredLength = control.errors['maxlength'].requiredLength;
      return `Maximum length is ${requiredLength} characters`;
    }

    if (control.errors['pattern']) {
      switch (controlName) {
        case 'phone':
          return 'Phone number must be valid (e.g., +1234567890)';
        default:
          return 'Invalid format';
      }
    }

    return 'Invalid input';
  }

}
