import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ConfigService } from '../config/config.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    formRegister: FormGroup;
    cargando: boolean = true;
    message: String = "";

  constructor(
      private creadorFormulario: FormBuilder,
      private configService: ConfigService
    ) { }

  ngOnInit(): void {
      this.formRegister = this.creadorFormulario.group({
          name:['', Validators.required],
          rut:['', Validators.required],
          email: ['', Validators.compose([Validators.required, Validators.email])],
          password:['', Validators.required]
      });
  }

    registerUser(): void {
        this.cargando = false;
        if (this.formRegister.invalid) {
                return;
            }
        let name = this.formRegister.value.name;
        let rut = this.formRegister.value.rut;
        let email = this.formRegister.value.email;
        let password = this.formRegister.value.password;
        let url: string = "https://mynana.herokuapp.com/user/";
            // url = "http://localhost:8080/user/";
        let payload: any = {name, password, rut, email}
        this.configService.postRequest(payload, url)
            .subscribe(data => {
                this.cargando = true;
                return data;
            });
    }

}
