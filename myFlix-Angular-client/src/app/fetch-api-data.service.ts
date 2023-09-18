import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

// declare api url that will fetch data
const apiUrl = 'https://movies-app1-3d6bd65a6f09.herokuapp.com';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // provide HttpClient to  entire class, making it available via this.http
  // shortcut for constructor(http: HttpClient) { this.http = http; }
  constructor(private http: HttpClient) {}

  // make api call for user registration
  public userRegistration(userDetails: any): Observable <any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + "users", userDetails)
      .pipe(catchError(this.handleError));
  }

  // user login
  public userLogin(userDetails: any): Observable <any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + "users", userDetails)
      .pipe(catchError(this.handleError));
  }

  // get all movies
  getAllMovies(): Observable <any> {
    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + "movies", {
      headers: new HttpHeaders(
        {
          Authorization: "Bearer " + token,
        })}).pipe(
          map(this.extractResponseData),
          catchError(this.handleError)
        );
    }

  // get one movie
  getOneMovie(title: string): Observable <any> {
    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + "title", {
      headers: new HttpHeaders(
        {
          Authorization: "Bearer " + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get director
  getDirector(director: string): Observable <any> {
    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + "/directors/" + "name", {
      headers: new HttpHeaders(
        {
          Authorization: "Bearer " + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get genre
  getGenre(genre: string): Observable <any> {
    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + "/genres/" + "name", {
      headers: new HttpHeaders(
        {
          Authorization: "Bearer " + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get user
  getUser(user: string): Observable <any> {
    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + "/users/" + "id", {
      headers: new HttpHeaders(
        {
          Authorization: "Bearer " + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Get favorite movies for a user
  getFavoriteMovies(favorites: string): Observable <any> {
    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + "/users/" + "id", {
      headers: new HttpHeaders(
        {
          Authorization: "Bearer " + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Add a movie to favorite Movies
  // Edit user
  // Delete user and
  // Delete a movie from the favorite movies

  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred: ', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError(() => new Error('Something bad happened. Please try again later.'));
  }
}