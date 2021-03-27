import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../config/config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  loginCorrect: Boolean = false;
  cargando: boolean = false;
  message: String = "";
  sessionVar: boolean = false;
  returnUrl: string;

  constructor(
    private creadorFormulario: FormBuilder,
    private loginsService: ConfigService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
      if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
    }

    ngOnInit(): void {
        this.formLogin = this.creadorFormulario.group({
          rut:   ['', Validators.compose([Validators.required,])],
          clave: ['', Validators.required,]
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

  login() {
    this.loginCorrect = true;
    if (this.formLogin.invalid) {
        return;
    }
    this.cargando = true;

    this.authenticationService.login(this.formLogin.value.rut, this.formLogin.value.clave)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
                this.loginCorrect = true;
                console.log(data);
            },
            error => {
                this.cargando = false;
                this.loginCorrect = false;
                this.message = "Usuario o clave incorrecta."
            });

    // if (this.formLogin.valid) {
        
    //     let rut = this.formLogin.value.rut
    //     let clave = this.formLogin.value.clave
    //     if(rut.indexOf(".") != -1) rut = rut.replace(/\./g,"");
    //     console.log(rut, clave)
    //     this.getLogins(rut, clave);
    //     setTimeout(() => {
    //     this.sessionVar = true;
    //     this.loginCorrect = true;
    //     this.cargando = false;
    //     console.log(this.loginCorrect);
    //     console.log("login");
    //     this.router.navigateByUrl('/home');
    //     }, 1000);
    // } else {
    //     this.loginCorrect = false;
    //     this.message = "Usuario o clave incorrecta."
    // }
  }

  getLogins(rut, password): void {
    // const url: string = "https://mynana.herokuapp.com/user/login";
    const url: string = "http://localhost:8080/user/login";
    let payload: any = {rut, password}
    this.loginsService.postRequest(payload, url)
      .subscribe(logins => console.log(logins));
  }
}