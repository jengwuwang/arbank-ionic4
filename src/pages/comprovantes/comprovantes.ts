import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { MyCardPage } from '../pages.module';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-comprovantes',
  templateUrl: 'comprovantes.html',
})
export class ComprovantesPage {

  listObject: any;
  listDatas: any;
  realAccountID: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public http: HttpClient,
              private storage:Storage) {
    let self = this;

    self.storage.get('realAccountID')
    .then((result) => {
      this.realAccountID = result;

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization' : 'Bearer cr9qu3Ju7Vo7',
          'Content-Type': 'application/json',
          'access_token' : 'cr9qu3Ju7Vo7',
          'client_id' : 'kjiLnbesiMMD'
        })
      };
  
      const apiUrlForListing = 'https://sandbox.conductor.com.br/pier/v2/api/contas/'+this.realAccountID+'/transacoes?limit=30';
  
      this.http.get(apiUrlForListing, httpOptions).subscribe(result => {
        this.listObject = result;
        this.listDatas = this.listObject.content;
        console.log(this.listDatas);
      });
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ComprovantesPage');
  }

  onDados() {
    this.navCtrl.push(MyCardPage);
  }

}
