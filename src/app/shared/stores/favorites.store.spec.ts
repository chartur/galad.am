import { TestBed } from '@angular/core/testing';
import {FavoritesStore} from "@sores/favorites.store";

describe('FavoritesStore', () => {
  let service: FavoritesStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
