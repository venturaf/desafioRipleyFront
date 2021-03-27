import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css']
})
export class TransferComponent implements OnInit {
    formTransfer: FormGroup;
    cargando: boolean = true;
    message: String = "";

  constructor(
      private creadorFormulario: FormBuilder,
      private router: Router,
  ) { }

  ngOnInit(): void {
      this.formTransfer = this.creadorFormulario.group({
          rut:['', Validators.required],
          balance:['', Validators.required],
          account:['', Validators.required],
      });
  }
}