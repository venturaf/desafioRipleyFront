import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
    formLogin: FormGroup;
    cargando: boolean = true;
    message: String = "";

  constructor(
      private creadorFormulario: FormBuilder,
      private router: Router,
  ) { }

  ngOnInit(): void {
      this.formLogin = this.creadorFormulario.group({
          rut:['', Validators.compose([Validators.required,])],
          balance:['', Validators.required,]
      });
  }
}
