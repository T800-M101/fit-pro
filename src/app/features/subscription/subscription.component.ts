import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavigationService } from '../../shared/services/navigation.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss'
})
export class SubscriptionComponent {
  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router, private navigationService: NavigationService) {
    
    this.registrationForm = this.fb.group({
      name: ['', ],
      username: ['', ],
      email: ['',],
      phone: ['',],
      gender: ['', ],
      membership: ['', ],
      password: ['', ],
      confirmPassword: ['', ],
      wantsEmailUpdates: [false],
      wantsWhatsAppUpdates: [false]
    });
  }

  onSubmit(): void {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.valid) {
      this.registrationForm.reset();
    } else {
    }
  }
}


