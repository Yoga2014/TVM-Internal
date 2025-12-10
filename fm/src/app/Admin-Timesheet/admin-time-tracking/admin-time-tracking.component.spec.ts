import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTimeTrackingComponent } from './admin-time-tracking.component';

describe('AdminTimeTrackingComponent', () => {
  let component: AdminTimeTrackingComponent;
  let fixture: ComponentFixture<AdminTimeTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTimeTrackingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminTimeTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
