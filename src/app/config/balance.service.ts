import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Balance } from '../_models/balance';
import { User } from '../_models/user';
import { ConfigService } from './config.service';

@Injectable({ providedIn: 'root' })
export class BalanceService {
    private currentBalanceSubject: BehaviorSubject<Balance>;
    public currentBalance: Observable<Balance>;

    constructor(private configService: ConfigService,) {
        this.currentBalanceSubject = new BehaviorSubject<Balance>(JSON.parse(localStorage.getItem('currentBalance')));
        this.currentBalance = this.currentBalanceSubject.asObservable();
    }

deposit(rut, balance): void {
    let url: string = "https://mynana.herokuapp.com/balance/current/" + rut;
    url = "http://localhost:8080/balance/current/" + rut;
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