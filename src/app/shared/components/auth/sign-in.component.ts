import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { getErrorMessage, isInvalid } from '../../utils/helpers';
import { LoginDto } from '../../../features/dto/login.dto';
import { mapperDto } from '../../utils/mapperDto';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  loginForm!: FormGroup;

  isInvalid = isInvalid;
  getErrorMessage = getErrorMessage;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService, 
    private router: Router, 
    private toastr: ToastrService) {
  }
  ngOnInit(): void {
   this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

onSubmit(): void {
    if (this.loginForm.valid) {
      const loginDto = mapperDto(this.loginForm.value, LoginDto);

      this.authService.login(loginDto).subscribe({
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
}
