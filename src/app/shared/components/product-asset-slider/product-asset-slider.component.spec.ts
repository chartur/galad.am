import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductAssetSliderComponent } from './product-asset-slider.component';

describe('ProductAssetSliderComponent', () => {
  let component: ProductAssetSliderComponent;
  let fixture: ComponentFixture<ProductAssetSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductAssetSliderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductAssetSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
