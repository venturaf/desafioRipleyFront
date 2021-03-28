import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../app/_services/authentication.service';
import { User } from '../app/_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Desafio Ripley';
  currentUser: User;
  cargando = true;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ){
      setTimeout(() => {
          this.cargando = false;
      }, 2000);
      this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    ngOnInit(): void {
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
