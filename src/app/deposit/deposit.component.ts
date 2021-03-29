import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { Balance } from '../_models/balance';
import { User } from '../_models/user';


@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
    currentBalance: Balance
    currentUser: User;
    formDeposit: FormGroup;

  constructor(
      private creadorFormulario: FormBuilder,
      private configService: ConfigService,
      private router: Router,
  ) { }

  ngOnInit(): void {
      this.formDeposit = this.creadorFormulario.group({
          balance:['', Validators.required,]
      });
    this.currentBalance = JSON.parse(localStorage.getItem('currentBalance'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

    depositBalance(): void {
        if (this.formDeposit.invalid) {
                return;
            }
        let balance = this.formDeposit.value.balance
        let rut = this.currentUser.rut
        let url: string = "https://mynana.herokuapp.com/balance/deposit";
            // url = "http://localhost:8080/balance/deposit";
        let payload: any = {rut, balance}
        this.configService.postRequest(payload, url)
            .subscribe(data => {
                localStorage.setItem('message', JSON.stringify(data));
                this.router.navigate(['/message']);
            });
    }
  
}
