import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../shared/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SpinnerComponent } from '../../shared/spinners/spinner/spinner.component';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, SpinnerComponent],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.scss',
})
export class PasswordRecoveryComponent implements OnInit {
  isRecoveringPassword = false;
  temporaryToken: string | null = '';
  form!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private acrivatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    
  ) {}
  ngOnInit(): void {
    this.acrivatedRoute.queryParamMap.subscribe((params) => {
      if (params.has('token')) {
        this.temporaryToken =( params.get('token'));
        this.isRecoveringPassword = true;

        this.form = this.fb.group({
          password: ['', [Validators.required, Validators.minLength(6)]],
          confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        });
      } else {
        this.isRecoveringPassword = false;

        this.form = this.fb.group({
          email: ['', [Validators.required, Validators.email]],
        });
      }
      this.cdRef.detectChanges();
    });
  }

  onSubmit(): void {
    if (this.form.valid){
      if (!this.temporaryToken){
        this.isLoading = true;
        const { email } = this.form.value;
        this.authService.requestPasswordReset(email).subscribe({
          next: () => {
            this.toastr.success(
              'A link to reset your password was sent to your email!'
            );
            this.isLoading = false;
            this.form.reset();
          },
          error: (err) => {
            const message =
              err?.error?.message ||
              'Something went wrong. Please try again later.';
            this.toastr.error(message);
            console.error('Password reset request error:', err);
          },
        });

      } else {
        const { password } = this.form.value;
       
        this.authService.resetPassword({ token: this.temporaryToken, newPassword: password}).subscribe({
          next: () => {
            this.toastr.success(
              'Your password has been reseted successfully!'
            );
            this.form.reset();
            // HERE UPDATE TOKEN
            this.router.navigate(['sign-in']);
          },
          error: (err) => {
            const message =
              err?.error?.message ||
              'Something went wrong. Please try again later.';
            this.toastr.error(message);
            console.error('Password change request error:', err);
          },
        });

      }
    } 
    }
    
  }

