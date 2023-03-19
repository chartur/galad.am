import { TestBed } from '@angular/core/testing';
import { CategoriesStore } from "@stores/categories.store";

describe('CategoriesStore', () => {
  let service: CategoriesStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriesStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
