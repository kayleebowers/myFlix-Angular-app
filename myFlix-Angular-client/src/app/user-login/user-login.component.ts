import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  @Input() userData = { Username: "", Password: ""};
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}
  
  ngOnInit(): void {
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe((result) => {
      console.log(result);
      localStorage.setItem("user", JSON.stringify(result.user));
      localStorage.setItem("token", result.token);
      this.dialogRef.close();
      this.snackBar.open("You are logged in!", "OK", {
        duration: 2000
      });
      this.router.navigate(["movies"]);
    }, (result) => {
      console.log(result);
      this.snackBar.open("Something went wrong with your login. Try again.", 'OK', {
        duration: 2000
      });
    });
  }
}
