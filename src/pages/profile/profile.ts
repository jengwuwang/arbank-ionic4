import { Component,OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ViewController } from 'ionic-angular';
import { ModelParamOptions, IModalParams, IBrMaskModel, ICountry, BusinessService, ValidatorService, PhoneValidator } from '../../common/common.module';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ICognitoProfile } from '../../aws/aws.module';

import libphonenumber from 'google-libphonenumber';
import { ICognitoUserAttributeData } from 'amazon-cognito-identity-js';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
requiredrequired
  brConfig: IBrMaskModel = {};requiredrequirequiredred
  cognitoProfile: ICognitoProfile;
  countries: Array<ICountry> = [];
  dial_code: string = '';
  country_example_number: string;
  example_number_formatted: string;
  submitAttempt: boolean = false;
  PNF = libphonenumber.PhoneNumberFormat;
  PNT = libphonenumber.PhoneNumberType;
  profileForm: FormGroup;
  phone_validation_messages: {} = {};
  util: libphonenumber.PhoneNumberUtil = libphonenumber.PhoneNumberUtil.getInstance();
  validation_messages:any;

  constructor(private businessService: BusinessService, private fb: FormBuilder, private loadingController: LoadingController,
              private viewController: ViewController, public navCtrl: NavController, public navParams: NavParams) {
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
        { type: 'minlength', message: 'CPF ou CNPJ deve ter pelo menos 11 dígitos' },
        { type: 'maxlength', message: 'CPF ou CNPJ não pode ter mais de 11 dígitos' },
        { type: 'pattern', message: 'CPF ou CNPJ deve conter apenas dígitos' }
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

    self.cognitoProfile = self.businessService.authUser.cognitoProfile;
    self.cognitoProfile.country_and_code__c = self.cognitoProfile.country_and_code__c == undefined ? 'BR' : self.cognitoProfile.country_and_code__c;
    self.cognitoProfile.phone_number = self.cognitoProfile.phone_number == undefined ? undefined : self.util.format(self.util.parse(self.cognitoProfile.phone_number,<string>self.cognitoProfile.country_and_code__c), self.PNF.NATIONAL);

    self.dial_code = '+' + self.util.getCountryCodeForRegion(<string>self.cognitoProfile.country_and_code__c);
    self.country_example_number = self.util.getExampleNumberForType(<string>self.cognitoProfile.country_and_code__c, self.PNT.MOBILE);
    self.example_number_formatted = self.util.format(self.country_example_number, self.PNF.NATIONAL);
    self.brConfig.mask = self.example_number_formatted;

    let country_and_code = new FormControl(self.cognitoProfile.country_and_code__c, Validators.compose([Validators.required]));

    self.profileForm = self.fb.group({
      given_name: [self.cognitoProfile.given_name, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(1), Validators.maxLength(30)])],
      family_name: [self.cognitoProfile.family_name, Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(3), Validators.maxLength(30)])],
      username: [{ value:self.cognitoProfile.preferred_username, disabled:true }, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(25)])],
      email: [self.cognitoProfile.email, Validators.compose([Validators.required, ValidatorService.ValidateEmail])],
      birthdate: [self.cognitoProfile.birthdate, Validators.compose([Validators.required])],
      country_and_code__c: country_and_code,
      phone_number: [self.cognitoProfile.phone_number, Validators.compose([PhoneValidator.validCountryPhone(country_and_code)])]
    });
  }

  ionViewDidLoad() { }

  cancel(data?:any, operation?:string) {
    let self = this;

    let params: IModalParams = {};
    if (operation){
      params.operation = operation;
    } else {
      params.operation = ModelParamOptions.CANCEL;
    }
    if (data){
      params.param = data;
    }

    self.viewController.dismiss(params);
  }

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

  async save() {
    let self = this;

    if (self.profileForm.valid) {
      let loader = self.loadingController.create({
        showBackdrop: false,
        spinner: 'dots'
      });

      let oprofile: ICognitoProfile = this.profileForm.value;
      oprofile.phone_number = self.util.format(self.util.parse(oprofile.phone_number, <string>oprofile.country_and_code__c),self.PNF.E164);
      let attributes: ICognitoUserAttributeData[] = await self.businessService.getCognitoAttributesData(oprofile, true);


      loader.present()
      .then(() => {

        self.businessService.updateCognitoProfile(attributes)
        .then((data) => {

          loader.dismiss();
          self.businessService.authUser.cognitoProfile = data;
          self.cancel({'cognitoProfile':self.businessService.authUser}, ModelParamOptions.SAVE);

        })
        .catch((err)=> {
          console.log('error returned from update.', err);
          loader.dismiss();
        });
      }, () => {
        loader.dismiss();
      });
    }
  }

}
