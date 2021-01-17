import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsTvShowComponent } from './details-tv-show.component';

describe('DetailsTvShowComponent', () => {
  let component: DetailsTvShowComponent;
  let fixture: ComponentFixture<DetailsTvShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsTvShowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsTvShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
