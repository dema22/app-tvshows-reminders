import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowRemindersComponent } from './tv-show-reminders.component';

describe('TvShowRemindersComponent', () => {
  let component: TvShowRemindersComponent;
  let fixture: ComponentFixture<TvShowRemindersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvShowRemindersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShowRemindersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
