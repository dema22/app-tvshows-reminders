import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Components i created:
import { TvShowDetailsComponent } from './components/tv-show-details/tv-show-details.component';
import { TvShowBasicInfoSearchBarComponent } from './components/tv-show-basic-info-search-bar/tv-show-basic-info-search-bar.component';
import { RegistrationComponent } from './components/registration/registration.component';

// Communicating with backend services using HTTP angular client
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { HttpErrorInterceptorService } from '../app/services/http-error-interceptor.service';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';

// Importing components from angular material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { AppRoutingModule } from './app-routing.module';
import { LogInComponent } from './components/log-in/log-in.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatTableModule} from '@angular/material/table';

// Forms
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { LogOutComponent } from './components/log-out/log-out.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DetailsTvShowComponent } from './components/details-tv-show/details-tv-show.component';
import { TvShowRemindersComponent } from './components/tv-show-reminders/tv-show-reminders.component';

@NgModule({
  declarations: [
    AppComponent,
    TvShowDetailsComponent,
    TvShowBasicInfoSearchBarComponent,
    RegistrationComponent,
    NavbarComponent,
    FooterComponent,
    LogInComponent,
    ErrorDialogComponent,
    LogOutComponent,
    ProfileComponent,
    DetailsTvShowComponent,
    TvShowRemindersComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Material angular components
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatTableModule,
    // Routing
    AppRoutingModule,
    // Forms
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, 
      useClass: AuthInterceptorService,
      multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
