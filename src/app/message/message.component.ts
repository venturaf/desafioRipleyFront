import { Component, OnInit  } from '@angular/core';

import { ConfigService } from '../config/config.service';
import { Balance } from '../_models/balance';
import { User } from '../_models/user';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
    currentBalance: Balance
    currentUser: User;
    message: String = "";

  constructor(
      private configService: ConfigService
  ) { }

  ngOnInit(): void {
    this.currentBalance = JSON.parse(localStorage.getItem('currentBalance'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.message = JSON.parse(localStorage.getItem('message'));
  }



}


