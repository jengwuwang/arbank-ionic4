import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TranferenciaPage, TransferenciaTerceiraPage } from '../pages.module';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the TransferenciaSegundaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-transferencia-segunda',
  templateUrl: 'transferencia-segunda.html',
})

export class TransferenciaSegundaPage {
  @ViewChild('brlValue') brlValueRef: ElementRef;

  stepSecondForm: FormGroup;
  validation_messages: any;
  products: any;
  limitedValue : any;
  brlValue : any;
  viewFlag : any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpClient, private fb: FormBuilder, private toastController: ToastController, private storage:Storage) {
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
    this.viewFlag = true;
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TransferenciaSegundaPage');
  }

  onTrans() {
    this.navCtrl.push(TranferenciaPage);
  }

  onTransPart3() {
    let self = this;
    let toast = self.toastController.create({
      duration: 5000,
      position: 'bottom'
    });

    if (self.stepSecondForm.valid) {
      let realBrlValue = this.brlValue.replace(/\D+/g, '');
      if(realBrlValue > this.limitedValue) {
        // console.log(document.getElementById("brlValue"));
        this.viewFlag = !this.viewFlag;
        toast.setMessage('O valor máximo é ' + this.limitedValue);
        toast.present();

        return false;
      } else {
        if(realBrlValue[0] == '0') {
          realBrlValue = realBrlValue[1] + realBrlValue[2];
        }

        this.viewFlag = !this.viewFlag;
        self.storage.set('brlValue', realBrlValue);
        this.navCtrl.push(TransferenciaTerceiraPage);
      }
    }
  }

  validateBrlValue() {
    let self = this;

    self.validation_messages = {
      'brlValue': [
        { type: 'required', message: 'O valor em BRL é obrigatório.' },
      ],
    };

    self.stepSecondForm = self.fb.group({
      brlValue: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
    let self = this;

    self.validateBrlValue();
  }
}
