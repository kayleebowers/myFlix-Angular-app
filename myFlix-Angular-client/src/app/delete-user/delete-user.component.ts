import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<DeleteUserComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  deleteUserProfile(): void {
    this.fetchApiData.deleteUser().subscribe((response) => {
      localStorage.clear();
      this.dialogRef.close();
      this.router.navigate(["welcome"]);
      this.snackBar.open("Your profile was deleted.", "OK", {
        duration: 2000
      });
    }, (response) => {
      this.snackBar.open("Your profile was not deleted. Try again.", 'OK', {
        duration: 2000
      });
    })
  }
}
