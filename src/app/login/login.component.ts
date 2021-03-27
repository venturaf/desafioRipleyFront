import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../config/config.service';
// import { Login } from './login';
// import { LoginsService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  @Input()
  loginCorrect: Boolean = false;
  @Input()
  cargando: boolean = false;
  message: String = "";
  sessionVar: boolean = false;
  constructor(
    private creadorFormulario: FormBuilder,
    private loginsService: ConfigService
  ) { }
  ngOnInit(): void {
    this.formLogin = this.creadorFormulario.group({
      rut: ['', Validators.compose([
        Validators.required,
      ])],
      clave: ['', Validators.required,]
    });
  }
  login() {
    if (this.formLogin.valid) {
      this.cargando = true;
      let rut = this.formLogin.value.rut
      let clave = this.formLogin.value.clave
      console.log(`${rut} ${clave}`);
      this.message = "Ingresando ..."
      this.getLogins(rut, clave);
      setTimeout(() => {
        this.sessionVar = true;
        this.loginCorrect = true;
        this.cargando = false;
      }, 2000);
    } else {
      this.loginCorrect = false;
      this.message = "Usuario o clave incorrecta."
    }
  }
  getLogins(rut, password): void {
    const url: string = "https://mynana.herokuapp.com/user/login";
    let payload: any = {rut, password}
    this.loginsService.postRequest(payload, url)
      .subscribe(logins => console.log(logins));
  }
}