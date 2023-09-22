import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

// import API calls
import { FetchApiDataService } from '../fetch-api-data.service';

// @Component indicates the following class is a component
@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {
  /** get input from registration html */
  @Input() userData = { Username: "", Password: "", Email: "", Birthday: ""};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar
  ) {}

  // called when component has all inputs
  ngOnInit(): void {
  }

  // send form inputs to backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // after successful request
      this.dialogRef.close();
      this.snackBar.open("Success! Please login.", "OK", {
        duration: 2000
      });
    }, (response) => {
      this.snackBar.open("Something went wrong with your registration. Try again later.", "OK", {
        duration: 2000
      })
    })
  }
}
