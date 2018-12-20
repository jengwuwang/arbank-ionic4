import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ComprovantesPage } from './comprovantes';

@NgModule({
  declarations: [
    ComprovantesPage,
  ],
  imports: [
    IonicPageModule.forChild(ComprovantesPage),
  ],
})
export class ComprovantesPageModule {}
