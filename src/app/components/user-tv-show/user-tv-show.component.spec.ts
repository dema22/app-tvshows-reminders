import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserTvShowComponent } from './user-tv-show.component';

describe('UserTvShowComponent', () => {
  let component: UserTvShowComponent;
  let fixture: ComponentFixture<UserTvShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserTvShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserTvShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
