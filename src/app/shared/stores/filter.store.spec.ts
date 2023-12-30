import { TestBed } from '@angular/core/testing';

import { FilterStore } from './filter.store'

describe('FilterService', () => {
  let service: FilterStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
