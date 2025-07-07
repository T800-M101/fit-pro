import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
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
import { passwordMatchValidator } from '../../shared/utils/password-match-validator';
import { getErrorMessage, isInvalid } from '../../shared/utils/helpers';
import { MembershipService } from '../../shared/services/membership/membership.service';
import { MembershipPlan } from '../../interfaces/membershipPlan.interface';
import { Subscription } from 'rxjs';
import { DurationService } from '../../shared/services/duration/duration.service';
import { Duration } from '../../interfaces/duration.interface';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss',
})
export class SubscriptionComponent implements OnInit, OnDestroy {
  @ViewChild('passwordInput') passwordInput!: ElementRef<HTMLInputElement>;
  @ViewChild('passwordInputConfirm')
  passwordInputConfirm!: ElementRef<HTMLInputElement>;

  private membershipId!: number;
  membershipPlans!: MembershipPlan[];
  registrationForm!: FormGroup;
  routeSubs$ = new Subscription();
  membershipSubs$ = new Subscription();
  authSubs$ = new Subscription();
  durationSubs$ = new Subscription();
  durations!: Duration[];

  isInvalid = isInvalid;
  getErrorMessage = getErrorMessage;

  togglePassword(msg: string): void {
    if (msg === 'password') {
      const input = this.passwordInput.nativeElement;
      input.type = input.type === 'password' ? 'text' : 'password';
    }
    if (msg === 'confirm') {
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
    private membershipService: MembershipService,
    private toastr: ToastrService,
    private durationService: DurationService
  ) {}

  ngOnDestroy(): void {
    this.routeSubs$.unsubscribe();
    this.membershipSubs$.unsubscribe();
    this.authSubs$.unsubscribe();
    this.durationSubs$.unsubscribe();
  }

  ngOnInit(): void {
    this.routeSubs$ = this.route.queryParams.subscribe((params) => {
      if (params && params['membershipId']) {
        this.membershipId = params['membershipId'];
      }
      this.initFormGroup();

      if (this.membershipId) {
        this.registrationForm.patchValue({
          membershipId: this.membershipId,
        });
      }
      this.getMembershipPlans();
      this.getMembershipDurations();
    });
  }

  initFormGroup(): void {
    this.registrationForm = this.fb.group(
      {
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        phone: [
          '',
          [Validators.required, Validators.pattern(/^\+?[0-9]{7,15}$/)],
        ],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required, Validators.minLength(6)]],
        gender: ['', Validators.required],
        membershipId: [this.membershipId ?? '', Validators.required],
        durationId: ['', Validators.required],
        allowEmail: [true],
        allowWhatsApp: [true],
      },
      {
        validators: passwordMatchValidator('password', 'confirmPassword'),
      }
    );
  }

  getMembershipPlans(): void {
    this.membershipSubs$ = this.membershipService
      .getMembershipPlans()
      .subscribe({
        next: (data) => {
          this.membershipPlans = data;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  getMembershipDurations(): void {
    this.durationSubs$ = this.durationService.getDurations().subscribe({
      next: (data: Duration[]) => {
        this.durationService.durations.set(data);
        this.durations = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  onSubmit(): void {
    //this.registrationForm.markAllAsTouched();
    if (this.registrationForm.invalid) return;
    const { confirmPassword, ...createUserDto } = this.registrationForm.value;

    this.authService.removeToken();

    this.authSubs$ = this.authService.register(createUserDto).subscribe({
      next: (response: any) => {
        this.toastr.success('User registered successfully!');
        const token = response?.token;
        if (token) {
          this.authService.saveToken(token);
        } else {
          console.error('No token received');
        }
        this.router.navigate(['/payments'], {
          state: {
            membershipName: response.membershipName,
            price: response.membershipPrice,
            durationId: this.registrationForm.value.durationId,
          },
        });
        this.registrationForm.reset();
      },
      error: (err: any) => {
        this.toastr.error('Something went wrong');
        console.error(err);
      },
    });
  }
}
