import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyCardPage } from '../pages.module';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ItemSliding, List } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-extrato-credito',
  templateUrl: 'extrato-credito.html',
})
export class ExtratoCreditoPage {
  @ViewChild(List) list: List;

  products: any;
  limitedValue : any;
  finalValue: any;
  listObject: any;
  listDatas: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer cr9qu3Ju7Vo7',
        'Content-Type': 'application/json',
        'access_token' : 'cr9qu3Ju7Vo7',
        'client_id' : 'kjiLnbesiMMD'
      })
    };

    const apiUrlForLimitValue = 'https://sandbox.conductor.com.br/pier/v2/api/limites-disponibilidades?idConta=17';
    const apiUrlForFinalValue = 'https://sandbox.conductor.com.br/pier/v2/api/cartoes?page=17';
    const apiUrlForListing = 'https://sandbox.conductor.com.br/pier/v2/api/contas/17/transacoes?limit=30';

    this.http.get(apiUrlForLimitValue, httpOptions).subscribe(result => {
        this.products = result;
        this.limitedValue = this.products.saldoDisponivelGlobal;
    });

    this.http.get(apiUrlForFinalValue, httpOptions).subscribe(result => {
      this.products = result;
      this.finalValue = this.products.content[0].numeroCartao;
      var length = this.finalValue.length;
      var realString = this.finalValue[length-4] + this.finalValue[length-3] + this.finalValue[length-2] + this.finalValue[length-1];
      this.finalValue = realString;
    });

    this.http.get(apiUrlForListing, httpOptions).subscribe(result => {
      this.listObject = result;
      this.listDatas = this.listObject.content;
      console.log(this.listDatas);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExtratoCreditoPage');
  }

  onDados() {
    this.navCtrl.push(MyCardPage);
  }

  stopSliding() {
    //this.list.enableSlidingItems(false);
  }

  share(slidingItem: ItemSliding) {
    slidingItem.close();
  }

}
