import { Component, OnInit } from '@angular/core';
import { UserRegistrationFormComponent } from '../user-registration-form/user-registration-form.component';
import { MatDialog } from '@angular/material/dialog';
import { UserLoginComponent } from "../user-login/user-login.component"

@Component({
  selector: 'app-welcome-page',
  templateUrl: './welcome-page.component.html',
  styleUrls: ['./welcome-page.component.scss']
})
export class WelcomePageComponent implements OnInit {
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  // open registration dialog on button click
  openUserRegistrationDialog(): void {
    this.dialog.open(UserRegistrationFormComponent, {
      width: "280px"
    });
  }

  // open login dialog on button click
  openLoginDialog(): void {
    this.dialog.open(UserLoginComponent, {
      width: "280px"
    })
  }

  // // open all movies dialog
  // openMoviesDialog(): void {
  //   this.dialog.open(MovieCardComponent, {
  //     width: "500px"
  //   })
  // }
}
