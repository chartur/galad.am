import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedProductsListComponent } from './featured-products-list.component';

describe('FeaturedProductsListComponent', () => {
  let component: FeaturedProductsListComponent;
  let fixture: ComponentFixture<FeaturedProductsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeaturedProductsListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedProductsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
