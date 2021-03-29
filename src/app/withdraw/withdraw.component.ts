import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigService } from '../config/config.service';
import { Balance } from '../_models/balance';
import { User } from '../_models/user';

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {
    formWithdraw: FormGroup;
    currentBalance: Balance
    currentUser: User;
    message: String = "";

  constructor(
      private creadorFormulario: FormBuilder,
      private configService: ConfigService,
      private router: Router,
  ) { }

  ngOnInit(): void {
    this.formWithdraw = this.creadorFormulario.group({
        balance:['', Validators.required,]
    });
    this.currentBalance = JSON.parse(localStorage.getItem('currentBalance'));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  withdrawBalance(): void {
        if (this.formWithdraw.invalid) {
                return;
            }
        let balance = this.formWithdraw.value.balance
        let rut = this.currentUser.rut
        let url: string = "https://mynana.herokuapp.com/balance/withdraw";
            // url = "http://localhost:8080/balance/withdraw";
        let payload: any = {rut, balance}
        this.configService.postRequest(payload, url)
            .subscribe(data => {
                localStorage.setItem('message', JSON.stringify(data));
                this.router.navigate(['/message']);
            });
    }

}
