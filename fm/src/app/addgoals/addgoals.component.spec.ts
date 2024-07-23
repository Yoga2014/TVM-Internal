import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddgoalsComponent } from './addgoals.component';

describe('AddgoalsComponent', () => {
  let component: AddgoalsComponent;
  let fixture: ComponentFixture<AddgoalsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddgoalsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddgoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
