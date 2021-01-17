import { TestBed } from '@angular/core/testing';

import { TvShowBasicInfoStoreService } from './tv-show-basic-info-store.service';

describe('TvShowBasicInfoStoreService', () => {
  let service: TvShowBasicInfoStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvShowBasicInfoStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
