import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { BookingsComponent } from './features/bookings/bookings.component';
import { ClassesComponent } from './features/classes/classes.component';
import { SubscriptionComponent } from './features/subscription/subscription.component';
import { PaymentsComponent } from './features/payments/payments.component';
import { YourSpaceComponent } from './features/your-space/your-space.component';
import { SignInComponent} from './shared/components/sign-in/sign-in.component';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'bookings',
    loadComponent: () =>
      import('./features/bookings/bookings.component').then(
        (m) => m.BookingsComponent
      ),
  },
  {
    path: 'classes',
    loadComponent: () =>
      import('./features/classes/classes.component').then(
        (m) => m.ClassesComponent
      ),
  },
  {
    path: 'your-space',
    loadComponent: () =>
      import('./features/your-space/your-space.component').then(
        (m) => m.YourSpaceComponent
      ),
  },
  {
    path: 'subscription',
    loadComponent: () =>
      import('./features/subscription/subscription.component').then(
        (m) => m.SubscriptionComponent
      ),
  },
  {
    path: 'payments',
    loadComponent: () =>
      import('./features/payments/payments.component').then(
        (m) => m.PaymentsComponent
      ),
  },
 {
    path: 'sign-in',
    loadComponent: () =>
      import('./shared/components/sign-in/sign-in.component').then(
        (m) => m.SignInComponent
      ),
  },
  {
    path: 'pass-recovery',
    loadComponent: () =>
      import('./features/password-recovery/password-recovery.component').then(
        (m) => m.PasswordRecoveryComponent
      ),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
