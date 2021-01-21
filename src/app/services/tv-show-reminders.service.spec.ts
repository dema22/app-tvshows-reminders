import { TestBed } from '@angular/core/testing';

import { TvShowRemindersService } from './tv-show-reminders.service';

describe('TvShowRemindersService', () => {
  let service: TvShowRemindersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TvShowRemindersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
