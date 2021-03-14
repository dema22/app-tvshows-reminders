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
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCheckboxModule} from '@angular/material/checkbox';

// Forms
import { ReactiveFormsModule } from '@angular/forms';
import { ErrorDialogComponent } from './components/error-dialog/error-dialog.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { LogOutComponent } from './components/log-out/log-out.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TvShowRemindersComponent } from './components/tv-show-reminders/tv-show-reminders.component';
import { TvShowReminderDialogComponent } from './components/tv-show-reminder-dialog/tv-show-reminder-dialog.component';
import { UserTvShowComponent } from './components/user-tv-show/user-tv-show.component';
import { DeleteReminderDialogComponent } from './components/delete-reminder-dialog/delete-reminder-dialog.component';

// Flexbox for angular
import {FlexLayoutModule} from '@angular/flex-layout';
import { SideNavbarComponent } from './components/side-navbar/side-navbar.component';

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
    TvShowRemindersComponent,
    TvShowReminderDialogComponent,
    UserTvShowComponent,
    DeleteReminderDialogComponent,
    SideNavbarComponent
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
    MatPaginatorModule,
    MatCheckboxModule,
    // Routing
    AppRoutingModule,
    // Forms
    ReactiveFormsModule,
    // Flexlayout for angular
    FlexLayoutModule
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
