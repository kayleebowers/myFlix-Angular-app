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
  /** provide HttpClient to  entire class, making it available via this.http
   * shortcut for constructor
   * (http: HttpClient) { 
   *   this.http = http; 
   * }
   */
  constructor(private http: HttpClient) {}

  // make api call for user registration
  public userRegistration(userDetails: any): Observable <any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + "/users/", userDetails)
      .pipe(catchError(this.handleError));
  }

  // user login
  public userLogin(userDetails: any): Observable <any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + "/login", userDetails)
      .pipe(catchError(this.handleError));
  }

  // get all movies
  getAllMovies(): Observable <any> {
    const token = localStorage.getItem("token");
    return this.http.get(apiUrl + "/movies", {
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
    return this.http.get(apiUrl + "/movies/" + title, {
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
    return this.http.get(apiUrl + "/directors/" + director, {
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
    return this.http.get(apiUrl + "/genres/" + genre, {
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
  getUser(): Observable <any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    let parsedUser = JSON.parse(`${user}`);
    const id = parsedUser._id;
    return this.http.get(apiUrl + "/users/" + id, {
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
  getFavoriteMovies(): Observable <any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    let parsedUser = JSON.parse(`${user}`);
    const id = parsedUser._id;
    return this.http.get(apiUrl + "/users/" + id, {
      headers: new HttpHeaders(
        {
          Authorization: "Bearer " + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.Favorites),
      catchError(this.handleError)
    );
  }

  // Add a movie to favorite Movies
  addFavoriteMovies(movieId: string): Observable <any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    let parsedUser = JSON.parse(`${user}`);
    const id = parsedUser._id;
    return this.http.post(apiUrl + "/users/" + id + "/movies/" + movieId, {}, {
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

  // Edit user
  editUser(userData: any | null): Observable <any> {
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    const id = user._id;   
    const token = localStorage.getItem("token");
    return this.http.put(apiUrl + "/users/" + id, userData, {
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

  // Delete user 
  deleteUser(): Observable <any> {
    const user = JSON.parse(localStorage.getItem("user") || '{}');
    const id = user._id;   
    const token = localStorage.getItem("token");
    return this.http.delete(apiUrl + "/users/" + id, {
      headers: new HttpHeaders(
        {
          Authorization: "Bearer " + token,
        }
      ),
      // HttpClient expects JSON response but endpoint sends back text message. Declare responseType to prevent error
      responseType: "text",
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Delete a movie from the favorite movies
  deleteFavoriteMovies(movieId: string): Observable <any> {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    let parsedUser = JSON.parse(`${user}`);
    const id = parsedUser._id;
    return this.http.delete(apiUrl + "/users/" + id + "/movies/" + movieId, {
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