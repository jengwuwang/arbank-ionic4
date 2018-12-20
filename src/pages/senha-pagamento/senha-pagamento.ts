import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TransferenciaTerceiraPage, ComprovanteContaPage } from '../pages.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { CognitoConfig } from '../../aws/cognito.config';

/**
 * Generated class for the SenhaPagamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-senha-pagamento',
  templateUrl: 'senha-pagamento.html',
})
export class SenhaPagamentoPage {

  confirmPasswordForm: FormGroup;
  validation_messages: any;
  products: any;
  password: any;
  idConta: any;
  private config = CognitoConfig;

  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams, 
              private fb: FormBuilder, 
              public http: HttpClient, 
              private toastController: ToastController,
              private storage:Storage) {
    let self = this;

    self.storage.get('idConta').then((val) => {
        this.idConta = val;
    });

    console.log(this.config);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SenhaPagamentoPage');
  }

  onPagarConta() {
    this.navCtrl.push(TransferenciaTerceiraPage);
  }

  onComprovanteConta() {
    let self = this;
    let toast = self.toastController.create({
      duration: 5000,
      position: 'bottom'
    });

    if (self.confirmPasswordForm.valid) {
        // const apiUrlForConfirmPassword = 'https://sandbox.conductor.com.br/pier/v2/api/cartoes/24/validar-senha';
        const apiUrlForConfirmPassword = 'https://yo0ex03d21.execute-api.sa-east-1.amazonaws.com/Prod/RPNet/Emissor/Cartao/GetCartao/api/cartoes/'+ this.idConta + '/validar-senha=' + this.password;

        const httpOptions = {
          headers: new HttpHeaders({
            'Access-Control-Allow-Origin': '*',
            'Authorization' : 'eyJraWQiOiJyWVE1cFd3OHRtMFBqUjUxMEt1K2hkM3JxOCs3czRPOStGWWJjckdncW93PSIsImFsZyI6IlJTMjU2In0.eyJjdXN0b206aWRDb250YSI6IjE4IiwiY3VzdG9tOmNvdW50cnlfYW5kX2NvZGUiOiJCUiIsInN1YiI6IjRhOWJkMDQ1LWU2Y2ItNGIxYy1hNDhlLWRhZTFkZmI5M2RhZiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiYmlydGhkYXRlIjoiMTk2OC0xMS0yNyIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX2NuRlR0VnNnRyIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6IjkzMi4zNDUuMjY4LTIwIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiOTMyLjM0NS4yNjgtMjAiLCJnaXZlbl9uYW1lIjoiamVhbiB0ZXN0aW5nIiwiYXVkIjoiNmw5bmlnZmFsZGJuN3NqN3RoaWIxMnI0cCIsImV2ZW50X2lkIjoiMjY4OTJkMTEtMDNjNy0xMWU5LWI5NmItZWY4NmZhNjU1MTI2IiwiY3VzdG9tOm1icl9zaW5jZSI6IjIwMTgiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU0NTI0ODk0OSwicGhvbmVfbnVtYmVyIjoiKzU1MTI5OTc0NDk0MDciLCJleHAiOjE1NDUyNTI1NDksImlhdCI6MTU0NTI0ODk0OSwiY3VzdG9tOmlkUGVzc29hIjoiMjEiLCJlbWFpbCI6ImplYW5Acm9hZHBhc3MuY29tLmJyIn0.f7h8djmlHyi69ho8VVK672FakLb_8o8mROShaM8gLHdd4Ggma7bsq-WegOP6z8FoZUwVlvlAMuZClhzBEV2oJtzTAqsdnU3EijXpRhQC-ej6RNT752ZvfdgFl7irteSFVH94pWyq9TmpCt1M45z-iT7IBTD1tf_wv8__TfmycNR5ZDKTvx-7qy97yVysueU3sb-WWM2-PGbJxyX8Ro8P4SFkl5KCzlxIX5HFcDznVkngvzOmDGFSILCcylwUWPoV6GcNkITpVmJMQHxwIfqOZW8mhMptHNe6WOHDnPi-32elV0TCBZo0k-vkZOnT-JhHRM5Rx3OX16uZFeOQG3_cOA',
            // 'Authorization' : 'Bearer cr9qu3Ju7Vo7',
            'Content-Type': 'application/json; charset=utf-8',
            // 'access_token' : 'cr9qu3Ju7Vo7',
            // 'client_id' : 'kjiLnbesiMMD',
            // 'senha' : this.password
          })
        };

        this.http.get(apiUrlForConfirmPassword, httpOptions).subscribe(result => {
          this.products = result;
          console.log(result);
          if(this.products.mensagem == 'Ok, senha válida.'){
            this.navCtrl.push(ComprovanteContaPage);
          }
        },
        error => {
          toast.setMessage('A senha está incorreta. Por favor, tente novamente.');
          toast.present();
        });
    } else {
      toast.setMessage('Por favor digite a senha correta.');
      toast.present();
    }
  }

  buildForm() {
    let self = this;

    self.validation_messages = {
      'password': [
        { type: 'required', message: 'Senha obrigatória' }
      ]
    };

    self.confirmPasswordForm = self.fb.group({
      password: ['', Validators.compose([Validators.required])]
    }, { updatedOn: 'blur'});

  }

  ngOnInit() {
    let self = this;

    self.buildForm();
  }

}
