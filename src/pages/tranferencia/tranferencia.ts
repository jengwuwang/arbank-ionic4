import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { MyCardPage, TransferenciaSegundaPage } from '../pages.module';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Storage } from '@ionic/storage';
import { AuthUser, ICognitoCredentials, ICognitoException, CognitoService, ICognitoSignUpCredentials, IAuthUser, ICognitoProfile } from "../../aws/aws.module";

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
  realAccountID: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public http: HttpClient, 
              private fb: FormBuilder, 
              private storage:Storage, 
              private toastController: ToastController) {
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
  
      const apiUrlForLimitValue = 'https://sandbox.conductor.com.br/pier/v2/api/limites-disponibilidades?idConta='+this.realAccountID;
       
      this.http.get(apiUrlForLimitValue, httpOptions).subscribe(result => {
          this.products = result;
          this.limitedValue = this.products.saldoDisponivelGlobal;
      });
    });
  }

  ionViewDidLoad() {}

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
        self.storage.get('authUser').then((val_idConta) => {
          let idToken = val;
          let data = val_idConta;
          let idPessoa = data.cognitoProfile.idPessoa;

          const httpOptions = {
            headers: new HttpHeaders({
              'Access-Control-Allow-Origin': '*',
              'Authorization' : idToken.toString(),
              'Content-Type': 'application/json; charset=utf-8',
            })
          };

          const apiUrlForCardID = 'https://yo0ex03d21.execute-api.sa-east-1.amazonaws.com/Prod/RPNet/Emissor/Cartao/GetCartao';

          this.http.get(apiUrlForCardID, httpOptions).subscribe(result => {
              this.products = result;
              self.storage.set('cardID', this.products.id);
              this.navCtrl.push(TransferenciaSegundaPage);
          },
          error => {
            toast.setMessage('Esta conta não é válida.');
            toast.present();
          });
        });
      });
    }
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
