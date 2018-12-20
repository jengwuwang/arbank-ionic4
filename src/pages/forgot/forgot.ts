import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CognitoService, ICognitoException } from '../../aws/aws.module';
import { ForgotConfirmPage } from '../pages.module';

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
})
export class ForgotPage {

  submitAttempt: boolean = false;
  forgotForm: FormGroup;

  constructor(private cognitoService: CognitoService, private fb: FormBuilder, public navCtrl: NavController, 
              public navParams: NavParams, private toastController: ToastController) {
  }

  ngOnInit() {
    this.buildForm();
  }

  ionViewDidLoad() { }

  buildForm(): any {
    this.forgotForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
    }, { updatedOn: 'blur'});
  }

  submit() {
    let self = this;

    self.submitAttempt = true;

    let toast = self.toastController.create({
      duration: 5000,
      position: 'bottom'
    });
    
    if (self.forgotForm.valid) {
      self.cognitoService.forgotPassword(self.forgotForm.get('username').value)
        .then((result) => {
          self.forgotForm.reset();
          console.log('this is the result from forgot password', result);
          this.navCtrl.push(ForgotConfirmPage);
        })
        .catch((err: ICognitoException) => {
          console.log('this is the result from the forgot password error', err);
          toast.setMessage(err.message);
          toast.present();
        });
    }
  }

}
