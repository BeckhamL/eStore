import { TestBed } from '@angular/core/testing';

import { StoreResolverService } from './store-resolver.service';

describe('StoreResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreResolverService = TestBed.get(StoreResolverService);
    expect(service).toBeTruthy();
  });
});
