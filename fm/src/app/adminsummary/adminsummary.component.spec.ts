import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsummaryComponent } from './adminsummary.component';

describe('AdminsummaryComponent', () => {
  let component: AdminsummaryComponent;
  let fixture: ComponentFixture<AdminsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminsummaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
