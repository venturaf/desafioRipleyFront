import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    currentUser: User;
    users:[];
    balance = 1500000;

    constructor(
        private authenticationService: AuthenticationService,
    ) 
    { 
        this.currentUser = this.authenticationService.currentUserValue;
    }

  ngOnInit(): void {
      
  }

}
