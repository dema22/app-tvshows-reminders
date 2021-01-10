import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogService } from './error-dialog.service';

@Injectable({
  providedIn: 'root',
})
// Intercept every request and we check every response to verify if there are any erros.
// If they are we show a dialog to the user.
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(public errorDialogService: ErrorDialogService) {}

  intercept(request: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${JSON.stringify(error.error)}`);
        }
        
        // We show the user a dialog with the error.
        this.errorDialogService.openDialog(error);
        return throwError(error);
      })
    );
  }
}
