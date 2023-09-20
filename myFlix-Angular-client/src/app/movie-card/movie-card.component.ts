import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MovieDetailsComponent } from "../movie-details/movie-details.component";
import { MovieGenreComponent } from '../movie-genre/movie-genre.component';
import { MovieDirectorComponent } from '../movie-director/movie-director.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  genre: any = "";
  director: any = "";
  movie: any = "";

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    ) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    })
  }

  // functions to open movie info dialogs 
  openMovieDetailsDialog(movie: string): void {
    this.fetchApiData.getOneMovie(movie).subscribe((response: any) => {
      this.movie = response;
      console.log(this.movie);
      this.dialog.open(MovieDetailsComponent, {
        width: "500px"
      })
    });
    return this.movie;
  }

  openGenreDialog(name: string): void {
    this.fetchApiData.getGenre(name).subscribe((response: any) => {
      this.genre = response;
      console.log(this.genre);
      this.dialog.open(MovieGenreComponent, {
        width: "500px",
        data: {
          Name: this.genre.Name,
          Description: this.genre.description
        }
      });
    })
  }

  openDirectorDialog(director: string): void {
    this.fetchApiData.getDirector(director).subscribe((response: any) => {
      this.director = response;
      this.dialog.open(MovieDirectorComponent, {
        width: "500px"
      });
    })
  }

  // call API to add/remove movie from favorites
}
