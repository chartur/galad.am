import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalProductItemComponent } from './vertical-product-item.component';

describe('VerticalProductItemComponent', () => {
  let component: VerticalProductItemComponent;
  let fixture: ComponentFixture<VerticalProductItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalProductItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerticalProductItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
