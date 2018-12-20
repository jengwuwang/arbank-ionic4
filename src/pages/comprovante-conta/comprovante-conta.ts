import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyCardPage, TranferenciaPage, SenhaPagamentoPage } from '../pages.module';

/**
 * Generated class for the ComprovanteContaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comprovante-conta',
  templateUrl: 'comprovante-conta.html',
})
export class ComprovanteContaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComprovanteContaPage');
  }


  onMyCardPage() {
    this.navCtrl.push(MyCardPage);
  }

  onTransferenciaPage() {
    this.navCtrl.push(TranferenciaPage);
  }

  onSenhaPagamento() {
    this.navCtrl.push(SenhaPagamentoPage);
  }

}
