import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TvShowBasicInfoSearchBarComponent } from './components/tv-show-basic-info-search-bar/tv-show-basic-info-search-bar.component';
import { TvShowRemindersComponent } from './components/tv-show-reminders/tv-show-reminders.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: TvShowBasicInfoSearchBarComponent}, 
  { path: 'logIn', component: LogInComponent}, 
  { path: 'registration', component: RegistrationComponent},
  { path: 'logOut', component: LogOutComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService]}, // Every time a user want to access this private route the auth guard is going to run. If authenticated they get to the resource, if not, we redirect them to log in.
  { path: 'reminders', component: TvShowRemindersComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
