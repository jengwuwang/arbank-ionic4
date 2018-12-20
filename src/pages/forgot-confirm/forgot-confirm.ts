import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICognitoException, CognitoService } from '../../aws/aws.module';
import { LoginPage } from '../pages.module';


@IonicPage()
@Component({
  selector: 'page-forgot-confirm',
  templateUrl: 'forgot-confirm.html',
})
export class ForgotConfirmPage {

  submitAttempt: boolean = false;
  forgotConfirmForm: FormGroup;
  
  constructor(private cognitoService: CognitoService, private fb: FormBuilder, 
              public navCtrl: NavController, public navParams: NavParams,
              private toastController: ToastController) {
  }

  buildForm() {
    this.forgotConfirmForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      verificationCode: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      password: ['', Validators.compose([Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.required])]
    },{ updatedOn: 'blur'});
  }

  ionViewDidLoad() { }

  ngOnInit() {
    this.buildForm();
  }

  submit() {
    this.submitAttempt = true;
    
    if (this.forgotConfirmForm.valid) {
      this.cognitoService.confirmPassword(this.forgotConfirmForm.get('username').value, this.forgotConfirmForm.get('verificationCode').value,this.forgotConfirmForm.get('password').value)
        .then((result) => {
          this.forgotConfirmForm.reset();
          console.log('this is the result from forgot password', result);
          this.navCtrl.push(LoginPage);
        })
        .catch((err: ICognitoException) => {
          console.log('this is the result from the forgot password error', err);

          let toast = this.toastController.create({
            message: err.message,
            duration: 5000,
            position: 'bottom'
          });

          toast.present();
        });
    }
  }

}
