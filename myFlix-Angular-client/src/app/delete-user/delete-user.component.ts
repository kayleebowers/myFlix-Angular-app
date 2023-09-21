import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent {
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    public snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
  }

  deleteUserProfile(): void {
    this.fetchApiData.deleteUser().subscribe((response) => {
      this.dialogRef.close();
      this.snackBar.open("Your profile was deleted.", "OK", {
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
