import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { NavigationService } from '../../services/navigation/navigation.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
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
          const token = response?.token;

          if (token) {
            this.authService.saveToken(token);
            this.router.navigate(['/classes']);
          } else {
            console.error('No token received');
          }
        },
        error: (err) => {
          console.error('Login failed:', err);
        }
      });
    }
  }
}
