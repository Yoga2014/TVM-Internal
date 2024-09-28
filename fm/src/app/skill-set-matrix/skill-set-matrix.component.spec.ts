import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillSetMatrixComponent } from './skill-set-matrix.component';

describe('SkillSetMatrixComponent', () => {
  let component: SkillSetMatrixComponent;
  let fixture: ComponentFixture<SkillSetMatrixComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillSetMatrixComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkillSetMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
