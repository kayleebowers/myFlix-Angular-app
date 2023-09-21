import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  @Input() userData = { Username: "", Password: "", Birthday: "", Email: ""};
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UpdateUserComponent>,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    console.log(this.userData);
  }

  editUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((response) => {
      console.log(response);
      localStorage.setItem("user", JSON.stringify(response));
      this.dialogRef.close();
      this.snackBar.open("Your profile was updated!", "OK", {
        duration: 2000
      });
    }, (response) => {
      console.log(response);
      this.snackBar.open("Something went wrong with your update. Try again.", 'OK', {
        duration: 2000
      });
    })
  }
}
