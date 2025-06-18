import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { mapperDto } from '../../shared/utils/mapper-dto';
import { NavigationService } from '../../shared/services/navigation/navigation.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss',
})
export class SubscriptionComponent implements OnInit {
  private membershipType: string = '';
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    public navigateService: NavigationService,
    private toastr: ToastrService
  ) {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      username: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(20),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required, Validators.minLength(6)],
      gender: ['', Validators.required],
      membership: ['', Validators.required],
      role: ['user'],
      wantsEmailUpdates: [false],
      wantsWhatsAppUpdates: [false],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.membershipType = params['type'] || '';

      if (this.membershipType) {
        this.registrationForm.patchValue({
          membership: this.membershipType,
        });
      } else {
        this.registrationForm.patchValue({
          membership: '',
        });
      }
    });
  }

  onSubmit(): void {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.valid) {
      this.authService.removeToken();
      const userDTO = mapperDto(this.registrationForm.value);
      this.authService.register(userDTO).subscribe({
        next: (res: any) => {
          this.toastr.success('User registered successfully!');
          this.registrationForm.reset();
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 2000);
        },
        error: (err: any) => {
          this.toastr.error('Something went wrong');
          console.error(err);
        },
      });
    }
  }

  isInvalid(controlName: string): boolean {
    const control = this.registrationForm.get(controlName);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }

getErrorMessage(controlName: string): string {
  const control = this.registrationForm.get(controlName);
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
