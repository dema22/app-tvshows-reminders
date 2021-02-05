import { TestBed } from '@angular/core/testing';

import { UserTvShowService } from './user-tv-show.service';

describe('UserTvShowService', () => {
  let service: UserTvShowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTvShowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
