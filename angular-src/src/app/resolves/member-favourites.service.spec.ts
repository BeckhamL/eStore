import { TestBed } from '@angular/core/testing';

import { MemberFavouritesService } from './member-favourites.service';

describe('MemberFavouritesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MemberFavouritesService = TestBed.get(MemberFavouritesService);
    expect(service).toBeTruthy();
  });
});
