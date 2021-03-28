import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { User } from '../_models/user';
import { History } from '../_models/history.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
    private currentHistorySubject: BehaviorSubject<History>;
    public currentHistory: Observable<History>;
    currentUser: User;
    cargando: boolean = false;
    message: String = "";

  constructor(
      private configService: ConfigService
  ) { 
        this.currentHistorySubject = new BehaviorSubject<History>(JSON.parse(localStorage.getItem('currentHistory')));
        this.currentHistory = this.currentHistorySubject.asObservable();
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.findHistory();
  }

    findHistory(): void {
        this.cargando = true;
        let rut = this.currentUser.rut
        let url: string = "https://mynana.herokuapp.com/history/findHistory/" + rut;
            url = "http://localhost:8080/history/findHistory/" + rut;
        this.configService.getRequest(url)
            .subscribe(data => {
                localStorage.setItem('currentHistory', JSON.stringify(data));
                this.currentHistorySubject.next(data);
                this.currentHistory = data
                console.log(this.currentHistory);
                this.cargando = false;
                return data;
            });
    }

}
