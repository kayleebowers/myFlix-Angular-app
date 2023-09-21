import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent {
  favorites: any = '';
  id: string = '';
  user: any = '';

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getUser();
    this.getFavoriteList();
  }

  //get user info
  getUser(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      console.log(this.user);
      return this.user;
    });
  }

  //get user favorites
  getFavoriteList(): void {
    this.fetchApiData.getFavoriteMovies().subscribe((favMovieIDs: any) => {
      if (favMovieIDs) {
        this.favorites = favMovieIDs;
        this.fetchApiData.getAllMovies().subscribe((movies: any) => {
          let movieIds = movies.filter((movie: any) => {
            return this.favorites.includes(movie._id);
          });
          this.favorites = movieIds
          console.log(this.favorites);
          return this.favorites;
        });
      } else {
          return (this.favorites = "No favorite movies yet");
        }
    });
  }

  // open user update dialog on button click
  userUpdate(): void {
    this.dialog.open(UpdateUserComponent, {
      width: '500px',
    });
  }

  // open user delete dialog on button click
  userDeletion(): void {
    this.dialog.open(DeleteUserComponent, {
      width: '280px',
    });
  }
}
