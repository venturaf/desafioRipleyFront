import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal} from '@ng-bootstrap/ng-bootstrap'

import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

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
    private modal: NgbModal;
    private authenticationService: AuthenticationService

  constructor(private router: Router) {
      
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    
  }

  ngOnInit(): void {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log(this.currentUser);

      if (this.currentUser) {
            this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/']);
      }
  }
}
