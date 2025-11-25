import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeTrackingMyDataComponent } from './time-tracking-my-data.component';

describe('TimeTrackingMyDataComponent', () => {
  let component: TimeTrackingMyDataComponent;
  let fixture: ComponentFixture<TimeTrackingMyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeTrackingMyDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeTrackingMyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
