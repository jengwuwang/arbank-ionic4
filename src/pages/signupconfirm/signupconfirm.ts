import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICognitoException, CognitoException, CognitoService } from '../../aws/aws.module';
import { LoginPage } from '../pages.module';


@IonicPage()
@Component({
  selector: 'page-signupconfirm',
  templateUrl: 'signupconfirm.html',
})
export class SignupconfirmPage {

  confirmForm: FormGroup;
  submitAttempt: boolean = false;
  validation_messages: any;
  

  constructor(private cognitoService: CognitoService, private fb: FormBuilder, private toastController: ToastController,
              private loadingController: LoadingController, public navCtrl: NavController, public navParams: NavParams) {
  }

  buildForm() {
    let self = this;

    self.validation_messages = {
      'confirmationCode': [
        { type: 'required', message: 'Confirmation code is required' },
        { type: 'minlength', message: 'Enter a valid confirmation code' }
      ]
    };

    self.confirmForm = self.fb.group({
      confirmationCode: ['', Validators.compose([Validators.required, Validators.minLength(5)])]
    });
  }

  confirm () {
    let self = this;
    self.submitAttempt = true;

    let toast = self.toastController.create({
      duration: 5000,
      position: 'bottom'
    });

    if (self.confirmForm.valid) {

      let loader = self.loadingController.create({
        showBackdrop: false,
        spinner: 'dots'
      });

      loader.present()
      .then(() => {
        self.cognitoService.confirmRegistration(self.confirmForm.get('confirmationCode').value)
          .then((data) => {
            console.log(`confirm registration data returned successful`,data);
            console.log('username', self.cognitoService.cognitoUser.getUsername());
            loader.dismiss();
            self.navCtrl.push(LoginPage);

          }).catch((err: ICognitoException)=> {
            loader.dismiss();
            console.log(`error happened`,err);
            console.log('username', self.cognitoService.cognitoUser.getUsername());
            toast.setMessage(err.message);
            toast.present();
            
          })
      }, (() => {
        loader.dismiss();
      })); 
    } 

  }

  ionViewDidLoad() { }

  ngOnInit() {
    let self = this;

    self.buildForm();
  }

  resend() {
    let self = this;

    let toast = this.toastController.create({
      duration: 5000,
      position: 'bottom'
    });
    
    self.cognitoService.resendConfirmationCode()
      .then((result) => {
        console.log('confirmation code resent');
        toast.setMessage('confirmation code resent');
        toast.present();
      }).catch((err) => {
        let exception: ICognitoException = new CognitoException(err);
        console.log('oops something went wrong sending confirmation code',exception);
        toast.setMessage(exception.message);
        toast.present();
      });
  }

}
