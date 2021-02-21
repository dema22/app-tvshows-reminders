import { Component, OnInit } from '@angular/core';
import { UserProfile } from 'src/app/interfaces/UserProfile';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
// Done.
export class ProfileComponent implements OnInit {
  loading : boolean = false;
  profile : UserProfile;
  
  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getProfileOfLoggedUser();
  }

  getProfileOfLoggedUser(): void {
    this.userService.getUserProfile().subscribe((profile) => {
      console.log(profile);
      this.profile = profile;
      this.loading = true;
    });
  }
}
