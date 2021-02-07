import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TvShowReminder } from 'src/app/interfaces/TvShowReminder';
import { UserTvShowEntity } from 'src/app/interfaces/UserTvShowEntity';
import { CommunicationService } from 'src/app/services/communication.service';
import { TvShowRemindersService } from 'src/app/services/tv-show-reminders.service';

@Component({
  selector: 'app-delete-reminder-dialog',
  templateUrl: './delete-reminder-dialog.component.html',
  styleUrls: ['./delete-reminder-dialog.component.css']
})
export class DeleteReminderDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteReminderDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {reminder: TvShowReminder, idTvShow: number, userTvShow:  UserTvShowEntity},
              private tvShowReminderService : TvShowRemindersService,
              private communicationService: CommunicationService) { }

  ngOnInit(): void {
  }

  deleteReminder(){
    this.tvShowReminderService.deleteTvShowReminder(this.data.reminder.idTvShowReminder).subscribe(() => {
      this.communicationService.emitChangeWhenDeletingReminder(this.data.reminder);
      this.dialogRef.close();
    });
  }
  
  closeDialog() {
    this.dialogRef.close();
  }
}
