import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormGroupDirective,
  Validators,
} from '@angular/forms';
import { Credentials } from 'src/app/interfaces/Credentials';
import { AuthStoreService } from 'src/app/services/auth-store.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css'],
})
// Done.
export class LogInComponent implements OnInit {
  loginForm: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective; // Directive to clear form and valitations.

  constructor(
    private authStore: AuthStoreService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.authStore.isLoggedIn();
  }

  // When we submit, we will mapped the information to our Credentials Type
  // Then we are going to log in and finally reset form.
  onSubmit() {
    let userCredentials: Credentials = {
      username: this.loginForm.value.username,
      password: this.loginForm.value.password,
    };
    this.userLogIn(userCredentials);
    this.reset();
  }

  // Getters
  get username() {
    return this.loginForm.get('username');
  }
  get password() {
    return this.loginForm.get('password');
  }

  // We call the service so we can log in.
  userLogIn(userCredentials: Credentials): void {
    this.authStore.logIn(userCredentials);
  }

  // The form will get reset without validation trigger.
  reset() {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
  }
}
