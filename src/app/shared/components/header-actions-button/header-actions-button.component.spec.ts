import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderActionsButtonComponent } from './header-actions-button.component';

describe('HeaderActionsButtonComponent', () => {
  let component: HeaderActionsButtonComponent;
  let fixture: ComponentFixture<HeaderActionsButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderActionsButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderActionsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
