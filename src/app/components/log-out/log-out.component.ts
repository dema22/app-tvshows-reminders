import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-log-out',
  templateUrl: './log-out.component.html',
  styleUrls: ['./log-out.component.css']
})
export class LogOutComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    console.log("Te deslogeo");
    this.authService.logout();
  }

}
