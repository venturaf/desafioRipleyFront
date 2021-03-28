import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Balance } from '../_models/balance';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
    currentBalance: Balance;
    formDeposit: FormGroup;
    cargando: boolean = true;
    message: String = "";

  constructor(
      private creadorFormulario: FormBuilder,
      private router: Router,
  ) {}

  ngOnInit(): void {
      this.formDeposit = this.creadorFormulario.group({
          rut:['', Validators.required,],
          balance:['', Validators.required,]
      });
    this.currentBalance = JSON.parse(localStorage.getItem('currentBalance'));
  }
}
