import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { BookingsComponent } from './features/bookings/bookings.component';
import { ClassesComponent } from './features/classes/classes.component';
import { PlansComponent } from './features/plans/plans.component';
import { SubscriptionComponent } from './features/subscription/subscription.component';
import { PaymentsComponent } from './features/payments/payments.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'bookings',
    loadComponent: () => import('./features/bookings/bookings.component').then((m) => m.BookingsComponent),
  },
  {
    path: 'classes',
    loadComponent: () => import('./features/classes/classes.component').then((m) => m.ClassesComponent),
  },
  {
    path: 'plans',
    loadComponent: () => import('./features/plans/plans.component').then((m) => m.PlansComponent),
  },
  {
    path: 'subscription',
    loadComponent: () => import('./features/subscription/subscription.component').then((m) => m.SubscriptionComponent),
  },
  {
    path: 'payments',
    loadComponent: () => import('./features/payments/payments.component').then((m) => m.PaymentsComponent),
  },
  
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];