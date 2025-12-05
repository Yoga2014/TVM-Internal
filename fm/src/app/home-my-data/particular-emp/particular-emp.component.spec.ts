import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticularEmpComponent } from './particular-emp.component';

describe('ParticularEmpComponent', () => {
  let component: ParticularEmpComponent;
  let fixture: ComponentFixture<ParticularEmpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ParticularEmpComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ParticularEmpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
