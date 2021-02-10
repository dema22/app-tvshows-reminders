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
    this.tvShowReminderService.deleteTvShowReminder(this.data.reminder.idTvShowReminder, this.data.pageIndex, this.data.pageSize).subscribe((responsePageReminders) => {
      let pageReminders : PageResponseReminder = { items:null, pageDescriptionDTO: null};

      // The service returns null, i assign a pageRemider empty object.
      if(responsePageReminders === null){
        responsePageReminders = pageReminders;
      }

      this.communicationService.emitPageReminders(responsePageReminders);
      this.dialogRef.close();
    });
  }
  
  closeDialog() {
    this.dialogRef.close();
  }
}
