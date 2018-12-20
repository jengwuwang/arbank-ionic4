import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MyCardPage } from '../pages.module';

@IonicPage()
@Component({
  selector: 'page-comprovantes',
  templateUrl: 'comprovantes.html',
})
export class ComprovantesPage {

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

    const apiUrlForListing = 'https://sandbox.conductor.com.br/pier/v2/api/contas/17/transacoes?limit=30';

    this.http.get(apiUrlForListing, httpOptions).subscribe(result => {
      this.listObject = result;
      this.listDatas = this.listObject.content;
      console.log(this.listDatas);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComprovantesPage');
  }

  onDados() {
    this.navCtrl.push(MyCardPage);
  }

}
