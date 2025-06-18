import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookClassModalComponent } from './book-class-modal.component';

describe('BookClassModalComponent', () => {
  let component: BookClassModalComponent;
  let fixture: ComponentFixture<BookClassModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookClassModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookClassModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
