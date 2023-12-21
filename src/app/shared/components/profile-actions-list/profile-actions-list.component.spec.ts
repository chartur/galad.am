import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileActionsListComponent } from './profile-actions-list.component';

describe('ProfileActionsListComponent', () => {
  let component: ProfileActionsListComponent;
  let fixture: ComponentFixture<ProfileActionsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileActionsListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileActionsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
