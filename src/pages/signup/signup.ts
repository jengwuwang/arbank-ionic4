import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PhoneValidator, ICountry, IBrMaskModel, BusinessService } from '../../common/common.module';

import libphonenumber from 'google-libphonenumber';
import { ICognitoSignUpCredentials, ICognitoException } from '../../aws/aws.module';
import { HomePage, SignupconfirmPage, LoginPage } from '../pages.module';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  brConfig: IBrMaskModel = {};
  countries: Array<ICountry> = [];
  country_example_number: string;
  example_number_formatted: string;
  dial_code: string = '';
  phoneUtil: libphonenumber.PhoneNumberUtil = libphonenumber.PhoneNumberUtil.getInstance();
  PNF = libphonenumber.PhoneNumberFormat;
  PNT = libphonenumber.PhoneNumberType;
  signupForm: FormGroup;
  submitAttempt: boolean = false;
  validation_messages: any;

  constructor(private businessService: BusinessService, private fb: FormBuilder, private loadingController: LoadingController,
              private toastController: ToastController, public navCtrl: NavController, public navParams: NavParams) {
  }

  buildForm() {
    let self = this;

    self.loadCountries();

    self.validation_messages = {
      'email': [
        { type: 'required', message: 'E-mail é obrigatório' },
        { type: 'email', message: 'Entre com um email válido' }
      ],
      'username': [
        { type: 'required', message: 'CPF ou CNPJ é obrigatório' },
        { type: 'minlength', message: 'CPF deve ter pelo menos 11 dígitos' },
        { type: 'maxlength', message: 'CPF deve ter pelo menos 11 dígitos' },
        { type: 'pattern', message: 'CPF ou CNPJ deve conter apenas dígitos' }
      ],
      'password': [
        { type: 'required', message: 'Senha obrigatória' },
        { type: 'minlength', message: 'A senha deve ter pelo menos 8 caracteres' },
        { type: 'pattern', message: 'A senha deve conter pelo menos 1 letra maiúscula, minúscula e número' }
      ],
      'confirmPassword': [
        { type: 'required', message: 'Obrigatório confirmar senha' },
        { type: 'validateEqual', message: 'Senhas divergentes, tente novamente.' }
      ],
      'given_name': [
        { type: 'required', message: 'Nome Completo é necessário' },
        { type: 'pattern', message: 'O nome deve conter apenas caracteres alfabéticos' },
        { type: 'minlength', message: 'O nome deve ter pelo menos dois caracteres' },
        { type: 'maxlength', message: 'O nome não pode ter mais de 30 caracteres' }
      ],
      "family_name": [
        { type: 'required', message: 'O sobrenome é obrigatório' },
        { type: 'pattern', message: 'O sobrenome deve conter apenas caracteres alfa' },
        { type: 'minlength', message: 'O sobrenome deve ter pelo menos dois caracteres' },
        { type: 'maxlength', message: 'O sobrenome não pode ter mais de 30 caracteres' }
      ],
      'birthdate': [
        { type: 'required', message: 'Data de nascimento é obrigatória' }
      ],
      'country_and_code__c': [
        { type: 'required', message: 'País é obrigatório' }
      ],
      'phone_number': [
        { type: 'required', message: 'Celular é obrigatório' },
        { type: 'validCountryPhone', message: 'O celular está incorreto para o país selecionado' }
      ]
    };

    let initial_country = self.countries[0];

    let country_and_code = new FormControl(initial_country.code, Validators.compose([Validators.required]));

    self.dial_code = '+' + self.phoneUtil.getCountryCodeForRegion(initial_country.code);
    self.country_example_number = self.phoneUtil.getExampleNumberForType(initial_country.code, self.PNT.MOBILE);
    self.example_number_formatted = self.phoneUtil.format(self.country_example_number, self.PNF.NATIONAL);

    self.brConfig.mask = self.example_number_formatted;

    self.signupForm = self.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      username: ['', Validators.compose([Validators.required, Validators.minLength(14)])],
      given_name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(30)])],
    //family_name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(30)])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(8)])],
      confirmPassword: ['', Validators.compose([Validators.required])],
      birthdate: ['', Validators.compose([Validators.required])],
      country_and_code__c: country_and_code,
      phone_number: ['', Validators.compose([Validators.required, PhoneValidator.validCountryPhone(country_and_code)])]
    });
  }

  goToLogin() {
    this.navCtrl.push(LoginPage);
  }

  ionViewDidLoad() { }

  loadCountries() {
    let self = this;

    let br: ICountry = {id:76,code:'BR',dial_code:'+55',flag:null,name:'Brasil',sortOrder:0};
    let us: ICountry = {id:232,code:'US',dial_code:'+1',flag:null,name:'United States',sortOrder:1};
    let ca: ICountry = {id:70,code:'CA',dial_code:'+1',flag:null,name:'Canada',sortOrder:2};
    let mx: ICountry = {id:156,code:'MX',dial_code:'+52',flag:null,name:'Mexico',sortOrder:3};

    self.countries.push(br);
    self.countries.push(us);
    self.countries.push(ca);
    self.countries.push(mx);
  }

  ngOnInit() {
    let self = this;

    self.buildForm();
  }

  onSelect($event){
    let self = this;

    self.signupForm.controls['phone_number'].reset();
    self.dial_code = '+' + self.phoneUtil.getCountryCodeForRegion($event);
    self.country_example_number = self.phoneUtil.getExampleNumberForType($event, self.PNT.MOBILE);
    self.example_number_formatted = self.phoneUtil.format(this.country_example_number, self.PNF.NATIONAL);
    self.brConfig.mask = self.example_number_formatted;
  }

  signUp() {
    console.log('signup form', this.signupForm);
    let self = this;

    self.submitAttempt = true;

    let toast = this.toastController.create({
      duration: 5000,
      position: 'bottom'
    });

    if (self.signupForm.valid) {
      let loader = self.loadingController.create({
        showBackdrop: false,
        spinner: 'dots'
      });

      let creds: ICognitoSignUpCredentials = this.signupForm.value;
      creds.phone_number = self.phoneUtil.format(self.phoneUtil.parse(creds.phone_number, <string>creds.country_and_code__c),self.PNF.E164);

      loader.present()
      .then(() => {
        loader.dismiss();

        self.businessService.signUp(creds)
          .then((data) => {
            console.log(`signupresult user data returned successful`,data);

            self.businessService.signIn(creds)
              .then((user)=> {

                loader.dismiss();
                self.signupForm.reset();
                self.navCtrl.push(HomePage);

              }).catch((err:ICognitoException) => {
                loader.dismiss();
                console.log('signIn error happened..', err);
                if (err.code === 'UserNotConfirmedException') {
                  self.signupForm.reset();
                  self.navCtrl.push(SignupconfirmPage);
                }
              });

          }).catch((err: ICognitoException)=> {

            toast.setMessage(err.message);
            toast.setCssClass('dangerToast');
            toast.present();
            loader.dismiss();

          });
      }, () => {
        loader.dismiss();
      });
    }
    else {

    }
  }

}
