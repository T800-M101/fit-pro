import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CountUpComponent } from '../../shared/components/count-up/count-up.component';
import { Router } from '@angular/router';
import { Instructor } from '../../interfaces/instructor.interface';
import { InstructorsService } from '../../shared/services/instructors/instructors.service';
import { UsersService } from '../../shared/services/users/users.service';
import { MembershipService } from '../../shared/services/membership/membership.service';
import { Membership } from '../../interfaces/membership.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CountUpComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, AfterViewInit {
  instructors: Instructor[] = [];
  memberships: Membership[] = [];
  totalUsers = 0;

  constructor(
    private router: Router,
    private instructorsService: InstructorsService,
    private usersService: UsersService,
    private membershipService: MembershipService
  ) {}

  ngOnInit(): void {
    this.instructorsService
      .getInstructors()
      .subscribe((data) => (this.instructors = data));
    this.usersService
      .getTotalUsers()
      .subscribe((count) => (this.totalUsers = count));
    this.membershipService
      .getMembershipPlans()
      .subscribe((data) => (this.memberships = data));
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

  goToSubscription(cardType: string) {
    this.router.navigate(['/subscription'], {
      queryParams: { type: cardType },
    });
  }
}
