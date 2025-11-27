import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminrequestComponent } from './adminrequest.component';

describe('AdminrequestComponent', () => {
  let component: AdminrequestComponent;
  let fixture: ComponentFixture<AdminrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminrequestComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
