import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPlaceholderComponent } from './product-placeholder.component';

describe('ProductPlaceholderComponent', () => {
  let component: ProductPlaceholderComponent;
  let fixture: ComponentFixture<ProductPlaceholderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPlaceholderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPlaceholderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
