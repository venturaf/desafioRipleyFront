import { Component, OnInit, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../_models/user';
import { LoginComponent } from '../login/login.component';
import { ConfigService } from '../config/config.service';
import { Balance } from '../_models/balance';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    private currentBalanceSubject: BehaviorSubject<Balance>;
    public currentBalance: Observable<Balance>;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    balanceNow = false;
    user;

    constructor(
        private loginComponent: LoginComponent,
        private configService: ConfigService,
    ) 
    { 
        this.user = this.loginComponent.currentUserValue;
        this.currentBalanceSubject = new BehaviorSubject<Balance>(JSON.parse(localStorage.getItem('currentBalance')));
        this.currentBalance = this.currentBalanceSubject.asObservable();
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

  ngOnInit(): void {
      this.user = this.loginComponent.currentUserValue;
      this.getBalance();
      

  }

  refresh(): void {
        window.location.reload();
    }

  getBalance(): void {
    let url: string = "https://mynana.herokuapp.com/balance/current/" + this.user.rut;
        // url = "http://localhost:8080/balance/current/" + this.currentUser.rut;
    this.configService.getRequest(url)
      .subscribe(data => {
          localStorage.setItem('currentBalance', JSON.stringify(data));
            this.currentBalanceSubject.next(data);
            this.currentBalance = data;
            console.log(this.currentBalance);
            this.balanceNow = true;
            return data;
      });
  }

}
