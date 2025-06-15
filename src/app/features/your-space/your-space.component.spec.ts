import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YourSpaceComponent } from './your-space.component';

describe('PlansComponent', () => {
  let component: YourSpaceComponent;
  let fixture: ComponentFixture<YourSpaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [YourSpaceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(YourSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
