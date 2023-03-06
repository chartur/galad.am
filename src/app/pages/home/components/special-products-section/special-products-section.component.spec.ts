import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialProductsSectionComponent } from './special-products-section.component';

describe('SpecialProductsSectionComponent', () => {
  let component: SpecialProductsSectionComponent;
  let fixture: ComponentFixture<SpecialProductsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialProductsSectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecialProductsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
