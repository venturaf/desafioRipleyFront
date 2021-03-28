import { Component, OnInit } from '@angular/core';
// import { first } from 'rxjs/operators';

import { User } from '../_models/user';
import { LoginComponent } from '../login/login.component';
// import { UserService } from '../_services/user.service';
// import { AuthenticationService } from '../_services/authentication.service';

import { ConfigService } from '../config/config.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Balance } from '../_models/balance';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    private configService: ConfigService;
    currentUser: User;
    users:[];
    private currentBalanceSubject: BehaviorSubject<Balance>;
    public currentBalance: Observable<Balance>;
    balance = 1500000;

    constructor(
        // private authenticationService: AuthenticationService,
        private loginComponent: LoginComponent,
    ) 
    { 
        // this.currentUser = this.authenticationService.currentUserValue;
        this.currentUser = this.loginComponent.currentUserValue;
        console.log(this.currentUser);
        // this.currentBalanceSubject = new BehaviorSubject<Balance>(JSON.parse(localStorage.getItem('currentBalance')));
        // this.currentBalance = this.currentBalanceSubject.asObservable();
        // console.log(this.currentBalance);
    }

  ngOnInit(): void {
    //   this.getBalance(this.currentUser.rut);
  }

  getBalance(rut:string): void {
    // const url: string = "https://mynana.herokuapp.com/user/login";
    const url: string = "http://localhost:8080/balance/current/" + rut;
    this.configService.getRequest(url)
      .subscribe(data => {
          localStorage.setItem('currentBalance', JSON.stringify(data));
            this.currentBalanceSubject.next(data);
            this.currentBalance = data;
            console.log(this.currentBalance);
            return data;
      });
  }

}
