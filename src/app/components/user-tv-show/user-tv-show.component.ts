import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TvShowReminder } from 'src/app/interfaces/TvShowReminder';
import { TvShowReminderEmitted } from 'src/app/interfaces/TvShowReminderEmitted';
import { User } from 'src/app/interfaces/User';
import { UserTvShowEntity } from 'src/app/interfaces/UserTvShowEntity';
import { UserTvShowPatchDTO } from 'src/app/interfaces/UserTvShowPatchDTO';
import { AuthStoreService } from 'src/app/services/auth-store.service';
import { CommunicationService } from 'src/app/services/communication.service';
import { UserTvShowService } from 'src/app/services/user-tv-show.service';
import { TvShowReminderDialogComponent } from '../tv-show-reminder-dialog/tv-show-reminder-dialog.component';

@Component({
  selector: 'app-user-tv-show',
  templateUrl: './user-tv-show.component.html',
  styleUrls: ['./user-tv-show.component.css']
})
// Done.
export class UserTvShowComponent implements OnInit {
  createdUserTvShowForm: FormGroup;

  constructor(private communicationService: CommunicationService,
              private userTvShowService: UserTvShowService,
              private authStore: AuthStoreService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data : {reminder: TvShowReminder},
              public dialogRef: MatDialogRef<UserTvShowComponent>) { }

  ngOnInit(): void {
    // We load the user tv show information on the form. We are going to update it.
    if(this.data.reminder){
      //console.log("we will update the user tv show.");
      this.createdUserTvShowForm = this.formBuilder.group({
        nameTvShow: [this.data.reminder.userTvShowDTO.nameTvShow, Validators.required], 
        genre: [this.data.reminder.userTvShowDTO.genre],
        productionCompany: [this.data.reminder.userTvShowDTO.productionCompany]
      });
    }else{
      // We intialized an empty form to created a user tv show.
      this.createdUserTvShowForm = this.formBuilder.group({
        nameTvShow: ['', Validators.required], 
        genre: [''],
        productionCompany: ['']
      });
    }
  }

  // If we get a data object with a reminder, it means we already have a reminder with a user tv show. We are going to update it.
  // If not we are going to created a user tv show.
  onSubmit() {
    if(this.data.reminder !== null)
      this.updateUserTvShow();
    else
      this.createdUserTvShow();
  }

  // We created the patch object
  // We send it to the service, to update the user tv show with the new information.
  // Once we finish with the update, we add this new information to the reminder we have, and finally
  // we emit the reminder through the communication service and we close the dialog.

  updateUserTvShow(){
    //console.log("We update a user tv show");
    //console.log(this.data.reminder);
    
    let userTvShowToUpdate: UserTvShowPatchDTO = {
      nameTvShow: this.createdUserTvShowForm.value.nameTvShow,
      genre: this.createdUserTvShowForm.value.genre,     
      productionCompany: this.createdUserTvShowForm.value.productionCompany,  
    }

    this.userTvShowService.updateUserTvShow(userTvShowToUpdate, this.data.reminder.userTvShowDTO.idTvShowCreatedByUser).subscribe(() => {
      //console.log("We finish updating the user tv show");
      // We set the new information to the old reminder we have in memory.
      this.data.reminder.userTvShowDTO.nameTvShow = userTvShowToUpdate.nameTvShow;
      this.data.reminder.userTvShowDTO.genre = userTvShowToUpdate.genre;
      this.data.reminder.userTvShowDTO.productionCompany = userTvShowToUpdate.productionCompany;

      let emmitedReminder : TvShowReminderEmitted = { 
        tvShowReminder: this.data.reminder,
        emittedOperation: 'update'
      };
      //console.log(emmitedReminder);

      this.communicationService.emitReminder(emmitedReminder);
      this.dialogRef.close();
    });
  }

  // We created the UserTvShowEntity object and we pass it to the Tv Show Reminder Dialog component.
  createdUserTvShow() {
    let user : User = {idUser: this.authStore.getUserIdFromLocalStorage(), name: null, lastName: null, username: null, password: null, email: null, role: null};

    let tvShowCreatedByUser: UserTvShowEntity = {
      user: user,
      nameTvShow: this.createdUserTvShowForm.value.nameTvShow,
      genre: this.createdUserTvShowForm.value.genre,
      productionCompany: this.createdUserTvShowForm.value.productionCompany
    };
    //console.log(tvShowCreatedByUser);
    let dialogRef = this.dialog.open(TvShowReminderDialogComponent,{
      height: '500px',
      width: '500px',
      data: {
        reminder: null,
        idTvShow: null,
        userTvShow: tvShowCreatedByUser
      }
    });

    // When we finish saving a reminder (from the nested dialog) for a tv show created by the user,
    // we close this parent dialog. 
    dialogRef.afterClosed().subscribe((saveReminder) => {
      console.log(saveReminder);
      if(saveReminder !== undefined)
        this.dialog.closeAll();
    });
  }

  // Close the current dialog when the button is click
  closeDialogFromButton() {
    this.dialogRef.close();
  }

  // Getters
  get nameTvShow () { return this.createdUserTvShowForm.get('nameTvShow'); }
  get genre () { return this.createdUserTvShowForm.get('genre'); }
  get productionCompany () { return this.createdUserTvShowForm.get('productionCompany'); }
}
