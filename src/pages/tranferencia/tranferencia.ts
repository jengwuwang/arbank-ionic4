import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MyCardPage, TransferenciaSegundaPage } from '../pages.module';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { CognitoConfig } from '../../aws/cognito.config';
import { BusinessService } from '../../common/common.module';

/**
 * Generated class for the TranferenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tranferencia',
  templateUrl: 'tranferencia.html',
})
export class TranferenciaPage {
  products: any;
  limitedValue : any;
  validation_messages: any;
  stepOneForm: FormGroup;
  account_id : any;
  idToken: any;
  private config = CognitoConfig;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public http: HttpClient, private fb: FormBuilder, 
              private storage:Storage, private toastController: ToastController) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : 'Bearer cr9qu3Ju7Vo7',
        'Content-Type': 'application/json',
        'access_token' : 'cr9qu3Ju7Vo7',
        'client_id' : 'kjiLnbesiMMD'
      })
    };

    const apiUrlForLimitValue = 'https://sandbox.conductor.com.br/pier/v2/api/limites-disponibilidades?idConta=17';
     
    this.http.get(apiUrlForLimitValue, httpOptions).subscribe(result => {
        this.products = result;
        this.limitedValue = this.products.saldoDisponivelGlobal;
    });

    console.log(this.config);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranferenciaPage');
  }

  onDados() {
    this.navCtrl.push(MyCardPage);
  }

  onTransPart2() {
    let self = this;
    let toast = self.toastController.create({
      duration: 5000,
      position: 'bottom'
    });

    if (self.stepOneForm.valid) {
      self.storage.get('idToken').then((val) => {
          console.log(val);
          this.idToken = val;
          const apiUrlForAccountID = 'https://yo0ex03d21.execute-api.sa-east-1.amazonaws.com/Prod/RPNet/Emissor/Cartao/GetCartao?idCartao='+this.account_id;
          
          const httpOptions = {
            headers: new HttpHeaders({
              'Access-Control-Allow-Origin': '*',
              'Authorization' : 'eyJraWQiOiJyWVE1cFd3OHRtMFBqUjUxMEt1K2hkM3JxOCs3czRPOStGWWJjckdncW93PSIsImFsZyI6IlJTMjU2In0.eyJjdXN0b206aWRDb250YSI6IjE4IiwiY3VzdG9tOmNvdW50cnlfYW5kX2NvZGUiOiJCUiIsInN1YiI6IjRhOWJkMDQ1LWU2Y2ItNGIxYy1hNDhlLWRhZTFkZmI5M2RhZiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiYmlydGhkYXRlIjoiMTk2OC0xMS0yNyIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX2NuRlR0VnNnRyIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6IjkzMi4zNDUuMjY4LTIwIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiOTMyLjM0NS4yNjgtMjAiLCJnaXZlbl9uYW1lIjoiamVhbiB0ZXN0aW5nIiwiYXVkIjoiNmw5bmlnZmFsZGJuN3NqN3RoaWIxMnI0cCIsImV2ZW50X2lkIjoiMjY4OTJkMTEtMDNjNy0xMWU5LWI5NmItZWY4NmZhNjU1MTI2IiwiY3VzdG9tOm1icl9zaW5jZSI6IjIwMTgiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU0NTI0ODk0OSwicGhvbmVfbnVtYmVyIjoiKzU1MTI5OTc0NDk0MDciLCJleHAiOjE1NDUyNTI1NDksImlhdCI6MTU0NTI0ODk0OSwiY3VzdG9tOmlkUGVzc29hIjoiMjEiLCJlbWFpbCI6ImplYW5Acm9hZHBhc3MuY29tLmJyIn0.f7h8djmlHyi69ho8VVK672FakLb_8o8mROShaM8gLHdd4Ggma7bsq-WegOP6z8FoZUwVlvlAMuZClhzBEV2oJtzTAqsdnU3EijXpRhQC-ej6RNT752ZvfdgFl7irteSFVH94pWyq9TmpCt1M45z-iT7IBTD1tf_wv8__TfmycNR5ZDKTvx-7qy97yVysueU3sb-WWM2-PGbJxyX8Ro8P4SFkl5KCzlxIX5HFcDznVkngvzOmDGFSILCcylwUWPoV6GcNkITpVmJMQHxwIfqOZW8mhMptHNe6WOHDnPi-32elV0TCBZo0k-vkZOnT-JhHRM5Rx3OX16uZFeOQG3_cOA',
              // 'Authorization' : val,
              'Content-Type': 'application/json; charset=utf-8',
            })
          };

          this.http.get(apiUrlForAccountID, httpOptions).subscribe(result => {
              this.products = result;
              console.log(this.products);
              self.storage.set('idConta', this.products.idConta);
              this.navCtrl.push(TransferenciaSegundaPage);
          },
          error => {
            toast.setMessage('Esta conta não é válida.');
            toast.present();
          });
      });
    }

    // self.storage.set('account_id', this.account_id);
    // this.navCtrl.push(TransferenciaSegundaPage);
  }

  validateAccountNumber() {
    let self = this;

    self.validation_messages = {
      'account_id': [
        { type: 'required', message: 'ID da conta é obrigatório.' },
      ],
    };

    self.stepOneForm = self.fb.group({
      account_id: ['', Validators.compose([Validators.required])],
    });
  }


  ngOnInit() {
    let self = this;

    self.validateAccountNumber();
  }

}
