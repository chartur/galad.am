import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmallItemCardComponent } from './small-item-card.component';

describe('SmallItemCardComponent', () => {
  let component: SmallItemCardComponent;
  let fixture: ComponentFixture<SmallItemCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmallItemCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SmallItemCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
