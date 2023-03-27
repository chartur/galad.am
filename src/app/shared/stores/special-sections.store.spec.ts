import { TestBed } from '@angular/core/testing';
import { SpecialSectionsStore } from './special-sections.store';


describe('SpecialSectionsStore', () => {
  let service: SpecialSectionsStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialSectionsStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
