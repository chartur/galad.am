import { TestBed } from '@angular/core/testing';
import { BannerStore } from "@sores/banner.store";


describe('BannerStore', () => {
  let service: BannerStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BannerStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
