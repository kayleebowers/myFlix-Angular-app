import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  constructor(
    /** get data from movie-card api call to pass to html */
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Title: string,
      Summary: string
    }) {}
}
