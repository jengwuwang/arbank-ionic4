import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HomePage, MyCardPage, ForgotPage } from '../pages.module';
import { ICognitoException, ICognitoCredentials } from '../../aws/aws.module';
import { BusinessService } from '../../common/common.module';
import { SignupPage } from '../signup/signup';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  loginForm: FormGroup;
  validation_messages: any;
  submitAttempt: boolean = false;

  constructor(private businessService: BusinessService, private fb: FormBuilder, private loadingController: LoadingController,
              private toastController: ToastController, public navCtrl: NavController, public navParams: NavParams) {

  }

  buildForm() {
    let self = this;

    self.validation_messages = {
      'username': [
        { type: 'required', message: 'CPF ou CNPJ é obrigatório' },
        { type: 'minlength', message: 'CPF ou CNPJ inválidos' },
        { type: 'maxlength', message: 'CPF ou CNPJ inválidos' },
        { type: 'pattern', message: 'CPF ou CNPJ deve conter apenas dígitos' }
      ],
      'password': [
        { type: 'required', message: 'Senha obrigatória' }
      ]
    };

    self.loginForm = self.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(14)])],
      password: ['', Validators.compose([Validators.required])]
    }, { updatedOn: 'blur'});

  }

  goToForgot() {
    this.navCtrl.push(ForgotPage);
  }

  signup() {
      this.navCtrl.push(SignupPage);
  }

  ionViewDidLoad() { }

  ngOnInit() {
    let self = this;

    self.buildForm();
  }

  login() {
    let self = this;

    self.submitAttempt = true;

    let toast = self.toastController.create({
      duration: 5000,
      position: 'bottom'
    });

    if (self.loginForm.valid) {
      let loader = self.loadingController.create({
        showBackdrop: false,
        spinner: 'dots'
      });

      let creds: ICognitoCredentials = self.loginForm.value;

      loader.present()
      .then(async () => {
        await self.businessService.signIn(creds)
        .then((resp) => {
          self.loginForm.reset();
         loader.dismiss();
        })
        .then(() => {
          self.navCtrl.setRoot(MyCardPage);
        })
        .catch((error: ICognitoException) => {
          console.log('error', error);
          loader.dismiss();
          toast.setMessage(error.message);
          toast.present();
        });
      }, () => {
        loader.dismiss();
      });
    }
    else {

    }
  }
}
