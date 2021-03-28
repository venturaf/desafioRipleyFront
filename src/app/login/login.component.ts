import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../config/config.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';

import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';

import { AuthenticationService } from '../_services/authentication.service';

@Injectable({ providedIn: 'root' })

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
  formLogin: FormGroup;
  loginCorrect: Boolean = false;
  cargando: boolean = false;
  message: String = "";
  sessionVar: boolean = false;
  returnUrl: string;

  constructor(
    private creadorFormulario: FormBuilder,
    private configService: ConfigService,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {
      if (this.authenticationService.currentUserValue) {
            this.router.navigate(['/']);
        }
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
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
    let rut = this.formLogin.value.rut;
    if (this.formLogin.invalid) {
        return;
    }
    this.cargando = true;
    if(rut.indexOf(".") != -1) rut = rut.replace(/\./g,"");

    // this.authenticationService.login(rut, this.formLogin.value.clave)
    //     .pipe(first())
    //     .subscribe(
    //         data => {
    //             this.loginCorrect = true;
    //             console.log(data);
    //             this.router.navigate(['/home']);
    //         },
    //         error => {
    //             this.cargando = false;
    //             this.loginCorrect = false;
    //             this.message = "Usuario o clave incorrecta."
    //         });

    if (this.formLogin.valid) {
        
        let rut = this.formLogin.value.rut
        let clave = this.formLogin.value.clave
        if(rut.indexOf(".") != -1) rut = rut.replace(/\./g,"");
        this.getLogins(rut, clave);
        this.sessionVar = true;
        this.loginCorrect = true;
        this.cargando = false;
        this.router.navigateByUrl('/home');
    } else {
        this.loginCorrect = false;
        this.message = "Usuario o clave incorrecta."
    }
  }

  getLogins(rut, password): void {
    let url: string = "https://mynana.herokuapp.com/user/login";
        // url = "http://localhost:8080/user/login";
    let payload: any = {rut, password}
    this.configService.postRequest(payload, url)
      .subscribe(logins => {
          localStorage.setItem('currentUser', JSON.stringify(logins));
            this.currentUserSubject.next(logins);
            this.currentUser = logins;
            return logins;
      });
  }
}