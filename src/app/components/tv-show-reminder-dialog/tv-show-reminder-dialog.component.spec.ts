import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowReminderDialogComponent } from './tv-show-reminder-dialog.component';

describe('TvShowReminderDialogComponent', () => {
  let component: TvShowReminderDialogComponent;
  let fixture: ComponentFixture<TvShowReminderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvShowReminderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShowReminderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
