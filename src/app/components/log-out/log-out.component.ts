import { Component, OnInit } from '@angular/core';
import { AuthStoreService } from 'src/app/services/auth-store.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
// Done.
export class LogOutComponent implements OnInit {

  constructor(private authStore: AuthStoreService) { }

  ngOnInit(): void {
    //console.log("Te deslogeo");
    this.authStore.logout();
  }

}
