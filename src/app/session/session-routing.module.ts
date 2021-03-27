import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { DepositComponent } from '../deposit/deposit.component';
import { SessionComponent } from './session.component';

const routes: Routes = [
    {
        path: '/session/home', component: HomeComponent
    },
    {
        path: 'deposit', component: DepositComponent
    },
    {
        path: 'session', component: SessionComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule { }
