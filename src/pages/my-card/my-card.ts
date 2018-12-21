import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomePage, ForgotPage, ExtratoCreditoPage, ComprovantesPage, DepositPage, TranferenciaPage } from '../pages.module';
import { BusinessService } from '../../common/common.module';
import { SignupPage } from '../signup/signup';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { AuthUser, ICognitoCredentials, ICognitoException, CognitoService, ICognitoSignUpCredentials, IAuthUser, ICognitoProfile } from "../../aws/aws.module";

/**
 * Generated class for the MyCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-card',
  templateUrl: 'my-card.html',
})
export class MyCardPage {

  products: any;
  limitedValue : any;
  finalValue: any;
  cognitoUserData: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public http: HttpClient,
              private storage:Storage,
              private cognitoService: CognitoService) {
    let self = this;

    this.cognitoService.cognitoUser.getUserAttributes((err: Error, result:any[]) => {
      this.cognitoUserData = result;
      self.storage.set('realAccountID', this.cognitoUserData[0]['Value']);
    
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization' : 'Bearer cr9qu3Ju7Vo7',
          'Content-Type': 'application/json',
          'access_token' : 'cr9qu3Ju7Vo7',
          'client_id' : 'kjiLnbesiMMD'
        })
      };
  
      const apiUrlForLimitValue = 'https://sandbox.conductor.com.br/pier/v2/api/limites-disponibilidades?idConta='+this.cognitoUserData[0]['Value'];
      const apiUrlForFinalValue = 'https://sandbox.conductor.com.br/pier/v2/api/cartoes?page='+this.cognitoUserData[0]['Value'];
       
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
    });
  }

  ionViewDidLoad() {}

  onExtratoCredito() {
    this.navCtrl.push(ExtratoCreditoPage);
  }

  onComprovantes() {
    this.navCtrl.push(ComprovantesPage);
  }

  onCompraCredito(){
    this.navCtrl.push(DepositPage);
  }

  onTransfer() {
    this.navCtrl.push(TranferenciaPage);
  }
}