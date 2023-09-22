import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';

  constructor(
    private router: Router
  ) {}

  /** Define home route used in navbar */
  routeToHome(): void {
    if (localStorage.getItem("user")) {
      this.router.navigate(["movies"]);
    } else {
      this.router.navigate(["welcome"]);
    }  
  }
  
  /** Define profile route used in navbar */
  routeToProfile(): void {
    if (localStorage.getItem("user")) {
      this.router.navigate(["users"]);
    } else {
      this.router.navigate(["welcome"]);
    }  
  }

  /** Define logout function used in navbar */
  logout(): void {
    localStorage.clear();
    this.router.navigate(["welcome"]);
  }

  /** Check for user to render navbar or not */
  isUser(): any {
    if (localStorage.getItem("user")) {
      return true;
    } else false
  };

}
