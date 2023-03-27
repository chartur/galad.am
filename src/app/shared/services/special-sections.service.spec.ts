import { TestBed } from '@angular/core/testing';

import { SpecialSectionsService } from './special-sections.service';

describe('SpecialSectionsService', () => {
  let service: SpecialSectionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialSectionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
