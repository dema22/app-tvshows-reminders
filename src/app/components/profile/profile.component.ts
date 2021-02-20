import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
// Done.
export class ProfileComponent implements OnInit {
  constructor(
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getProfileOfLoggedUser();
  }

  getProfileOfLoggedUser(): void {
    this.userService.getUserProfile().subscribe(/*(profile) => console.log(profile)*/);
  }
}
