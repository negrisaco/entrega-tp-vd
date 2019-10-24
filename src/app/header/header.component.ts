import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  currentUser: object; // Employee[];
  userLoggedIn: boolean;
  
  constructor(
    // private loginServices: LoginService
    ) {

  }

  ngOnInit() {
    this.currentUser = {
      enterpriseid: 'sheila.y.machado',
      firstName: 'sheila',
      lastName: 'machado',
      password: 'qwerty',
      token: '1'
    };
    /*this.loginServices.currentEmployee.subscribe(employee => {
      if(employee != undefined) {
        this.currentUser = employee;
        console.log('current user', this.currentUser);
      }
    });
    this.loginServices.currentUserLoggedIn.subscribe(userLoggedIn => this.userLoggedIn = userLoggedIn);*/
  }

  logOff() {
    // this.loginServices.setLoginToken(this.currentUser[0].enterpriseid, this.currentUser[0], "0");
  }

}
