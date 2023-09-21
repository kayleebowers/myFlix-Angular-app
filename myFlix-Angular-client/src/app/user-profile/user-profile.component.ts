import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

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

}
