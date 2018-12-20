import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DepositTicketPage } from './deposit-ticket';

@NgModule({
  declarations: [
    DepositTicketPage,
  ],
  imports: [
    IonicPageModule.forChild(DepositTicketPage),
  ],
})
export class DepositTicketPageModule {}
