import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReminderDialogComponent } from './delete-reminder-dialog.component';

describe('DeleteReminderDialogComponent', () => {
  let component: DeleteReminderDialogComponent;
  let fixture: ComponentFixture<DeleteReminderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteReminderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteReminderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
