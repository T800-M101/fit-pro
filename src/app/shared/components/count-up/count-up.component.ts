import { Component, ElementRef, input, Signal, signal } from '@angular/core';

@Component({
  selector: 'app-count-up',
  standalone: true,
  template: `<span>{{ count() }}</span>`
})
export class CountUpComponent {
  end = input(0);
  duration = input(2000);

  private countSignal = signal(0);
  count: Signal<number> = this.countSignal;

  private observer!: IntersectionObserver;

  constructor(private elRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.animateCount();
          this.observer.disconnect(); // Disconnect after triggering once
        }
      },
      {
        threshold: 0.5, // Adjust as needed (at least 50% of the element is visible)
      }
    );

    this.observer.observe(this.elRef.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private animateCount() {
    const start = 0;
    const range = this.end() - start;
    const increment = this.end() < 100 ? 1 : Math.ceil(range / 60);
    let current = start;
    const stepTime = Math.abs(Math.floor(this.duration() / (range / increment)));

    const timer = setInterval(() => {
      current += increment;
      if (current >= this.end()) {
        current = this.end();
        clearInterval(timer);
      }
      this.countSignal.set(current);
    }, stepTime);
  }
}
