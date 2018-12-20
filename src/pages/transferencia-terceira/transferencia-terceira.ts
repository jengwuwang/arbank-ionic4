import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TransferenciaSegundaPage, SenhaPagamentoPage } from '../pages.module';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthUser, ICognitoCredentials, CognitoService, ICognitoSignUpCredentials, IAuthUser, ICognitoProfile } from "../../aws/aws.module";
import { CognitoUser, CognitoUserPool, ICognitoUserAttributeData, CognitoUserAttribute, AuthenticationDetails , ICognitoUserPoolData , CognitoUserSession, ISignUpResult } from 'amazon-cognito-identity-js';
import { Storage } from '@ionic/storage';
import * as moment from 'moment';

/**
 * Generated class for the TransferenciaTerceiraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transferencia-terceira',
  templateUrl: 'transferencia-terceira.html',
})
export class TransferenciaTerceiraPage {

  authUser: IAuthUser;
  products: any;
  limitedValue : any;
  nomeValue : any;
  account_id : any;
  brlValue : any;
  public today: any;
  idToken: any;
  idConta: any;
  // session: CognitoUserSession;
  // private userPool: CognitoUserPool;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private storage:Storage, private cognitoService: CognitoService) {
    let self = this;

    // self.storage.get('authUser')
    // .then((result) => {
    //     console.log(result);
    // });
    // console.log(cognitoService.refreshOrResetCreds());

    // console.log(this.session.getIdToken().getJwtToken());
    self.storage.get('idToken').then((val) => {
        this.idToken = val;
    });

    self.storage.get('idConta').then((val) => {
        this.idConta = val;
    });

    self.storage.get('account_id').then((val) => {
      this.account_id = val;

      const apiUrlForStep3 = 'https://sandbox.conductor.com.br/pier/v2/api/contas/'+this.account_id;
      const apiUrlForLimitValue = 'https://sandbox.conductor.com.br/pier/v2/api/limites-disponibilidades?idConta='+this.account_id;

      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization' : 'Bearer cr9qu3Ju7Vo7',
          'Content-Type': 'application/json',
          'access_token' : 'cr9qu3Ju7Vo7',
          'client_id' : 'kjiLnbesiMMD'
        })
      };

      this.http.get(apiUrlForStep3, httpOptions).subscribe(result => {
        this.products = result;
        this.nomeValue = this.products.nome;
      });

      this.http.get(apiUrlForLimitValue, httpOptions).subscribe(result => {
        this.products = result;
        this.limitedValue = this.products.saldoDisponivelGlobal;
      });
    });

    self.storage.get('brlValue').then((val) => {
      this.brlValue = val;
    });

    this.today = moment().format("MM/DD/YYYY");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferenciaTerceiraPage');
  }

  onTransSeg() {
    this.navCtrl.push(TransferenciaSegundaPage);
  }

  onSenhaTrans() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
        'Authorization' : 'eyJraWQiOiJyWVE1cFd3OHRtMFBqUjUxMEt1K2hkM3JxOCs3czRPOStGWWJjckdncW93PSIsImFsZyI6IlJTMjU2In0.eyJjdXN0b206aWRDb250YSI6IjEiLCJjdXN0b206Y291bnRyeV9hbmRfY29kZSI6IkJSIiwic3ViIjoiNGE5YmQwNDUtZTZjYi00YjFjLWE0OGUtZGFlMWRmYjkzZGFmIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJiaXJ0aGRhdGUiOiIxOTY4LTExLTI3IiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfY25GVHRWc2dHIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnVzZXJuYW1lIjoiOTMyLjM0NS4yNjgtMjAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiI5MzIuMzQ1LjI2OC0yMCIsImdpdmVuX25hbWUiOiJqZWFuIHRlc3RpbmciLCJhdWQiOiI2bDluaWdmYWxkYm43c2o3dGhpYjEycjRwIiwiZXZlbnRfaWQiOiJjNDhlYzYyMS0wMmU4LTExZTktODBmMS01MWJiMDA0MDM3OTgiLCJjdXN0b206bWJyX3NpbmNlIjoiMjAxOCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTQ1MTUzNDM2LCJwaG9uZV9udW1iZXIiOiIrNTUxMjk5NzQ0OTQwNyIsImV4cCI6MTU0NTE1NzAzNiwiaWF0IjoxNTQ1MTUzNDM2LCJjdXN0b206aWRQZXNzb2EiOiIzIiwiZW1haWwiOiJqZWFuQHJvYWRwYXNzLmNvbS5iciJ9.MaG2LLfQXhJc06goMT7M5XLqFGmObsuaKB_3zWEZdOhE4vDeCzZLX5OLfD6C4x_XHyYfAo4BN6dtsO65s-OrTCU5cVzcVZh4G2yupon1I-gbBvPZEJiIbES58zUbXv6XvWyMGDXy4Uc1qwMaBsEY0WN1BrhpsnZ0Ek-X4KnNGtiZ6wLXGBYEdPa0__XhAb2r08Hm8cX92jDv_7IzkWneyzTE-gzz2fIwhIClFMLyNqZsr0hLmd4p6iF3ZoF0if-K3iv5Yq8nw9kiMjfWUgIr2el6rPdlr59GvLcK4OHPkHLcNCb41kzw8I_wYZoDW_d5CE6RO_hSqzp9ljihBJ54Hw',
        // 'Authorization' : 'Bearer cr9qu3Ju7Vo7',
        'Content-Type': 'application/json',
        'access_token' : 'cr9qu3Ju7Vo7',
        'client_id' : 'kjiLnbesiMMD',
        // 'idContaOrigem' : '17'
      })
    };

    const apiUrlForStep3Transfer = 'https://sandbox.conductor.com.br/pier/v2/api/contas/18/transferencias-creditos-cartoes?id_conta_destino=24&valor_transferencia=50';
    // const apiUrlForStep3Transfer = 'https://sandbox.conductor.com.br/pier/v2/api/contas/17/transferencias-creditos-cartoes?id_conta_destino='+ this.idConta + '&valor_transferencia='+this.brlValue;
    const postData = {idContaOrigem : 17};

    this.http.post(apiUrlForStep3Transfer, postData, httpOptions)
      .subscribe(data => {
        console.log(data);
       }, error => {
        console.log(error);
      });

    this.navCtrl.push(SenhaPagamentoPage);
  }

}

// export interface CognitoUserSessionData {
//   IdToken: string;
//   AccessToken: string;
//   RefreshToken?: string;
// }

// export class CognitoUserSession {
//   constructor(data: CognitoUserSessionData);

//   public getIdToken(): CognitoIdToken;
//   public getRefreshToken(): CognitoRefreshToken;
//   public getAccessToken(): CognitoAccessToken;
//   public isValid(): boolean;
// }