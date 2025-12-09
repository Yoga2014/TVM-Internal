import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeRequestComponent } from './time-request.component';

describe('TimeRequestComponent', () => {
  let component: TimeRequestComponent;
  let fixture: ComponentFixture<TimeRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeRequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
