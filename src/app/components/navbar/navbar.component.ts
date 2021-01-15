import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn : boolean;
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log("Entra NGONINIT");
    this.authService.isLoggedIn$.subscribe((value) => { 
      console.log("The state of loggedIn from the navBar component " + value);
      this.isLoggedIn = value; 
    });
  }
}
