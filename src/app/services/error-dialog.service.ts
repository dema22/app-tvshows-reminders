import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
// Done.
export class ErrorDialogService {
  constructor(public dialog: MatDialog) { }

  // A dialog is opened by calling the open method with a component to be loaded and an optional config object 
  // We can use the data option to pass information to the dialog component, we pass the error we get from our interceptor.
  openDialog(error: HttpErrorResponse): void {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      width: '250px',
      data: error
    });
  }
}
