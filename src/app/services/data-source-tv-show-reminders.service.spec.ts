import { TestBed } from '@angular/core/testing';

import { DataSourceTvShowRemindersService } from './data-source-tv-show-reminders.service';

describe('DataSourceTvShowRemindersService', () => {
  let service: DataSourceTvShowRemindersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataSourceTvShowRemindersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
