import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private router: Router;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit(): void {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

    logout() {
        localStorage.clear();
        this.currentUserSubject.next(null);
        this.currentUser = null;
        this.router.navigateByUrl('/');
    }

}
