import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'universidad';
  userLoggedIn: boolean = false;


  constructor(
    //private router: Router,
    //private authenticationService: AuthenticationService
    // private loginServices: LoginService
    ) {
      //this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  ngOnInit () {
    // this.loginServices.currentUserLoggedIn.subscribe(userLoggedIn => this.userLoggedIn = userLoggedIn);
    this.userLoggedIn = true;
  }

  logout() {
    //this.authenticationService.logout();
    //this.router.navigate(['/login']);
}
}
