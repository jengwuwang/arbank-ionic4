import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { DepositTicketPage } from '../pages.module';
//import { DatePipe } from '@angular/common';

/**
 * Generated class for the DepositPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-deposit',
  templateUrl: 'deposit.html'
})
export class DepositPage {
  value : number;
  ticketData : any;
  ticketNumber : any;
  date: Date = new Date();
  dueDate : string;
  /*
  year: any = this.date_to_parse.getFullYear().toString();
  month: any = (this.date_to_parse.getMonth()+2);
  day : any = (this.date_to_parse.getDate()+3);
  */
 constructor(public navCtrl: NavController, public navParams: NavParams, 
              public http:HttpClient, /*public datepipe: DatePipe*/) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DepositPage');
  }

  newTicket(){

    //let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');

    console.log(this.dueDate);

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer cr9qu3Ju7Vo7',
        'Content-Type': 'application/json',
        'access_token' : 'cr9qu3Ju7Vo7',
        'client_id' : 'kjiLnbesiMMD'
      })
    };

    const apiUrlGetTicket = 'https://sandbox.conductor.com.br/pier/v2/api/contas/1/gerar-boleto-recarga?valor='
    +this.value+'&dataVencimento=2019-04-05';
    //"+latest_date"
    this.http.post(apiUrlGetTicket, " ", httpOptions).subscribe(result => {
      this.ticketData = result;
      this.ticketNumber = this.ticketData.numeroDoDocumento;
      console.log(this.ticketNumber );
    });
    this.navCtrl.push(DepositTicketPage,
      {ticket : this.ticketNumber}
      );

  }
}
