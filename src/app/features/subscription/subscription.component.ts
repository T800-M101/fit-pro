import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth/auth.service';
import { mapperDto } from '../../../helpers/mapper-dto';
import { NavigationService } from '../../shared/services/navigation/navigation.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss',
})
export class SubscriptionComponent implements OnInit {
  membershipType: string = '';

  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    public navigateService: NavigationService 
  ) {
    this.registrationForm = this.fb.group({
      name: [''],
      username: [''],
      email: [''],
      phone: [''],
      password: [''],
      gender: [''],
      membership: [''],
      confirmPassword: [''],
      wantsEmailUpdates: [false],
      wantsWhatsAppUpdates: [false],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.membershipType = params['type'] || '';

      console.log('Card selected:', this.membershipType);

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
      this.authService.register(userDTO)
          .subscribe({
            next: (res: any) => {
              this.router.navigate(['/']);
              this.registrationForm.reset();
            },
            error: (err: any) => console.error(err)
            });
    } 
  }
}
