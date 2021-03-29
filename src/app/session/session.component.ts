import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.css']
})
export class SessionComponent implements OnInit {
    message: String = "";

  constructor() { }

  ngOnInit(): void {
      this.message = JSON.parse(localStorage.getItem('message'));
  }

}
