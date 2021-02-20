import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TvShowReminder } from 'src/app/interfaces/TvShowReminder';
import { User } from 'src/app/interfaces/User';
import { UserTvShowEntity } from 'src/app/interfaces/UserTvShowEntity';
import { AuthStoreService } from 'src/app/services/auth-store.service';
import { TvShowReminderDialogComponent } from '../tv-show-reminder-dialog/tv-show-reminder-dialog.component';

@Component({
  selector: 'app-user-tv-show',
  templateUrl: './user-tv-show.component.html',
  styleUrls: ['./user-tv-show.component.css']
})
// Done.
export class UserTvShowComponent implements OnInit {
  createdUserTvShowForm: FormGroup;

  constructor(private authStore: AuthStoreService, private formBuilder: FormBuilder, private dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data : {reminder: TvShowReminder}) { }

  ngOnInit(): void {
    // We load the user tv show information on the form. We are going to update it.
    if(this.data.reminder){
      console.log("we will update the user tv show.");
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

  updateUserTvShow(){
    console.log("We update a user tv show");
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

  // Getters
  get nameTvShow () { return this.createdUserTvShowForm.get('nameTvShow'); }
  get genre () { return this.createdUserTvShowForm.get('genre'); }
  get productionCompany () { return this.createdUserTvShowForm.get('productionCompany'); }
}
