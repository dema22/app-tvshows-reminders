import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TvShowBasicInfoSearchBarComponent } from './tv-show-basic-info-search-bar.component';

describe('TvShowBasicInfoSearchBarComponent', () => {
  let component: TvShowBasicInfoSearchBarComponent;
  let fixture: ComponentFixture<TvShowBasicInfoSearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TvShowBasicInfoSearchBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TvShowBasicInfoSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
