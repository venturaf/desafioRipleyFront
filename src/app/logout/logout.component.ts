import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

  constructor() { 
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit(): void {
      setTimeout(() => {
          this.logout();
      }, 500);
  }

    logout() {
        localStorage.removeItem('currentUser');
        localStorage.clear();
        this.currentUserSubject.next(null);
        this.currentUser = null;
        window.location.reload();
        return
    }

}
