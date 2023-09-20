import { Component } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})

export class UserProfileComponent {
  favorites: any[] = [];
  id: string = "";

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    ) {}

  ngOnInit(): void {
    this.getFavorites(this.id);
  }

  // call API to get/add/remove movie from favorites
  getFavorites(id: string): void {
    this.fetchApiData.getFavoriteMovies(id).subscribe((response: any) => {
      this.favorites = response;
      console.log(this.favorites);
      return this.favorites;
    })
  }

}
