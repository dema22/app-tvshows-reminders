import { Component, OnInit } from '@angular/core';
import { AuthStoreService } from 'src/app/services/auth-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn : boolean;
  
  constructor(private authStore: AuthStoreService) { }

  ngOnInit(): void {
    //console.log("Entra NGONINIT");
    this.authStore.isLoggedIn$.subscribe((value) => { 
      //console.log("The state of loggedIn from the navBar component " + value);
      this.isLoggedIn = value; 
    });
  }
}
