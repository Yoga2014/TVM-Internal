import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresentEmployeeComponent } from './present-employee.component';

describe('PresentEmployeeComponent', () => {
  let component: PresentEmployeeComponent;
  let fixture: ComponentFixture<PresentEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PresentEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PresentEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
