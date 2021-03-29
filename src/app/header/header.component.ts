import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';

import { Injectable } from '@angular/core';

@Injectable()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

  constructor(private router: Router) {
      
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    
  }

  ngOnInit(): void {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (this.currentUser) {
            this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/']);
      }
  }
}
