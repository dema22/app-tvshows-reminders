import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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

  constructor(private authStore: AuthStoreService, private formBuilder: FormBuilder, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.createdUserTvShowForm = this.formBuilder.group({
      nameTvShow: ['', Validators.required], 
      genre: [''],
      productionCompany: ['']
    });
  }

  // We created the UserTvShowEntity object and we pass it to the Tv Show Reminder Dialog component.
  onSubmit() {
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
