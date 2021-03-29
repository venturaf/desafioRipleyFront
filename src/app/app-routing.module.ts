import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DepositComponent } from './deposit/deposit.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SessionComponent } from './session/session.component';
import { TransferComponent } from './transfer/transfer.component';
import { WithdrawComponent } from './withdraw/withdraw.component';
import { HistoryComponent } from './history/history.component';
import { LogoutComponent } from './logout/logout.component';
import { MessageComponent } from './message/message.component';

const routes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'session', component: SessionComponent},
    {path: 'home', component: HomeComponent},
    {path: 'deposit', component: DepositComponent},
    {path: 'transfer', component: TransferComponent},
    {path: 'withdraw', component: WithdrawComponent},
    {path: 'history', component: HistoryComponent},
    {path: 'logout', component: LogoutComponent},
    {path: 'message', component: MessageComponent},
    
    
    {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
