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

  routeToHome(): void {
    if (localStorage.getItem("user")) {
      this.router.navigate(["movies"]);
    } else {
      this.router.navigate(["welcome"]);
    }  
  }

  routeToProfile(): void {
    if (localStorage.getItem("user")) {
      this.router.navigate(["users"]);
    } else {
      this.router.navigate(["welcome"]);
    }  
  }

}
