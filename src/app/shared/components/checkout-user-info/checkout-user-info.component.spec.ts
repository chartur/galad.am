import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutUserInfoComponent } from './checkout-user-info.component';

describe('CheckoutUserInfoComponent', () => {
  let component: CheckoutUserInfoComponent;
  let fixture: ComponentFixture<CheckoutUserInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckoutUserInfoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CheckoutUserInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
