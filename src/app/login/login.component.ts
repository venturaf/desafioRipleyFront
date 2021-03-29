import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfigService } from '../config/config.service';
import { Router, ActivatedRoute } from '@angular/router';

import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';

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
    message: String = "";

  constructor(
    private creadorFormulario: FormBuilder,
    private configService: ConfigService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
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
    }

  login() {
    if (this.formLogin.invalid) {
        return;
    }
        let rut = this.formLogin.value.rut;
        let clave = this.formLogin.value.clave
        if(rut.indexOf(".") != -1) rut = rut.replace(/\./g,"");
        this.getLogins(rut, clave);
        this.router.navigate(['/home']);
        return
  }

    refresh(): void {
        window.location.reload();
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
      });
  }
}