import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-movie-genre',
  templateUrl: './movie-genre.component.html',
  styleUrls: ['./movie-genre.component.scss']
})
export class MovieGenreComponent {
  constructor(
    /** get data from movie-card api call to pass to html */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Name: string,
      Description: string,
    }) {}
}
