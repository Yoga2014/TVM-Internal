import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalEmployeeComponent } from './total-employee.component';

describe('TotalEmployeeComponent', () => {
  let component: TotalEmployeeComponent;
  let fixture: ComponentFixture<TotalEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalEmployeeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
