import { Component, ElementRef, Input, input, Signal, signal } from '@angular/core';

@Component({
  selector: 'app-count-up',
  standalone: true,
  template: `<span>{{ count() }}</span>`
})
export class CountUpComponent {
  private _end = 0;
  private _duration = 2000;

  @Input()
  set end(value: number) {
    this._end = value;
    if (this.observer && this.elRef.nativeElement) {
      // Re-observe if new value comes in
      this.observer.observe(this.elRef.nativeElement);
    }
  }

  @Input()
  set duration(value: number) {
    this._duration = value;
  }

  private countSignal = signal(0);
  count: Signal<number> = this.countSignal;

  private observer!: IntersectionObserver;

  constructor(private elRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.animateCount();
          this.observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    this.observer.observe(this.elRef.nativeElement);
  }

  private animateCount() {
    const start = 0;
    const end = this._end;
    const duration = this._duration;
    const startTime = performance.now();

    const step = (timestamp: number) => {
      const progress = Math.min((timestamp - startTime) / duration, 1);
      this.countSignal.set(Math.floor(progress * (end - start) + start));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }
}


