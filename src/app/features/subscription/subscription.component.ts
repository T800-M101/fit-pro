import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavigationService } from '../../shared/services/navigation.service';

@Component({
  selector: 'app-subscription',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './subscription.component.html',
  styleUrl: './subscription.component.scss'
})
export class SubscriptionComponent implements OnInit{
  cardType: string = '';

  registrationForm: FormGroup;

  constructor(private fb: FormBuilder, private route: ActivatedRoute) {
    
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
  
  ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    this.cardType = params['type'] || '';

    console.log('Card selected:', this.cardType);

    if (this.cardType) {
      this.registrationForm.patchValue({
        membership: this.cardType
      });
    } else {
      this.registrationForm.patchValue({
        membership: ''
      });
    }
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


