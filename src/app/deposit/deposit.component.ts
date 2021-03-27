import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {
    formLogin: FormGroup;
    cargando: boolean = true;
    message: String = "";

  constructor(private creadorFormulario: FormBuilder,) { }

  ngOnInit(): void {
      this.formLogin = this.creadorFormulario.group({
          rut:['', Validators.compose([Validators.required,])],
          balance:['', Validators.required,]
      });
  }

}
