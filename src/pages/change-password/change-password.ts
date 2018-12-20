import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { IModalParams, ModelParamOptions, BusinessService } from '../../common/common.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ICognitoChangePassword } from '../../aws/aws.module';


@IonicPage()
@Component({
  selector: 'page-change-password',
  templateUrl: 'change-password.html',
})
export class ChangePasswordPage {

  profileForm: FormGroup;
  submitAttempt: boolean = false;
  validation_messages: any;

  constructor(private businessService: BusinessService, private fb: FormBuilder, private loadingController: LoadingController,
              public navCtrl: NavController, public navParams: NavParams, private toastController: ToastController,
              public viewController: ViewController) {
  }

  buildForm() {
    let self = this;

    self.validation_messages = {
      'oldPassword': [
        { type: 'required', message: 'Old password is required' },
        { type: 'minlength', message: 'Old password must be at least 5 characters long' }
      ],
      'newPassword': [
        { type: 'required', message: 'New password is required' },
        { type: 'minlength', message: 'New password must be at least 5 characters long' }
      ],
      'retype': [
        { type: 'required', message: 'Retype password is required' },
        { type: 'validateEqual', message: 'Retype password mismatch' }
      ]
    };
    self.profileForm = self.fb.group({
      newPassword: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      oldPassword: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
      retype: ['', Validators.compose([Validators.required])]
    }, { updatedOn: 'blur'});
  }

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

  ionViewDidLoad() { }

  ngOnInit() {
    let self = this;

    self.buildForm();
  }

  save() {
    let self = this;

    if (self.profileForm.valid) {
      let loader = self.loadingController.create({
        showBackdrop: false,
        spinner: 'dots'
      });

      let toast = self.toastController.create({
        duration: 5000,
        position: 'bottom'
      });

      let pwd: ICognitoChangePassword = { oldPassword: self.profileForm.controls['oldPassword'].value, newPassword: self.profileForm.controls['newPassword'].value };

      loader.present()
      .then(() => {
        self.businessService.changePassword(pwd.oldPassword, pwd.newPassword)
        .then((data) => {
          console.log('data',data);
          loader.dismiss();
          self.cancel(data, ModelParamOptions.SAVE);
        })
        .catch((error) => {
          loader.dismiss();
          console.log('error changePassword', error);
          if (error.message) {
            toast.setMessage(error.message);
            toast.setCssClass('dangerToast');
            toast.present();
          }
        });
      }, () => {
        loader.dismiss();
      });
    }
  }

}
