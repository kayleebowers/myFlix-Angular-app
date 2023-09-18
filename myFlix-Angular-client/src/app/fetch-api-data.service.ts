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
  constructor(private http: HttpClient) {}

  // make api call for user registration
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
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