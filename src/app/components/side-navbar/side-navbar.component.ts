import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthStoreService } from 'src/app/services/auth-store.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {
  isLoggedIn : boolean;
  @Output() sidenavClose = new EventEmitter();

  constructor(private authStore: AuthStoreService) { }

  ngOnInit(): void {
    this.authStore.isLoggedIn$.subscribe((value) => { 
      //console.log("The state of loggedIn from the navBar component " + value);
      this.isLoggedIn = value; 
    });
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
  
}
