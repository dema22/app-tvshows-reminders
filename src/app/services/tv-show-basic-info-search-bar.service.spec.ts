import { TestBed } from '@angular/core/testing';

import { TvShowBasicInfoSearchBarService } from './tv-show-basic-info-search-bar.service';

describe('TvShowBasicInfoSearchBarService', () => {
  let service: TvShowBasicInfoSearchBarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvShowBasicInfoSearchBarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
