import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeMyDataComponent } from './time-my-data.component';

describe('TimeMyDataComponent', () => {
  let component: TimeMyDataComponent;
  let fixture: ComponentFixture<TimeMyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimeMyDataComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TimeMyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
