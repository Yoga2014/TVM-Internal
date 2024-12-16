import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceDeatilsComponent } from './reference-deatils.component';

describe('ReferenceDeatilsComponent', () => {
  let component: ReferenceDeatilsComponent;
  let fixture: ComponentFixture<ReferenceDeatilsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenceDeatilsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReferenceDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
