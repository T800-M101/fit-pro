import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

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
import { passwordMatchValidator } from '../../shared/utils/password-match-validator';

@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, SpinnerComponent],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.scss',
})
export class PasswordRecoveryComponent implements OnInit {
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInputConfirm') passwordInputConfirm!: ElementRef<HTMLInputElement>;
  isRecoveringPassword = false;
  temporaryToken: string | null = '';
  form!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private cdRef: ChangeDetectorRef,
    private router: Router
  ) {
  }
  
 ngOnInit(): void {
  this.activatedRoute.queryParamMap.subscribe((params) => {
    this.temporaryToken = params.get('token');
    this.isRecoveringPassword = true;

    if (this.isRecoveringPassword) {
      this.initPasswordResetForm();
    } else {
      this.initEmailForm();
    }
    this.cdRef.detectChanges();
  });
}

private initPasswordResetForm(): void {
  this.form = this.fb.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    confirmPassword: ['', Validators.required]
  }, {
    validators: passwordMatchValidator('password', 'confirmPassword')
  });
}

private initEmailForm(): void {
  this.form = this.fb.group({
    email: ['', [Validators.required, Validators.email]]
  });
}

togglePassword(msg: string) {
  if(msg === 'password') {
    const input = this.passwordInput.nativeElement;
    input.type = input.type === 'password' ? 'text' : 'password';
  } 
  if (msg === 'confirm'){
    const input = this.passwordInputConfirm.nativeElement;
    input.type = input.type === 'password' ? 'text' : 'password';
  }
}

  onSubmit(): void {
    if (this.form.valid){
      this.form.markAllAsTouched();
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

