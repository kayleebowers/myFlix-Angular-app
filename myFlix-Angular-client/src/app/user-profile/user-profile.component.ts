import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent {
  favorites: any = "";
  id: string = "";
  user: any = "";

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    ) {}

  ngOnInit(): void {
    this.getFavorites();
  }

  //get user info (including favorites)
  getFavorites(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((response: any) => {
      this.favorites = response;
      this.user = response;
      console.log(this.favorites);
      return this.favorites;
    })
  }

  // open user update dialog on button click
  userUpdate(): void {
    this.dialog.open(UpdateUserComponent, {
      width: "500px"
    });
  }

  // open user delete dialog on button click
  userDeletion(): void {
    this.dialog.open(DeleteUserComponent, {
      width: "280px"
    })
  }

}
