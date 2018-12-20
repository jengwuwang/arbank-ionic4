import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SenhaPagamentoPage } from './senha-pagamento';

@NgModule({
  declarations: [
    SenhaPagamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(SenhaPagamentoPage),
  ],
})
export class SenhaPagamentoPageModule {}
