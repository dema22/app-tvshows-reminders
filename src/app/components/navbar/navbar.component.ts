import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthStoreService } from 'src/app/services/auth-store.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
// Done.
export class NavbarComponent implements OnInit {
  isLoggedIn : boolean;
  @Output() public sidenavToggle = new EventEmitter();

  constructor(private authStore: AuthStoreService) { }

  // We check the state of the loggeInd observable to know what option to show on the navbar html.
  ngOnInit(): void {
    //console.log("Entra NGONINIT");
    this.authStore.isLoggedIn$.subscribe((value) => { 
      //console.log("The state of loggedIn from the navBar component " + value);
      this.isLoggedIn = value; 
    });
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

}
