import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PageResponseReminder } from 'src/app/interfaces/PageResponseReminder';
import { TvShowReminder } from 'src/app/interfaces/TvShowReminder';
import { TvShowReminderEmitted } from 'src/app/interfaces/TvShowReminderEmitted';
import { User } from 'src/app/interfaces/User';
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
              @Inject(MAT_DIALOG_DATA) public data: {reminder: TvShowReminder, pageIndex: number, pageSize: number},
              private tvShowReminderService : TvShowRemindersService,
              private communicationService: CommunicationService) { }

  ngOnInit(): void {
  }

  deleteReminder(){
    this.tvShowReminderService.deleteTvShowReminder(this.data.reminder.idTvShowReminder, this.data.pageIndex, this.data.pageSize).subscribe((reminders) => {
      let reminderList: TvShowReminder[] = [];
      // I emit the reminders array from the service or if it returns null i emit an empty reminder list.
      reminders !== null ? this.communicationService.emitReminderArray(reminders) : this.communicationService.emitReminderArray(reminderList);
      this.dialogRef.close();
    });
  }
  
  closeDialog() {
    this.dialogRef.close();
  }
}
