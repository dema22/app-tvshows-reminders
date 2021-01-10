import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { LogOutComponent } from './components/log-out/log-out.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { TvShowBasicInfoSearchBarComponent } from './components/tv-show-basic-info-search-bar/tv-show-basic-info-search-bar.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'home', component: TvShowBasicInfoSearchBarComponent},
  { path: 'logIn', component: LogInComponent}, 
  { path: 'registration', component: RegistrationComponent},
  { path: 'logOut', component: LogOutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
