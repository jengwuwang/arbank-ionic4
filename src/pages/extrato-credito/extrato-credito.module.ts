import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ExtratoCreditoPage } from './extrato-credito';

@NgModule({
  declarations: [
    ExtratoCreditoPage,
  ],
  imports: [
    IonicPageModule.forChild(ExtratoCreditoPage),
  ],
})
export class ExtratoCreditoPageModule {}
