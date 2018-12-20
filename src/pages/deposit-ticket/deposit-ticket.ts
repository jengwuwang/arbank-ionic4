import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
/**
 * Generated class for the DepositTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deposit-ticket',
  templateUrl: 'deposit-ticket.html',
})
export class DepositTicketPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public http:HttpClient) {
    
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer cr9qu3Ju7Vo7',
        'Content-Type': 'application/json',
        'access_token' : 'cr9qu3Ju7Vo7',
        'client_id' : 'kjiLnbesiMMD'
      })
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DepositTicketPage');
  }

}
