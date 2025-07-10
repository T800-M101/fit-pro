import {
  AfterViewInit,
  Component,
  computed,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { CountUpComponent } from '../../shared/components/count-up/count-up.component';
import { Router } from '@angular/router';
import { Instructor } from '../../interfaces/instructor.interface';
import { InstructorsService } from '../../shared/services/instructors/instructors.service';
import { UsersService } from '../../shared/services/users/users.service';
import { MembershipService } from '../../shared/services/membership/membership.service';
import { Membership } from '../../interfaces/membership.interface';
import { AuthService } from '../../shared/services/auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CountUpComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  instructors: Instructor[] = [];
  memberships: Membership[] = [];
  totalUsers = 0;
  instructorSubs$ = new Subscription();
  userSubs$ = new Subscription();
  membershipSubs$ = new Subscription();

  shouldDisableSignup = computed(
    () => this.authService.isTokenValid() || this.authService.getToken()
  );

  constructor(
    private router: Router,
    private instructorsService: InstructorsService,
    private usersService: UsersService,
    private membershipService: MembershipService,
    public authService: AuthService
  ) {}

  ngOnDestroy(): void {
    this.instructorSubs$.unsubscribe();
    this.userSubs$.unsubscribe();
    this.membershipSubs$.unsubscribe();
  }

  ngOnInit(): void {
    this.instructorSubs$ = this.instructorsService.getInstructors().subscribe({
      next: (response: any) => {
        this.instructors = response;
      },
      error: (error) => console.error(error),
    });

    this.userSubs$ = this.usersService.getTotalUsers().subscribe({
      next: (count) => (this.totalUsers = count),

      error: (error) => console.error(error),
    });

    this.membershipSubs$ = this.membershipService
      .getMembershipPlans()
      .subscribe({
        next: (response) => {
          this.memberships = response;
        },
        error: (error) => console.error(error),
      });
  }

  ngAfterViewInit() {
    const carousel = document.querySelector('.carousel') as HTMLElement;
    const prevBtn = document.querySelector('.prev-btn') as HTMLButtonElement;
    const nextBtn = document.querySelector('.next-btn') as HTMLButtonElement;

    if (carousel && prevBtn && nextBtn) {
      prevBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: -300, behavior: 'smooth' });
      });

      nextBtn.addEventListener('click', () => {
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
      });

      // Disable buttons when at extremes
      carousel.addEventListener('scroll', () => {
        prevBtn.disabled = carousel.scrollLeft <= 10;
        nextBtn.disabled =
          carousel.scrollLeft >=
          carousel.scrollWidth - carousel.clientWidth - 10;
      });
    }
  }

  goToSubscription(membershipId: number) {
    this.router.navigate(['/subscription'], {
      queryParams: { membershipId },
    });
  }

  getImagePath(photo: string): string {
    return `assets/${photo}`;
  }
}
