import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  currentUser: object; // Employee[];

  constructor() { }

  ngOnInit() {
    this.currentUser = {
      enterpriseid: 'usuario.test',
      firstName: 'Usuario',
      lastName: 'Test',
      password: 'qwerty'
    };
  }

}
