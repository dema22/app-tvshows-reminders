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
import { AuthStoreService } from './auth-store.service';

@Injectable({
  providedIn: 'root',
})
// Done.
// Intercept every request and we check every response to verify if there are any errors.
// If they are we show a dialog to the user.
export class HttpErrorInterceptorService implements HttpInterceptor {
  constructor(public errorDialogService: ErrorDialogService, public authStore: AuthStoreService) {}

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
        //console.log(error.error.statusCode);
        //console.log(error.error.status);

        // If the error is a 401 (unauthorized) we are going to force a logout ( We should implement a refresh token in the API and use it in this case!)
        if(error.error.status === 401)
          this.authStore.logout();
        else
          // We show the user a dialog with the error.
          this.errorDialogService.openDialog(error);

        return throwError(error);
      })
    );
  }
}
