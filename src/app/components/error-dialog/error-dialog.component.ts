import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css']
})
// Done.
export class ErrorDialogComponent implements OnInit {

  // We inject the error we get from the Error service.
  // We show the information in this modal.
  constructor(@Inject(MAT_DIALOG_DATA) public error: HttpErrorResponse) { }

  ngOnInit(): void {
  }

}
