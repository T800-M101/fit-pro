import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { ToastrService } from 'ngx-toastr';
import { RegisterUserDto } from '../dto/register-user';
import { Role } from '../../shared/services/auth/auth-enum';
import { mapperDto } from '../../shared/utils/mapperDto';
import { passwordMatchValidator } from '../../shared/utils/password-match-validator';
import { getErrorMessage, isInvalid } from '../../shared/utils/helpers';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss',
})
export class SubscriptionComponent implements OnInit {
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInputConfirm') passwordInputConfirm!: ElementRef<HTMLInputElement>;

  private membership: string = '';
  registrationForm!: FormGroup;

  isInvalid = isInvalid;
  getErrorMessage = getErrorMessage;


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

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    public navigateService: NavigationService,
    private toastr: ToastrService
  ) {
    
  }

  ngOnInit(): void {
    this.initFormGroup();

    this.route.queryParams.subscribe((params) => {
      this.membership = params['type'] || '';

      if (this.membership) {
        this.registrationForm.patchValue({
          membership: this.membership,
        });
      } else {
        this.registrationForm.patchValue({
          membership: '',
        });
      }
    });
  }

  initFormGroup(): void {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required],
      membership: ['', Validators.required],
      allowEmail: [false],
      allowWhats: [false],
    },
    {
      validators: passwordMatchValidator('password', 'confirmPassword')
    }
  );
  }

  onSubmit(): void {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.valid) {
      this.authService.removeToken();
      const userDTO = mapperDto(this.registrationForm.value, RegisterUserDto);

      this.authService.register(userDTO).subscribe({
        next: (res: any) => {
          const token = res?.token;
          if (token) {
            this.authService.saveToken(token);
          } else {
            console.error('No token received');
          }

          this.toastr.success('User registered successfully!');
          this.registrationForm.reset();
          setTimeout(() => {
            this.router.navigate(['/classes']);
          }, 2000);
        },
        error: (err: any) => {
          this.toastr.error('Something went wrong');
          console.error(err);
        },
      });
    }
  }
}