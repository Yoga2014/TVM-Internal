import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTimeSummaryComponent } from './admin-time-summary.component';

describe('AdminTimeSummaryComponent', () => {
  let component: AdminTimeSummaryComponent;
  let fixture: ComponentFixture<AdminTimeSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTimeSummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminTimeSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
