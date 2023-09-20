import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  @Input() userLogin = { Username: "", Password: ""};
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginComponent>,
    public snackBar: MatSnackBar) {}
  
  ngOnInit(): void {
  }

  loginUser(): void {
    this.fetchApiData.userLogin(this.userLogin).subscribe((result) => {
      this.dialogRef.close();
      this.snackBar.open(result, "OK", {
        duration: 2000
      });
    }, (result) => {
      localStorage.setItem("user", result.user);
      localStorage.setItem("token", result.token);
      this.snackBar.open(result, 'OK', {
        duration: 2000
      });
    });
  }
}
