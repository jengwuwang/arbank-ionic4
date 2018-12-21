import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TransferenciaTerceiraPage, ComprovanteContaPage } from '../pages.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { AuthUser, ICognitoCredentials, ICognitoException, CognitoService, ICognitoSignUpCredentials, IAuthUser, ICognitoProfile } from "../../aws/aws.module";

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
  cognitoUserData: any;
  sessionToken: any;

  constructor(
              public navCtrl: NavController, 
              public navParams: NavParams, 
              private fb: FormBuilder, 
              public http: HttpClient, 
              private toastController: ToastController,
              private storage:Storage,
              private cognitoService: CognitoService) {
    let self = this;

    self.storage.get('idConta').then((val) => {
        this.idConta = val;
    });

    self.storage.get('authUser').then((result) => {
        let data = result;
        this.sessionToken = data.authCredentials.sessionToken;
    });

  }

  ionViewDidLoad() {}

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
      self.storage.get('idToken').then((val_idToken) => {
        self.storage.get('cardID').then((val_cardID) => {
          let authToken = val_idToken;
          let cardID = val_cardID;
          
          const apiUrlForConfirmPassword = 'https://yo0ex03d21.execute-api.sa-east-1.amazonaws.com/Prod/RPNet/Emissor/Cartao/GetValidarSenha?senha='+this.password+'&idCartao='+cardID;
          const httpOptions = {
            headers: new HttpHeaders({
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json; charset=utf-8',
              'Authorization' : authToken.toString(),
              'access_token' : this.sessionToken.toString(),
            })
          };

          this.http.get(apiUrlForConfirmPassword, httpOptions).subscribe(result => {
            this.products = result;
            if(this.products.mensagem == 'Ok, senha válida.'){
              this.navCtrl.push(ComprovanteContaPage);
            }
          },
          error => {
            toast.setMessage('A senha está incorreta. Por favor, tente novamente.');
            toast.present();
          });
        });
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
