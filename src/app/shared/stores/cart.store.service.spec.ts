import { TestBed } from '@angular/core/testing';

import { CartStoreService } from './cart.store.service';

describe('CartStoreService', () => {
  let service: CartStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
