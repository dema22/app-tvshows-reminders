import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tv-show-basic-info-search-bar',
  templateUrl: './tv-show-basic-info-search-bar.component.html',
  styleUrls: ['./tv-show-basic-info-search-bar.component.css']
})
export class TvShowBasicInfoSearchBarComponent implements OnInit {

  constructor(private authService: AuthService,
              private userService: UserService) { }

  ngOnInit(): void {
    //console.log(this.authService.isLoggedIn());
    this.getProfileOfLoggedUser();
  }

  getProfileOfLoggedUser(): void {
    this.userService.getUserProfile().subscribe();
  }
}
