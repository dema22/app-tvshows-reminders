import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuthStoreService } from 'src/app/services/auth-store.service';

@Component({
  selector: 'app-side-navbar',
  templateUrl: './side-navbar.component.html',
  styleUrls: ['./side-navbar.component.css']
})
export class SideNavbarComponent implements OnInit {
  isLoggedIn : boolean;
  isUser: boolean;
  @Output() sidenavClose = new EventEmitter();

  constructor(private authStore: AuthStoreService) { }

  ngOnInit(): void {
    this.authStore.isLoggedIn$.subscribe((value) => { 
      //console.log("The state of loggedIn from the navBar component " + value);
      this.isLoggedIn = value; 
      this.checkForRole();
    });
  }

  checkForRole(): void {
    const userRole = this.authStore.getUserRoleromLocalStorage();
    console.log(userRole);
    
    if(userRole === 1){
      this.isUser = true;
    }else{
      this.isUser = false;
    }
  }

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  }
  
}
