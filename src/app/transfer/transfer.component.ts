import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ConfigService } from '../config/config.service';
import { Balance } from '../_models/balance';
import { User } from '../_models/user';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
    formTransfer: FormGroup;
    currentBalance: Balance
    currentUser: User;
    cargando: boolean = true;
    message: String = "";

  constructor(
      private creadorFormulario: FormBuilder,
      private configService: ConfigService
  ) { }

  ngOnInit(): void {
      this.formTransfer = this.creadorFormulario.group({
          balance:['', Validators.required],
          account:['', Validators.required],
      });
        this.currentBalance = JSON.parse(localStorage.getItem('currentBalance'));
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

    transferBalance(): void {
        this.cargando = false;
        if (this.formTransfer.invalid) {
                return;
            }
        let balance = this.formTransfer.value.balance
        let account = this.formTransfer.value.account
        let rut = this.currentUser.rut
        let url: string = "https://mynana.herokuapp.com/balance/transfer";
            // url = "http://localhost:8080/balance/transfer";
        let payload: any = {rut, balance, account}
        this.configService.postRequest(payload, url)
            .subscribe(data => {
                this.cargando = true;
                return data;
            });
    }
}