import { Component, OnInit, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../_models/user';
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
    public currentUser:User;
    balanceNow = false;

    constructor(
        private configService: ConfigService,
    ) 
    { 
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.currentBalanceSubject = new BehaviorSubject<Balance>(JSON.parse(localStorage.getItem('currentBalance')));
        this.currentBalance = this.currentBalanceSubject.asObservable();
    }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.getBalance();
  }

  refresh(): void {
        window.location.reload();
    }

  getBalance(): void {
    let url: string = "https://mynana.herokuapp.com/balance/current/" + this.currentUser.rut;
        // url = "http://localhost:8080/balance/current/" + this.currentUser.rut;
    this.configService.getRequest(url)
      .subscribe(data => {
          localStorage.setItem('currentBalance', JSON.stringify(data));
            this.currentBalanceSubject.next(data);
            this.currentBalance = data;
            this.balanceNow = true;
            return data;
      });
  }

}
