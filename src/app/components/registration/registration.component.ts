import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/User';

import { UserService } from '../../services/user.service';
import { Validators, FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { AuthStoreService } from 'src/app/services/auth-store.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
// Done.
export class RegistrationComponent implements OnInit {
  userRegistrationForm: FormGroup;
  @ViewChild(FormGroupDirective) formGroupDirective: FormGroupDirective; // Directive to clear form and valitations.

  constructor(private userService : UserService, private formBuilder : FormBuilder, private authStore: AuthStoreService) { }

  ngOnInit(): void {
    this.userRegistrationForm = this.formBuilder.group({
      name : ['', Validators.required],
      lastName: ['', Validators.required],
      username:['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
    this.authStore.isLoggedIn();
  }

  // When the user submit the registration form, we will mapped the information to our User Type
  // After that we call registration method, and finally we reset the form.
  onSubmit() {
    let user: User = { 
      name: this.userRegistrationForm.value.name,
      lastName: this.userRegistrationForm.value.lastName,
      username: this.userRegistrationForm.value.username,
      password: this.userRegistrationForm.value.password,
      email: this.userRegistrationForm.value.email,
      role: {
        idRole: 1 
      }
    };
    this.registrationOfUser(user);
    this.reset();
    // What to do ? Redirect to log in or show message that we created the user?
  }

  // Getters
  get name () { return this.userRegistrationForm.get('name'); }
  get lastName () { return this.userRegistrationForm.get('lastName'); }
  get username () { return this.userRegistrationForm.get('username'); }
  get password () { return this.userRegistrationForm.get('password'); }
  get email () { return this.userRegistrationForm.get('email'); }
  
  // We call the service so we can add our User.
  registrationOfUser(user: User): void {
    this.userService.addUser(user).subscribe();
  }

  // The form will get reset without validation trigger.
  reset() {
    setTimeout(() => this.formGroupDirective.resetForm(), 200);
  }
}