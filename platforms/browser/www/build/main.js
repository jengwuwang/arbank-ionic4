webpackJsonp([18],{

/***/ 102:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 104:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CognitoConfig; });
var CognitoConfig = {
    region: 'us-east-2',
    userPoolId: 'us-east-2_cnFTtVsgG',
    appId: '6l9nigfaldbn7sj7thib12r4p',
    idpUrl: 'cognito-idp.us-east-2.amazonaws.com',
    identityPoolId: 'us-east-2:f8c7a28b-ab09-42c6-942f-e3eb99e78509'
};
//# sourceMappingURL=cognito.config.js.map

/***/ }),

/***/ 128:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChangePasswordPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_common_module__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ChangePasswordPage = (function () {
    function ChangePasswordPage(businessService, fb, loadingController, navCtrl, navParams, toastController, viewController) {
        this.businessService = businessService;
        this.fb = fb;
        this.loadingController = loadingController;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastController = toastController;
        this.viewController = viewController;
        this.submitAttempt = false;
    }
    ChangePasswordPage.prototype.buildForm = function () {
        var self = this;
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
            newPassword: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].minLength(5)])],
            oldPassword: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].minLength(5)])],
            retype: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required])]
        }, { updatedOn: 'blur' });
    };
    ChangePasswordPage.prototype.cancel = function (data, operation) {
        var self = this;
        var params = {};
        if (operation) {
            params.operation = operation;
        }
        else {
            params.operation = __WEBPACK_IMPORTED_MODULE_2__common_common_module__["c" /* ModelParamOptions */].CANCEL;
        }
        if (data) {
            params.param = data;
        }
        self.viewController.dismiss(params);
    };
    ChangePasswordPage.prototype.ionViewDidLoad = function () { };
    ChangePasswordPage.prototype.ngOnInit = function () {
        var self = this;
        self.buildForm();
    };
    ChangePasswordPage.prototype.save = function () {
        var self = this;
        if (self.profileForm.valid) {
            var loader_1 = self.loadingController.create({
                showBackdrop: false,
                spinner: 'dots'
            });
            var toast_1 = self.toastController.create({
                duration: 5000,
                position: 'bottom'
            });
            var pwd_1 = { oldPassword: self.profileForm.controls['oldPassword'].value, newPassword: self.profileForm.controls['newPassword'].value };
            loader_1.present()
                .then(function () {
                self.businessService.changePassword(pwd_1.oldPassword, pwd_1.newPassword)
                    .then(function (data) {
                    console.log('data', data);
                    loader_1.dismiss();
                    self.cancel(data, __WEBPACK_IMPORTED_MODULE_2__common_common_module__["c" /* ModelParamOptions */].SAVE);
                })
                    .catch(function (error) {
                    loader_1.dismiss();
                    console.log('error changePassword', error);
                    if (error.message) {
                        toast_1.setMessage(error.message);
                        toast_1.setCssClass('dangerToast');
                        toast_1.present();
                    }
                });
            }, function () {
                loader_1.dismiss();
            });
        }
    };
    ChangePasswordPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-change-password',template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/pages/change-password/change-password.html"*/`\n<ion-header>\n\n  <ion-toolbar>\n    <ion-title>Alterar Senha</ion-title>\n    <ion-buttons start>\n        <button ion-button (click)="cancel()">\n        <span ion-text color="primary" showWhen="ios">Cancelar</span>\n        <ion-icon name="md-close" showWhen="android, windows, core"></ion-icon>\n        </button>\n      </ion-buttons>\n      <ion-buttons end>\n        <button ion-button (click)="save()" [disabled]="!profileForm.valid">\n          <span ion-text color="primary">Salvar</span>\n        </button>\n      </ion-buttons>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form [formGroup]="profileForm">\n    <ion-item>\n      <ion-label floating>Senha Atual</ion-label>\n      <ion-input formControlName="oldPassword" type="password"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!profileForm.controls[\'oldPassword\'].valid && profileForm.controls[\'oldPassword\'].errors && profileForm.controls[\'oldPassword\'].touched">\n      <p class="error" *ngIf="profileForm.controls[\'oldPassword\'].errors.required">{{ validation_messages.oldPassword[0].message }}</p>\n      <p class="error" *ngIf="profileForm.controls[\'oldPassword\'].errors.minlength">{{ validation_messages.oldPassword[1].message }}</p>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Nova Senha</ion-label>\n      <ion-input formControlName="newPassword" type="password" validateEqual="retype" reverse="true"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!profileForm.controls[\'newPassword\'].valid && profileForm.controls[\'newPassword\'].errors && profileForm.controls[\'newPassword\'].touched">\n      <p class="error" *ngIf="profileForm.controls[\'newPassword\'].errors.required">{{ validation_messages.newPassword[0].message }}</p>\n      <p class="error" *ngIf="profileForm.controls[\'newPassword\'].errors.minlength">{{ validation_messages.newPassword[1].message }}</p>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Confirmar Senha</ion-label>\n      <ion-input formControlName="retype" type="password" validateEqual="newPassword" reverse="false"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!profileForm.controls[\'retype\'].valid && profileForm.controls[\'retype\'].errors && profileForm.controls[\'retype\'].touched">\n      <p class="error" *ngIf="profileForm.controls[\'retype\'].errors.required">{{ validation_messages.retype[0].message }}</p>\n      <p class="error" *ngIf="profileForm.controls[\'retype\'].errors.validateEqual">{{ validation_messages.retype[1].message }}</p>\n    </ion-item>\n  </form>\n</ion-content>\n`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/pages/change-password/change-password.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__common_common_module__["a" /* BusinessService */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */]])
    ], ChangePasswordPage);
    return ChangePasswordPage;
}());

//# sourceMappingURL=change-password.js.map

/***/ }),

/***/ 129:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComprovanteContaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_module__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the ComprovanteContaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var ComprovanteContaPage = (function () {
    function ComprovanteContaPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    ComprovanteContaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ComprovanteContaPage');
    };
    ComprovanteContaPage.prototype.onMyCardPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_module__["l" /* MyCardPage */]);
    };
    ComprovanteContaPage.prototype.onTransferenciaPage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_module__["p" /* TranferenciaPage */]);
    };
    ComprovanteContaPage.prototype.onSenhaPagamento = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_module__["n" /* SenhaPagamentoPage */]);
    };
    ComprovanteContaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-comprovante-conta',template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/pages/comprovante-conta/comprovante-conta.html"*/`<ion-content padding style="background-image: url(\'../assets/imgs/fundo-interno.jpg\');background-repeat: no-repeat;background-size:100%;">\n    <div class="row">\n        <div class="col s6">\n            <a (click)="onSenhaPagamento()">\n                <div class="col s2">\n                    <ion-icon name="ios-arrow-dropleft" class="white-text icon-back"></ion-icon>\n                </div>\n            </a>\n            <div class="col s10">\n                <p style="background-color: #fff;border-radius: 35px;padding: 10px 20px;margin-top: -6px;color: #025182;">Comprovante</p>\n            </div>\n        </div>\n    </div>\n    <div class="row">\n        <ion-card style="margin: inherit;">\n            <ion-list style="padding-left: 20px;padding-right: 20px;margin: 0px;">\n                <ion-item ion-item style="border-bottom: 0.1px solid #ccc;color: #025182;">\n                    <b>Pagamento realizado</b><br>\n                    <small>20/10/2018</small><br>\n                </ion-item>\n                <ion-item ion-item style="border-bottom: 0.1px solid #ccc;color: #025182;">\n                    <b>Identificação</b><br>\n                    <small>054521654165414564</small><br>\n                </ion-item>\n                <ion-item ion-item style="border-bottom: 0.1px solid #ccc;color: #025182;">\n                    <b>Dados da conta creditada</b><br>\n                    <small>Banco Bradesco</small>\n                </ion-item>\n                <ion-item ion-item style="border-bottom: 0.1px solid #ccc;color: #025182;">\n                    <b>Valor</b><br>\n                    <small>R$ 458,00</small>\n                </ion-item>\n            </ion-list>\n        </ion-card>\n    </div>\n    <div class="col-12 s12" style="padding-left: 16px;padding-right: 16px;">\n        <a class="waves-effect waves-light btn button-login" (click)="onMyCardPage()" style="background-color:#024b7d !important">Início</a>\n    </div>\n    <div class="col-12 s12" style="padding-left: 16px;padding-right: 16px;">\n        <a class="waves-effect waves-light btn button-cadastro" (click)="onTransferenciaPage()" style="background-color:#ffffff !important;color: #007ec1 !important;">Pagar outra conta</a>\n    </div>\n</ion-content>`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/pages/comprovante-conta/comprovante-conta.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ComprovanteContaPage);
    return ComprovanteContaPage;
}());

//# sourceMappingURL=comprovante-conta.js.map

/***/ }),

/***/ 130:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_module__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_common_module__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signup_signup__ = __webpack_require__(69);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var WelcomePage = (function () {
    function WelcomePage(businessService, fb, loadingController, toastController, navCtrl, navParams) {
        this.businessService = businessService;
        this.fb = fb;
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.submitAttempt = false;
    }
    WelcomePage.prototype.buildForm = function () {
        var self = this;
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
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].minLength(14)])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required])]
        }, { updatedOn: 'blur' });
    };
    WelcomePage.prototype.goToForgot = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_module__["i" /* ForgotPage */]);
    };
    WelcomePage.prototype.signup = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__signup_signup__["a" /* SignupPage */]);
    };
    WelcomePage.prototype.ionViewDidLoad = function () { };
    WelcomePage.prototype.ngOnInit = function () {
        var self = this;
        self.buildForm();
    };
    WelcomePage.prototype.login = function () {
        var _this = this;
        var self = this;
        self.submitAttempt = true;
        var toast = self.toastController.create({
            duration: 5000,
            position: 'bottom'
        });
        if (self.loginForm.valid) {
            var loader_1 = self.loadingController.create({
                showBackdrop: false,
                spinner: 'dots'
            });
            var creds_1 = self.loginForm.value;
            loader_1.present()
                .then(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, self.businessService.signIn(creds_1)
                                .then(function (resp) {
                                self.loginForm.reset();
                                loader_1.dismiss();
                            })
                                .then(function () {
                                self.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_module__["l" /* MyCardPage */]);
                            })
                                .catch(function (error) {
                                console.log('error', error);
                                loader_1.dismiss();
                                toast.setMessage(error.message);
                                toast.present();
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }, function () {
                loader_1.dismiss();
            });
        }
        else {
        }
    };
    WelcomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-welcome',template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/pages/welcome/welcome.html"*/`<ion-header>\n <!--  <ion-navbar>\n    <ion-title>Welcome</ion-title>\n  </ion-navbar> -->\n</ion-header>\n<ion-content class="welcome-bkg">\n  <div text-center class="slogan">\n    <img src="./assets/imgs/logo.png" />\n  </div>\n  <ion-content padding>\n    <form [formGroup]="loginForm">\n      <ion-item>\n        <ion-label floating>CPF ou CNPJ</ion-label>\n        <ion-input [brmasker]="{person: true}" value="" formControlName="username" type="text" autocapitalize="none"></ion-input>\n      </ion-item>\n      <ion-item *ngIf="!loginForm.controls[\'username\'].valid && loginForm.controls[\'username\'].errors && loginForm.controls[\'username\'].touched">\n        <p class="error" *ngIf="signupForm.controls[\'username\'].errors.required">{{ validation_messages.username[0].message }}</p>\n        <p class="error" *ngIf="signupForm.controls[\'username\'].errors.pattern">{{ validation_messages.username[1].message }}</p>\n        <p class="error" *ngIf="signupForm.controls[\'username\'].errors.minlength">{{ validation_messages.username[2].message }}</p>\n        <p class="error" *ngIf="signupForm.controls[\'username\'].errors.maxlength">{{ validation_messages.username[3].message }}</p>\n      </ion-item>\n      <show-hide-container>\n        <ion-item>\n            <ion-label floating>Senha</ion-label>\n            <ion-input type="password" formControlName="password" show-hide-input></ion-input>\n        </ion-item>\n      </show-hide-container>\n      <ion-item *ngIf="!loginForm.controls[\'password\'].valid && loginForm.controls[\'password\'].errors && loginForm.controls[\'password\'].touched">\n        <p class="error" *ngIf="loginForm.controls[\'password\'].errors.required">{{ validation_messages.password[0].message }}</p>\n      </ion-item>\n      <div padding>\n        <button ion-button block color="secundary" class="login" (click)="login()" [disabled]="!loginForm.valid">Entrar</button>\n        <button ion-button block color="primary" class="signup" (click)="signup()">Abrir Conta</button>\n        <button ion-button block color="primary" (click)="goToForgot()">Esqueci a Senha</button>\n      </div>\n    </form>\n  </ion-content>\n</ion-content>\n`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/pages/welcome/welcome.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__common_common_module__["a" /* BusinessService */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], WelcomePage);
    return WelcomePage;
}());

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 131:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_module__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__common_common_module__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var LoginPage = (function () {
    function LoginPage(businessService, fb, loadingController, toastController, navCtrl, navParams) {
        this.businessService = businessService;
        this.fb = fb;
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.submitAttempt = false;
    }
    LoginPage.prototype.buildForm = function () {
        var self = this;
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
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].minLength(14)])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required])]
        }, { updatedOn: 'blur' });
    };
    LoginPage.prototype.goToForgot = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_module__["i" /* ForgotPage */]);
    };
    LoginPage.prototype.ionViewDidLoad = function () { };
    LoginPage.prototype.ngOnInit = function () {
        var self = this;
        self.buildForm();
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        var self = this;
        self.submitAttempt = true;
        var toast = self.toastController.create({
            duration: 5000,
            position: 'bottom'
        });
        if (self.loginForm.valid) {
            var loader_1 = self.loadingController.create({
                showBackdrop: false,
                spinner: 'dots'
            });
            var creds_1 = self.loginForm.value;
            loader_1.present()
                .then(function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, self.businessService.signIn(creds_1)
                                .then(function (resp) {
                                self.loginForm.reset();
                                loader_1.dismiss();
                            })
                                .then(function () {
                                self.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_3__pages_module__["l" /* MyCardPage */]);
                            })
                                .catch(function (error) {
                                console.log('error', error);
                                loader_1.dismiss();
                                toast.setMessage(error.message);
                                toast.present();
                            })];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); }, function () {
                loader_1.dismiss();
            });
        }
        else {
        }
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/pages/login/login.html"*/`<ion-header>\n\n  <ion-navbar>\n    <ion-title>Entrar</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="content-md-blue" padding>\n  <form [formGroup]="loginForm">\n    <ion-item>\n      <ion-label floating>CPF ou CNPJ</ion-label>\n      <ion-input name="cpf" [brmasker]="{person: true}" value="" formControlName="username" type="text" autocapitalize="none"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!loginForm.controls[\'username\'].valid && loginForm.controls[\'username\'].errors && loginForm.controls[\'username\'].touched">\n      <p class="error" *ngIf="signupForm.controls[\'username\'].errors.required">{{ validation_messages.username[0].message }}</p>\n      <p class="error" *ngIf="signupForm.controls[\'username\'].errors.pattern">{{ validation_messages.username[1].message }}</p>\n      <p class="error" *ngIf="signupForm.controls[\'username\'].errors.minlength">{{ validation_messages.username[2].message }}</p>\n      <p class="error" *ngIf="signupForm.controls[\'username\'].errors.maxlength">{{ validation_messages.username[3].message }}</p>\n    </ion-item>\n    <show-hide-container>\n      <ion-item>\n          <ion-label floating>Senha</ion-label>\n          <ion-input type="password" formControlName="password" show-hide-input></ion-input>\n      </ion-item>\n    </show-hide-container>\n    <ion-item *ngIf="!loginForm.controls[\'password\'].valid && loginForm.controls[\'password\'].errors && loginForm.controls[\'password\'].touched">\n      <p class="error" *ngIf="loginForm.controls[\'password\'].errors.required">{{ validation_messages.password[0].message }}</p>\n    </ion-item>\n    <div padding>\n      <button ion-button block color="primary" class="login" (click)="login()" [disabled]="!loginForm.valid">Entrar</button>\n    </div>\n    <div text-right>\n      <button ion-button clear color="primary" (click)="goToForgot()">Esqueceu a senha?</button>\n    </div>\n  </form>\n</ion-content>\n`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__common_common_module__["a" /* BusinessService */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

/***/ 132:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfilePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__common_common_module__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_google_libphonenumber__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_google_libphonenumber___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_google_libphonenumber__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var ProfilePage = (function () {
    function ProfilePage(businessService, fb, loadingController, viewController, navCtrl, navParams) {
        this.businessService = businessService;
        this.fb = fb;
        this.loadingController = loadingController;
        this.viewController = viewController;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.brConfig = {};
        this.countries = [];
        this.dial_code = '';
        this.submitAttempt = false;
        this.PNF = __WEBPACK_IMPORTED_MODULE_4_google_libphonenumber___default.a.PhoneNumberFormat;
        this.PNT = __WEBPACK_IMPORTED_MODULE_4_google_libphonenumber___default.a.PhoneNumberType;
        this.phone_validation_messages = {};
        this.util = __WEBPACK_IMPORTED_MODULE_4_google_libphonenumber___default.a.PhoneNumberUtil.getInstance();
    }
    ProfilePage.prototype.buildForm = function () {
        var self = this;
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
        self.cognitoProfile.phone_number = self.cognitoProfile.phone_number == undefined ? undefined : self.util.format(self.util.parse(self.cognitoProfile.phone_number, self.cognitoProfile.country_and_code__c), self.PNF.NATIONAL);
        self.dial_code = '+' + self.util.getCountryCodeForRegion(self.cognitoProfile.country_and_code__c);
        self.country_example_number = self.util.getExampleNumberForType(self.cognitoProfile.country_and_code__c, self.PNT.MOBILE);
        self.example_number_formatted = self.util.format(self.country_example_number, self.PNF.NATIONAL);
        self.brConfig.mask = self.example_number_formatted;
        var country_and_code = new __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormControl */](self.cognitoProfile.country_and_code__c, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required]));
        self.profileForm = self.fb.group({
            given_name: [self.cognitoProfile.given_name, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].pattern('[a-zA-Z ]*'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].minLength(1), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].maxLength(30)])],
            family_name: [self.cognitoProfile.family_name, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].pattern('[a-zA-Z ]*'), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].minLength(3), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].maxLength(30)])],
            username: [{ value: self.cognitoProfile.preferred_username, disabled: true }, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].minLength(5), __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].maxLength(25)])],
            email: [self.cognitoProfile.email, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__common_common_module__["e" /* ValidatorService */].ValidateEmail])],
            birthdate: [self.cognitoProfile.birthdate, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required])],
            country_and_code__c: country_and_code,
            phone_number: [self.cognitoProfile.phone_number, __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__common_common_module__["d" /* PhoneValidator */].validCountryPhone(country_and_code)])]
        });
    };
    ProfilePage.prototype.ionViewDidLoad = function () { };
    ProfilePage.prototype.cancel = function (data, operation) {
        var self = this;
        var params = {};
        if (operation) {
            params.operation = operation;
        }
        else {
            params.operation = __WEBPACK_IMPORTED_MODULE_2__common_common_module__["c" /* ModelParamOptions */].CANCEL;
        }
        if (data) {
            params.param = data;
        }
        self.viewController.dismiss(params);
    };
    ProfilePage.prototype.loadCountries = function () {
        var self = this;
        var br = { id: 76, code: 'BR', dial_code: '+55', flag: null, name: 'Brasil', sortOrder: 0 };
        var us = { id: 232, code: 'US', dial_code: '+1', flag: null, name: 'United States', sortOrder: 1 };
        var ca = { id: 70, code: 'CA', dial_code: '+1', flag: null, name: 'Canada', sortOrder: 2 };
        var mx = { id: 156, code: 'MX', dial_code: '+52', flag: null, name: 'Mexico', sortOrder: 3 };
        self.countries.push(br);
        self.countries.push(us);
        self.countries.push(ca);
        self.countries.push(mx);
    };
    ProfilePage.prototype.ngOnInit = function () {
        var self = this;
        self.buildForm();
    };
    ProfilePage.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self, loader_1, oprofile, attributes_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        if (!self.profileForm.valid) return [3 /*break*/, 2];
                        loader_1 = self.loadingController.create({
                            showBackdrop: false,
                            spinner: 'dots'
                        });
                        oprofile = this.profileForm.value;
                        oprofile.phone_number = self.util.format(self.util.parse(oprofile.phone_number, oprofile.country_and_code__c), self.PNF.E164);
                        return [4 /*yield*/, self.businessService.getCognitoAttributesData(oprofile, true)];
                    case 1:
                        attributes_1 = _a.sent();
                        loader_1.present()
                            .then(function () {
                            self.businessService.updateCognitoProfile(attributes_1)
                                .then(function (data) {
                                loader_1.dismiss();
                                self.businessService.authUser.cognitoProfile = data;
                                self.cancel({ 'cognitoProfile': self.businessService.authUser }, __WEBPACK_IMPORTED_MODULE_2__common_common_module__["c" /* ModelParamOptions */].SAVE);
                            })
                                .catch(function (err) {
                                console.log('error returned from update.', err);
                                loader_1.dismiss();
                            });
                        }, function () {
                            loader_1.dismiss();
                        });
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    ProfilePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-profile',template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/pages/profile/profile.html"*/`\n<ion-header>\n\n  <ion-toolbar>\n    <ion-title>Editar Perfil</ion-title>\n    <ion-buttons start>\n        <button ion-button (click)="cancel()">\n        <span ion-text color="primary" showWhen="ios">Cancelar</span>\n        <ion-icon name="md-close" showWhen="android, windows, core"></ion-icon>\n        </button>\n      </ion-buttons>\n      <ion-buttons end>\n        <button ion-button (click)="save()">\n          <span ion-text color="primary">Salvar</span>\n        </button>\n      </ion-buttons>\n  </ion-toolbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <form [formGroup]="profileForm">\n    <ion-row>\n      <ion-col col-6>\n        <ion-item>\n          <ion-label floating>Nome Completo</ion-label>\n          <ion-input formControlName="given_name" type="text"></ion-input>\n        </ion-item>\n        <ion-item *ngIf="!profileForm.controls[\'given_name\'].valid && profileForm.controls[\'given_name\'].errors && profileForm.controls[\'given_name\'].touched">\n          <p class="error" *ngIf="profileForm.controls[\'given_name\'].errors.required">{{ validation_messages.given_name[0].message }}</p>\n          <p class="error" *ngIf="profileForm.controls[\'given_name\'].errors.pattern">{{ validation_messages.given_name[1].message }}</p>\n          <p class="error" *ngIf="profileForm.controls[\'given_name\'].errors.minlength">{{ validation_messages.given_name[2].message }}</p>\n          <p class="error" *ngIf="profileForm.controls[\'given_name\'].errors.maxlength">{{ validation_messages.given_name[3].message }}</p>\n        </ion-item>\n      </ion-col>\n    <!--  <ion-col col-6>\n        <ion-item>\n          <ion-label floating>Sobrenome</ion-label>\n          <ion-input formControlName="family_name" type="text"></ion-input>\n        </ion-item>\n        <ion-item *ngIf="!profileForm.controls[\'family_name\'].valid && profileForm.controls[\'family_name\'].errors && profileForm.controls[\'family_name\'].touched">\n          <p class="error" *ngIf="profileForm.controls[\'family_name\'].errors.required">{{ validation_messages.family_name[0].message }}</p>\n          <p class="error" *ngIf="profileForm.controls[\'family_name\'].errors.pattern">{{ validation_messages.family_name[1].message }}</p>\n          <p class="error" *ngIf="profileForm.controls[\'family_name\'].errors.minlength">{{ validation_messages.family_name[2].message }}</p>\n          <p class="error" *ngIf="profileForm.controls[\'family_name\'].errors.maxlength">{{ validation_messages.family_name[3].message }}</p>\n        </ion-item>\n      </ion-col>-->\n    </ion-row>\n    <ion-item>\n      <ion-label floating>CPF ou CNPJ</ion-label>\n      <ion-input formControlName="username" type="text" autocapitalize="none"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!profileForm.controls[\'username\'].valid && profileForm.controls[\'username\'].errors && profileForm.controls[\'username\'].touched">\n      <p class="error" *ngIf="profileForm.controls[\'username\'].errors.required">{{ validation_messages.username[0].message }}</p>\n      <p class="error" *ngIf="profileForm.controls[\'username\'].errors.minlength">{{ validation_messages.username[1].message }}</p>\n      <p class="error" *ngIf="profileForm.controls[\'username\'].errors.maxlength">{{ validation_messages.username[2].message }}</p>\n      <!-- <p class="error" *ngIf="profileForm.controls[\'username\'].errors.pattern">{{ validation_messages.username[3].message }}</p> -->\n    </ion-item>\n    <ion-item>\n      <ion-label floating>E-mail</ion-label>\n      <ion-input formControlName="email" type="email"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!profileForm.controls[\'email\'].valid && profileForm.controls[\'email\'].errors && profileForm.controls[\'email\'].touched">\n      <p class="error" *ngIf="profileForm.controls[\'email\'].errors.required">{{ validation_messages.email[0].message }}</p>\n      <p class="error" *ngIf="profileForm.controls[\'email\'].errors.email">{{ validation_messages.email[1].message }}</p>\n    </ion-item>\n    <ion-item>\n      <ion-label floating><span class="w-font">Celular</span></ion-label>\n      <ion-select formControlName="country_and_code__c" (ionChange)="onSelect($event)">\n        <ion-option *ngFor="let c of countries" [value]="c.code">\n          {{ c.name }}\n        </ion-option>\n      </ion-select>\n    </ion-item>\n    <ion-item *ngIf="!profileForm.controls[\'country_and_code__c\'].valid && signupForm.controls[\'country_and_code__c\'].errors && profileForm.controls[\'country_and_code__c\'].touched">\n      <p class="error" *ngIf="profileForm.controls[\'country_and_code__c\'].errors.required">{{ validation_messages.country_and_code__c[0].message }}</p>\n    </ion-item>\n    <ion-item>\n      <span item-content padding-right>{{ dial_code }}</span>\n      <ion-input min="10" max="11" type="tel" formControlName="phone_number" [placeholder]="example_number_formatted" [brmasker]="brConfig"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!profileForm.controls[\'phone_number\'].valid && profileForm.controls[\'phone_number\'].errors && profileForm.controls[\'phone_number\'].touched">\n      <p class="error" *ngIf="profileForm.controls[\'phone_number\'].errors.required">{{ validation_messages.phone_number[0].message }}</p>\n      <p class="error" *ngIf="profileForm.controls[\'phone_number\'].errors.validCountryPhone">{{ validation_messages.phone_number[1].message }}</p>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Nascimento</ion-label>\n      <ion-datetime formControlName="birthdate" displayFormat="DD/MM/YYYY"></ion-datetime>\n    </ion-item>\n    <ion-item *ngIf="!profileForm.controls[\'birthdate\'].valid && profileForm.controls[\'birthdate\'].errors && profileForm.controls[\'birthdate\'].touched">\n      <p class="error" *ngIf="profileForm.controls[\'birthdate\'].errors.required">{{ validation_messages.birthdate[0].message }}</p>\n    </ion-item>\n  </form>\n</ion-content>\n`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/pages/profile/profile.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__common_common_module__["a" /* BusinessService */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ViewController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], ProfilePage);
    return ProfilePage;
}());

//# sourceMappingURL=profile.js.map

/***/ }),

/***/ 133:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupconfirmPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__aws_aws_module__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_module__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var SignupconfirmPage = (function () {
    function SignupconfirmPage(cognitoService, fb, toastController, loadingController, navCtrl, navParams) {
        this.cognitoService = cognitoService;
        this.fb = fb;
        this.toastController = toastController;
        this.loadingController = loadingController;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.submitAttempt = false;
    }
    SignupconfirmPage.prototype.buildForm = function () {
        var self = this;
        self.validation_messages = {
            'confirmationCode': [
                { type: 'required', message: 'Confirmation code is required' },
                { type: 'minlength', message: 'Enter a valid confirmation code' }
            ]
        };
        self.confirmForm = self.fb.group({
            confirmationCode: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].minLength(5)])]
        });
    };
    SignupconfirmPage.prototype.confirm = function () {
        var self = this;
        self.submitAttempt = true;
        var toast = self.toastController.create({
            duration: 5000,
            position: 'bottom'
        });
        if (self.confirmForm.valid) {
            var loader_1 = self.loadingController.create({
                showBackdrop: false,
                spinner: 'dots'
            });
            loader_1.present()
                .then(function () {
                self.cognitoService.confirmRegistration(self.confirmForm.get('confirmationCode').value)
                    .then(function (data) {
                    console.log("confirm registration data returned successful", data);
                    console.log('username', self.cognitoService.cognitoUser.getUsername());
                    loader_1.dismiss();
                    self.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_module__["k" /* LoginPage */]);
                }).catch(function (err) {
                    loader_1.dismiss();
                    console.log("error happened", err);
                    console.log('username', self.cognitoService.cognitoUser.getUsername());
                    toast.setMessage(err.message);
                    toast.present();
                });
            }, (function () {
                loader_1.dismiss();
            }));
        }
    };
    SignupconfirmPage.prototype.ionViewDidLoad = function () { };
    SignupconfirmPage.prototype.ngOnInit = function () {
        var self = this;
        self.buildForm();
    };
    SignupconfirmPage.prototype.resend = function () {
        var self = this;
        var toast = this.toastController.create({
            duration: 5000,
            position: 'bottom'
        });
        self.cognitoService.resendConfirmationCode()
            .then(function (result) {
            console.log('confirmation code resent');
            toast.setMessage('confirmation code resent');
            toast.present();
        }).catch(function (err) {
            var exception = new __WEBPACK_IMPORTED_MODULE_3__aws_aws_module__["c" /* CognitoException */](err);
            console.log('oops something went wrong sending confirmation code', exception);
            toast.setMessage(exception.message);
            toast.present();
        });
    };
    SignupconfirmPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-signupconfirm',template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/pages/signupconfirm/signupconfirm.html"*/`<ion-header>\n\n  <ion-navbar>\n    <ion-title>Confirmação Cadastral</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n  <div text-center>\n    Por favor, insira o código de verificação que você recebeu por e-mail.\n  </div>\n  <form [formGroup]="confirmForm">\n    <ion-item>\n      <ion-label floating>Código de confirmação</ion-label>\n      <ion-input formControlName="confirmationCode" type="text" autocapitalize="none"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!confirmForm.controls[\'confirmationCode\'].valid && (confirmForm.controls[\'confirmationCode\'].dirty || submitAttempt)">\n        <p class="error" *ngIf="confirmForm.controls[\'confirmationCode\'].errors.required">{{ validation_messages.confirmationCode[0].message }}</p>\n        <p class="error" *ngIf="confirmForm.controls[\'confirmationCode\'].errors.minlength">{{ validation_messages.confirmationCode[1].message }}</p>\n    </ion-item>\n    <div padding>\n        <button ion-button block color="primary" class="login" (click)="confirm()">Confirmar</button>\n    </div>\n    <div class="or rounded-x">ou</div>\n    <div padding>\n        <button ion-button block color="primary" (click)="resend()">Reenviar código</button>\n    </div>\n  </form>\n</ion-content>\n`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/pages/signupconfirm/signupconfirm.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__aws_aws_module__["d" /* CognitoService */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], SignupconfirmPage);
    return SignupconfirmPage;
}());

//# sourceMappingURL=signupconfirm.js.map

/***/ }),

/***/ 134:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__aws_aws_module__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_module__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ForgotPage = (function () {
    function ForgotPage(cognitoService, fb, navCtrl, navParams, toastController) {
        this.cognitoService = cognitoService;
        this.fb = fb;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastController = toastController;
        this.submitAttempt = false;
    }
    ForgotPage.prototype.ngOnInit = function () {
        this.buildForm();
    };
    ForgotPage.prototype.ionViewDidLoad = function () { };
    ForgotPage.prototype.buildForm = function () {
        this.forgotForm = this.fb.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].minLength(3)])],
        }, { updatedOn: 'blur' });
    };
    ForgotPage.prototype.submit = function () {
        var _this = this;
        var self = this;
        self.submitAttempt = true;
        var toast = self.toastController.create({
            duration: 5000,
            position: 'bottom'
        });
        if (self.forgotForm.valid) {
            self.cognitoService.forgotPassword(self.forgotForm.get('username').value)
                .then(function (result) {
                self.forgotForm.reset();
                console.log('this is the result from forgot password', result);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_module__["h" /* ForgotConfirmPage */]);
            })
                .catch(function (err) {
                console.log('this is the result from the forgot password error', err);
                toast.setMessage(err.message);
                toast.present();
            });
        }
    };
    ForgotPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-forgot',template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/pages/forgot/forgot.html"*/`\n<ion-header>\n  <ion-navbar>\n    <ion-title>Recuperar Senha</ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="content-md-blue" padding>\n  <div text-center class="white-font">\n    Por favor, digite seu CPF ou CNPJ para receber instruções sobre como redefinir sua senha.\n  </div>\n  <form [formGroup]="forgotForm">\n    <ion-item>\n      <ion-label floating>CPF ou CNPJ</ion-label>\n      <ion-input formControlName="username" type="text" autocapitalize="none"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!forgotForm.controls[\'username\'].valid && (forgotForm.controls[\'username\'].dirty || submitAttempt)">\n      <p class="error">Por favor insira um CPF ou CNPJ válido.</p>\n    </ion-item>\n    <div padding>\n      <button ion-button block color="primary" (click)="submit()" [disabled]="!forgotForm.valid">Redefinir Senha</button>\n    </div>\n  </form>\n</ion-content>\n`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/pages/forgot/forgot.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__aws_aws_module__["d" /* CognitoService */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
    ], ForgotPage);
    return ForgotPage;
}());

//# sourceMappingURL=forgot.js.map

/***/ }),

/***/ 135:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ForgotConfirmPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__aws_aws_module__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_module__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ForgotConfirmPage = (function () {
    function ForgotConfirmPage(cognitoService, fb, navCtrl, navParams, toastController) {
        this.cognitoService = cognitoService;
        this.fb = fb;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.toastController = toastController;
        this.submitAttempt = false;
    }
    ForgotConfirmPage.prototype.buildForm = function () {
        this.forgotConfirmForm = this.fb.group({
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].minLength(3)])],
            verificationCode: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].minLength(5)])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required])],
            confirmPassword: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required])]
        }, { updatedOn: 'blur' });
    };
    ForgotConfirmPage.prototype.ionViewDidLoad = function () { };
    ForgotConfirmPage.prototype.ngOnInit = function () {
        this.buildForm();
    };
    ForgotConfirmPage.prototype.submit = function () {
        var _this = this;
        this.submitAttempt = true;
        if (this.forgotConfirmForm.valid) {
            this.cognitoService.confirmPassword(this.forgotConfirmForm.get('username').value, this.forgotConfirmForm.get('verificationCode').value, this.forgotConfirmForm.get('password').value)
                .then(function (result) {
                _this.forgotConfirmForm.reset();
                console.log('this is the result from forgot password', result);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__pages_module__["k" /* LoginPage */]);
            })
                .catch(function (err) {
                console.log('this is the result from the forgot password error', err);
                var toast = _this.toastController.create({
                    message: err.message,
                    duration: 5000,
                    position: 'bottom'
                });
                toast.present();
            });
        }
    };
    ForgotConfirmPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-forgot-confirm',template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/pages/forgot-confirm/forgot-confirm.html"*/`<ion-header>\n\n  <ion-navbar>\n    <ion-title>Confirmar Recuperação</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="content-md-blue" padding>\n  <div text-center>\n    Por favor, digite o CPF ou CNPJ, senha e o código de verificação que você recebeu por e-mail.\n  </div>\n  <form [formGroup]="forgotConfirmForm">\n    <ion-item>\n      <ion-label floating>CPF ou CNPJ</ion-label>\n      <ion-input formControlName="username" type="text" autocapitalize="none"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!forgotConfirmForm.controls[\'username\'].valid && (forgotConfirmForm.controls[\'username\'].dirty || submitAttempt)">\n      <p class="error">Por favor insira um CPF ou CNPJ válido.</p>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>código de verificação</ion-label>\n      <ion-input formControlName="verificationCode" type="text" autocapitalize="none"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!forgotConfirmForm.controls[\'verificationCode\'].valid && (forgotConfirmForm.controls[\'verificationCode\'].dirty || submitAttempt)">\n      <p class="error">Insira um código de verificação válido.</p>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Senha</ion-label>\n      <ion-input type="password" formControlName="password" validateEqual="confirmPassword" reverse="true"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!forgotConfirmForm.controls[\'password\'].valid && (forgotConfirmForm.controls[\'password\'].dirty || submitAttempt)">\n      <p class="error">Por favor coloque uma senha válida.</p>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Confirmar Senha</ion-label>\n      <ion-input type="password" formControlName="confirmPassword" validateEqual="password" reverse="false"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="forgotConfirmForm.controls[\'confirmPassword\'].errors && (forgotConfirmForm.controls[\'confirmPassword\'].dirty || submitAttempt)">\n      <p *ngIf="forgotConfirmForm.controls[\'confirmPassword\'].errors.required" class="error">Por favor, digite novamente a senha.</p>\n      <p *ngIf="!forgotConfirmForm.controls[\'confirmPassword\'].errors.validateEqual" class="error">Senha não corresponde</p>\n    </ion-item>\n    <div padding>\n      <button ion-button block color="primary" (click)="submit()" [disabled]="!forgotConfirmForm.valid">Atualizar Senha</button>\n    </div>\n  </form>\n</ion-content>\n`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/pages/forgot-confirm/forgot-confirm.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__aws_aws_module__["d" /* CognitoService */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */]])
    ], ForgotConfirmPage);
    return ForgotConfirmPage;
}());

//# sourceMappingURL=forgot-confirm.js.map

/***/ }),

/***/ 136:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyCardPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_module__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the MyCardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var MyCardPage = (function () {
    function MyCardPage(navCtrl, navParams, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
                'Authorization': 'Bearer cr9qu3Ju7Vo7',
                'Content-Type': 'application/json',
                'access_token': 'cr9qu3Ju7Vo7',
                'client_id': 'kjiLnbesiMMD'
            })
        };
        var apiUrlForLimitValue = 'https://sandbox.conductor.com.br/pier/v2/api/limites-disponibilidades?idConta=17';
        var apiUrlForFinalValue = 'https://sandbox.conductor.com.br/pier/v2/api/cartoes?page=17';
        this.http.get(apiUrlForLimitValue, httpOptions).subscribe(function (result) {
            _this.products = result;
            _this.limitedValue = _this.products.saldoDisponivelGlobal;
        });
        this.http.get(apiUrlForFinalValue, httpOptions).subscribe(function (result) {
            _this.products = result;
            _this.finalValue = _this.products.content[0].numeroCartao;
            var length = _this.finalValue.length;
            var realString = _this.finalValue[length - 4] + _this.finalValue[length - 3] + _this.finalValue[length - 2] + _this.finalValue[length - 1];
            _this.finalValue = realString;
        });
    }
    MyCardPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad MyCardPage');
    };
    MyCardPage.prototype.onExtratoCredito = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_module__["g" /* ExtratoCreditoPage */]);
    };
    MyCardPage.prototype.onComprovantes = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_module__["d" /* ComprovantesPage */]);
    };
    MyCardPage.prototype.onCompraCredito = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_module__["e" /* DepositPage */]);
    };
    MyCardPage.prototype.onTransfer = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_module__["p" /* TranferenciaPage */]);
    };
    MyCardPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-my-card',template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/pages/my-card/my-card.html"*/`<ion-content padding class="back-container">\n    <div class="row">\n        <div class="title-my-card">\n            <small class="white-text title-card"><b>Olá, Tizzo</b></small>\n        </div>\n        <div class="col s5">\n            <img src="../assets/imgs/logo.svg" class="img-card">\n        </div>\n    </div>\n    <ion-slides class="slide-my-card">\n        <ion-slide>\n            <div class="row">\n                <div class="col s12">\n                    <div class="card my-card-back">\n                        <div class="card-content white-text">\n                            <br>\n                            <a (click)="onExtratoCredito()" class="color-desc">\n                                <p class="subtitle-card"><b>Cartão de Crédito</b></p>\n                            </a>\n                        </div>\n                        <div class="card-action my-card-border">\n                            <img src="../assets/imgs/logo-elo.png" class="img-elo"> <br>\n                            <a href="#" class="link-number color-desc">Final {{finalValue}}</a>\n                            <br>\n                            <div class="row">\n                                <div class="col s6">\n                                    <p class="color-desc"><small>Saldo disponível</small><br><b>R$ {{limitedValue}}</b> </p>\n                                </div>\n                            </div>\n                            <a class="waves-effect waves-light btn button-interno" (click)="onExtratoCredito()">Visualizar</a>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </ion-slide>\n    </ion-slides>\n    <br>\n    <div class="row">\n        <div class="col s3 tooltip">\n            <a (click)="onCodigoBarras()">\n                <div class="card card-sub">\n                    <div align="center" class="icon-sub">\n                        <ion-icon name="ios-barcode" size="large" class="color-desc"></ion-icon><br>\n                    </div>\n                </div>\n                <span class="tooltiptext">Pagar</span>\n            </a>\n        </div>\n        <div class="col s3 tooltip">\n            <a (click)="onTransfer()">\n                <div class="card card-sub">\n                    <div align="center" class="icon-sub">\n                        <ion-icon name="logo-usd" class="color-desc"></ion-icon><br>\n                    </div>\n                </div>\n                <span class="tooltiptext">Transferir</span>\n            </a>\n        </div>\n        <div class="col s3 tooltip">\n            <a (click)="onComprovantes()">\n                <div class="card card-sub">\n                    <div align="center" class="icon-sub">\n                        <a style="font-size: 1em !important">\n                            <ion-icon name="paper" class="color-desc"></ion-icon>\n                        </a><br>\n                    </div>\n                </div>\n                <span class="tooltiptext">Comprovantes</span>\n            </a>\n        </div>\n        <div class="col s3 tooltip">\n            <a (click)="onCompraCredito()">\n                <div class="card card-sub">\n                    <div align="center" class="icon-sub">\n                        <ion-icon name="add-circle" class="color-desc"></ion-icon><br>\n                        <span class="tooltiptext">Depósitos</span>\n                    </div>\n                </div>\n            </a>\n        </div>\n\n    </div>\n</ion-content>`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/pages/my-card/my-card.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], MyCardPage);
    return MyCardPage;
}());

//# sourceMappingURL=my-card.js.map

/***/ }),

/***/ 137:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ExtratoCreditoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_module__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var ExtratoCreditoPage = (function () {
    function ExtratoCreditoPage(navCtrl, navParams, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
                'Authorization': 'Bearer cr9qu3Ju7Vo7',
                'Content-Type': 'application/json',
                'access_token': 'cr9qu3Ju7Vo7',
                'client_id': 'kjiLnbesiMMD'
            })
        };
        var apiUrlForLimitValue = 'https://sandbox.conductor.com.br/pier/v2/api/limites-disponibilidades?idConta=17';
        var apiUrlForFinalValue = 'https://sandbox.conductor.com.br/pier/v2/api/cartoes?page=17';
        var apiUrlForListing = 'https://sandbox.conductor.com.br/pier/v2/api/contas/17/transacoes?limit=30';
        this.http.get(apiUrlForLimitValue, httpOptions).subscribe(function (result) {
            _this.products = result;
            _this.limitedValue = _this.products.saldoDisponivelGlobal;
        });
        this.http.get(apiUrlForFinalValue, httpOptions).subscribe(function (result) {
            _this.products = result;
            _this.finalValue = _this.products.content[0].numeroCartao;
            var length = _this.finalValue.length;
            var realString = _this.finalValue[length - 4] + _this.finalValue[length - 3] + _this.finalValue[length - 2] + _this.finalValue[length - 1];
            _this.finalValue = realString;
        });
        this.http.get(apiUrlForListing, httpOptions).subscribe(function (result) {
            _this.listObject = result;
            _this.listDatas = _this.listObject.content;
            console.log(_this.listDatas);
        });
    }
    ExtratoCreditoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ExtratoCreditoPage');
    };
    ExtratoCreditoPage.prototype.onDados = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_module__["l" /* MyCardPage */]);
    };
    ExtratoCreditoPage.prototype.stopSliding = function () {
        //this.list.enableSlidingItems(false);
    };
    ExtratoCreditoPage.prototype.share = function (slidingItem) {
        slidingItem.close();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* List */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* List */])
    ], ExtratoCreditoPage.prototype, "list", void 0);
    ExtratoCreditoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-extrato-credito',template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/pages/extrato-credito/extrato-credito.html"*/`<ion-content padding class="body-internal">\n    <div class="row">\n        <div class="col s6">\n            <a (click)="onDados()">\n                <div class="col s2">\n                    <ion-icon name="ios-arrow-dropleft" class="white-text icon-back"></ion-icon>\n                </div>\n            </a>\n            <div class="col s10">\n                <p class="title-internal-credit">Cartão de Crédito</p>\n            </div>\n        </div>\n    </div>\n    <div class="back-credit">\n        <div class="row">\n            <div class="col s12">\n                <img src="../assets/imgs/logo-elo2.svg" class="logo-elo2">\n                <span class="white-text title-number-credit">Final {{finalValue}}</span>\n            </div>\n        </div>\n        <div class="row">\n            <div class="col s6">\n                <small class="white-text"><b>Saldo Disponível</b></small>\n            </div>\n            <div class="col s6" align="right">\n                <small class="white-text">R$ {{limitedValue}}</small>\n            </div>\n        </div>\n    </div>\n    <div class="row dados-credit"></div>\n    <ion-scroll class="list-credit" scrollY="true">\n        <ion-list class="sublist-credit">\n            <ion-item *ngFor="let list of listDatas">\n                <div class="row">\n                <div class="col s6">\n                    <small>\n                      <span class="white-text">{{list.dataOrigem | date: \'dd/MM/yyyy\' }} <br> \n                      {{list.nomeEstabelecimento == \'\' ? \'ReadyState\' :  list.nomeEstabelecimento}}</span>\n                    </small>\n                </div>\n                <div class="col s6" align="right">\n                    <small class="white-text"><b>R$ {{list.valorBRL == null ? \'ReadyState\' :  list.valorBRL}}</b></small>\n                </div>\n                </div>\n            </ion-item>\n        </ion-list>\n    </ion-scroll>\n\n    <script>\n        function updateDonutChart(el, percent, donut) {\n            percent = Math.round(percent);\n            if (percent > 100) {\n                percent = 100;\n            } else if (percent < 0) {\n                percent = 0;\n            }\n            var deg = Math.round(360 * (percent / 100));\n\n            if (percent > 50) {\n                $(el + \' .pie\').css(\'clip\', \'rect(auto, auto, auto, auto)\');\n                $(el + \' .right-side\').css(\'transform\', \'rotate(180deg)\');\n            } else {\n                $(el + \' .pie\').css(\'clip\', \'rect(0, 1em, 1em, 0.5em)\');\n                $(el + \' .right-side\').css(\'transform\', \'rotate(0deg)\');\n            }\n            if (donut) {\n                $(el + \' .right-side\').css(\'border-width\', \'0.1em\');\n                $(el + \' .left-side\').css(\'border-width\', \'0.1em\');\n                $(el + \' .shadow\').css(\'border-width\', \'0.1em\');\n            } else {\n                $(el + \' .right-side\').css(\'border-width\', \'0.5em\');\n                $(el + \' .left-side\').css(\'border-width\', \'0.5em\');\n                $(el + \' .shadow\').css(\'border-width\', \'0.5em\');\n            }\n            $(el + \' .num\').text(percent);\n            $(el + \' .left-side\').css(\'transform\', \'rotate(\' + deg + \'deg)\');\n        }\n\n        // Pass in a number for the percent\n        updateDonutChart(\'#specificChart\', 66.67, true);\n    </script>\n</ion-content>`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/pages/extrato-credito/extrato-credito.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */]])
    ], ExtratoCreditoPage);
    return ExtratoCreditoPage;
}());

//# sourceMappingURL=extrato-credito.js.map

/***/ }),

/***/ 138:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComprovantesPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_module__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var ComprovantesPage = (function () {
    function ComprovantesPage(navCtrl, navParams, http) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({
                'Authorization': 'Bearer cr9qu3Ju7Vo7',
                'Content-Type': 'application/json',
                'access_token': 'cr9qu3Ju7Vo7',
                'client_id': 'kjiLnbesiMMD'
            })
        };
        var apiUrlForListing = 'https://sandbox.conductor.com.br/pier/v2/api/contas/17/transacoes?limit=30';
        this.http.get(apiUrlForListing, httpOptions).subscribe(function (result) {
            _this.listObject = result;
            _this.listDatas = _this.listObject.content;
            console.log(_this.listDatas);
        });
    }
    ComprovantesPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ComprovantesPage');
    };
    ComprovantesPage.prototype.onDados = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_module__["l" /* MyCardPage */]);
    };
    ComprovantesPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-comprovantes',template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/pages/comprovantes/comprovantes.html"*/`<ion-content padding style="background-image: url(\'../assets/imgs/fundo-interno.jpg\');background-repeat: no-repeat;background-size:100%;">\n    <div class="row">\n        <div class="col s6">\n            <a (click)="onDados()">\n                <div class="col s2">\n                    <ion-icon name="ios-arrow-dropleft" style="color: #ffffff;"></ion-icon>\n                </div>\n            </a>\n            <div class="col s10">\n                <p style="background-color: #fff;border-radius: 35px;padding: 10px 20px;margin-top: -6px;color: #025182;">Meus Comprovantes</p>\n            </div>\n        </div>\n    </div>\n    <div class="row">\n        <ion-scroll style="width:100%;height:100vh" scrollY="true">\n            <ion-card style="backdround-color:#112f61 !important;">\n                <ion-list>\n                    <ion-item ion-item *ngFor="let list of listDatas" style="border-bottom: 5px solid #29D4E3;background: #025182;color: #fff;">\n                        <small><b>{{list.dataOrigem == null ? \'ReadyState\' :  list.dataOrigem | date}}<span style="float:right">R$ {{list.valorBRL}}</span></b></small><br><br>\n                        <small style="font-size: 13px;font-weight: 100;">{{list.descricaoAbreviada == null ? \'ReadyState\' :  list.descricaoAbreviada }}</small><br>\n                        <small style="font-weight: 100;">{{list.nomeEstabelecimento == \'\' ? \'ReadyState\' :  list.nomeEstabelecimento}}</small><br>\n                    </ion-item>\n                </ion-list>\n            </ion-card>\n        </ion-scroll>\n    </div>\n</ion-content>`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/pages/comprovantes/comprovantes.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], ComprovantesPage);
    return ComprovantesPage;
}());

//# sourceMappingURL=comprovantes.js.map

/***/ }),

/***/ 139:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DepositPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pages_module__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




//import { DatePipe } from '@angular/common';
/**
 * Generated class for the DepositPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DepositPage = (function () {
    /*
    year: any = this.date_to_parse.getFullYear().toString();
    month: any = (this.date_to_parse.getMonth()+2);
    day : any = (this.date_to_parse.getDate()+3);
    */
    function DepositPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.date = new Date();
    }
    DepositPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DepositPage');
    };
    DepositPage.prototype.newTicket = function () {
        //let latest_date =this.datepipe.transform(this.date, 'yyyy-MM-dd');
        var _this = this;
        console.log(this.dueDate);
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({
                'Authorization': 'Bearer cr9qu3Ju7Vo7',
                'Content-Type': 'application/json',
                'access_token': 'cr9qu3Ju7Vo7',
                'client_id': 'kjiLnbesiMMD'
            })
        };
        var apiUrlGetTicket = 'https://sandbox.conductor.com.br/pier/v2/api/contas/1/gerar-boleto-recarga?valor='
            + this.value + '&dataVencimento=2019-04-05';
        //"+latest_date"
        this.http.post(apiUrlGetTicket, " ", httpOptions).subscribe(function (result) {
            _this.ticketData = result;
            _this.ticketNumber = _this.ticketData.numeroDoDocumento;
            console.log(_this.ticketNumber);
        });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__pages_module__["f" /* DepositTicketPage */], { ticket: this.ticketNumber });
    };
    DepositPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-deposit',template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/pages/deposit/deposit.html"*/`<!--\n  Generated template for the DepositPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>deposit</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n    <ion-item>\n        <ion-label fixed>Valor Depósito</ion-label>\n        <ion-input type="text" value="" [(ngModel)]="value"></ion-input>\n      </ion-item>\n\n      <button ion-button outline (click)="newTicket()" >Default</button>\n\n</ion-content>\n`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/pages/deposit/deposit.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], DepositPage);
    return DepositPage;
}());

//# sourceMappingURL=deposit.js.map

/***/ }),

/***/ 140:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DepositTicketPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__(20);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the DepositTicketPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var DepositTicketPage = (function () {
    function DepositTicketPage(navCtrl, navParams, http) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["c" /* HttpHeaders */]({
                'Authorization': 'Bearer cr9qu3Ju7Vo7',
                'Content-Type': 'application/json',
                'access_token': 'cr9qu3Ju7Vo7',
                'client_id': 'kjiLnbesiMMD'
            })
        };
    }
    DepositTicketPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad DepositTicketPage');
    };
    DepositTicketPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-deposit-ticket',template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/pages/deposit-ticket/deposit-ticket.html"*/`<!--\n  Generated template for the DepositTicketPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>deposit-ticket</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n</ion-content>\n`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/pages/deposit-ticket/deposit-ticket.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], DepositTicketPage);
    return DepositTicketPage;
}());

//# sourceMappingURL=deposit-ticket.js.map

/***/ }),

/***/ 141:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TranferenciaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_module__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__aws_cognito_config__ = __webpack_require__(104);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__common_common_module__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};








/**
 * Generated class for the TranferenciaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TranferenciaPage = (function () {
    function TranferenciaPage(navCtrl, navParams, http, fb, storage, toastController, businessService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.fb = fb;
        this.storage = storage;
        this.toastController = toastController;
        this.businessService = businessService;
        this.config = __WEBPACK_IMPORTED_MODULE_6__aws_cognito_config__["a" /* CognitoConfig */];
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
                'Authorization': 'Bearer cr9qu3Ju7Vo7',
                'Content-Type': 'application/json',
                'access_token': 'cr9qu3Ju7Vo7',
                'client_id': 'kjiLnbesiMMD'
            })
        };
        var apiUrlForLimitValue = 'https://sandbox.conductor.com.br/pier/v2/api/limites-disponibilidades?idConta=17';
        this.http.get(apiUrlForLimitValue, httpOptions).subscribe(function (result) {
            _this.products = result;
            _this.limitedValue = _this.products.saldoDisponivelGlobal;
        });
        var creds = { 'username': '932.345.268-20', 'password': 'Ionic@1234' };
        console.log(this.businessService.getCognitoUser(creds));
        console.log(this.config);
    }
    TranferenciaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TranferenciaPage');
    };
    TranferenciaPage.prototype.onDados = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_module__["l" /* MyCardPage */]);
    };
    TranferenciaPage.prototype.onTransPart2 = function () {
        var _this = this;
        var self = this;
        var toast = self.toastController.create({
            duration: 5000,
            position: 'bottom'
        });
        if (self.stepOneForm.valid) {
            self.storage.get('idToken').then(function (val) {
                console.log(val);
                _this.idToken = val;
                var apiUrlForAccountID = 'https://yo0ex03d21.execute-api.sa-east-1.amazonaws.com/Prod/RPNet/Emissor/Cartao/GetCartao?idCartao=' + _this.account_id;
                var httpOptions = {
                    headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
                        'Access-Control-Allow-Origin': '*',
                        'Authorization': 'eyJraWQiOiJyWVE1cFd3OHRtMFBqUjUxMEt1K2hkM3JxOCs3czRPOStGWWJjckdncW93PSIsImFsZyI6IlJTMjU2In0.eyJjdXN0b206aWRDb250YSI6IjE4IiwiY3VzdG9tOmNvdW50cnlfYW5kX2NvZGUiOiJCUiIsInN1YiI6IjRhOWJkMDQ1LWU2Y2ItNGIxYy1hNDhlLWRhZTFkZmI5M2RhZiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiYmlydGhkYXRlIjoiMTk2OC0xMS0yNyIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX2NuRlR0VnNnRyIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6IjkzMi4zNDUuMjY4LTIwIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiOTMyLjM0NS4yNjgtMjAiLCJnaXZlbl9uYW1lIjoiamVhbiB0ZXN0aW5nIiwiYXVkIjoiNmw5bmlnZmFsZGJuN3NqN3RoaWIxMnI0cCIsImV2ZW50X2lkIjoiMjY4OTJkMTEtMDNjNy0xMWU5LWI5NmItZWY4NmZhNjU1MTI2IiwiY3VzdG9tOm1icl9zaW5jZSI6IjIwMTgiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU0NTI0ODk0OSwicGhvbmVfbnVtYmVyIjoiKzU1MTI5OTc0NDk0MDciLCJleHAiOjE1NDUyNTI1NDksImlhdCI6MTU0NTI0ODk0OSwiY3VzdG9tOmlkUGVzc29hIjoiMjEiLCJlbWFpbCI6ImplYW5Acm9hZHBhc3MuY29tLmJyIn0.f7h8djmlHyi69ho8VVK672FakLb_8o8mROShaM8gLHdd4Ggma7bsq-WegOP6z8FoZUwVlvlAMuZClhzBEV2oJtzTAqsdnU3EijXpRhQC-ej6RNT752ZvfdgFl7irteSFVH94pWyq9TmpCt1M45z-iT7IBTD1tf_wv8__TfmycNR5ZDKTvx-7qy97yVysueU3sb-WWM2-PGbJxyX8Ro8P4SFkl5KCzlxIX5HFcDznVkngvzOmDGFSILCcylwUWPoV6GcNkITpVmJMQHxwIfqOZW8mhMptHNe6WOHDnPi-32elV0TCBZo0k-vkZOnT-JhHRM5Rx3OX16uZFeOQG3_cOA',
                        // 'Authorization' : val,
                        'Content-Type': 'application/json; charset=utf-8',
                    })
                };
                _this.http.get(apiUrlForAccountID, httpOptions).subscribe(function (result) {
                    _this.products = result;
                    console.log(_this.products);
                    self.storage.set('idConta', _this.products.idConta);
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_module__["q" /* TransferenciaSegundaPage */]);
                }, function (error) {
                    toast.setMessage('Esta conta não é válida.');
                    toast.present();
                });
            });
        }
        // self.storage.set('account_id', this.account_id);
        // this.navCtrl.push(TransferenciaSegundaPage);
    };
    TranferenciaPage.prototype.validateAccountNumber = function () {
        var self = this;
        self.validation_messages = {
            'account_id': [
                { type: 'required', message: 'ID da conta é obrigatório.' },
            ],
        };
        self.stepOneForm = self.fb.group({
            account_id: ['', __WEBPACK_IMPORTED_MODULE_4__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_4__angular_forms__["h" /* Validators */].required])],
        });
    };
    TranferenciaPage.prototype.ngOnInit = function () {
        var self = this;
        self.validateAccountNumber();
    };
    TranferenciaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-tranferencia',template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/pages/tranferencia/tranferencia.html"*/`<ion-content padding style="background-image: url(\'../assets/imgs/fundo-interno.jpg\');background-repeat: no-repeat;background-size:100%;">\n    <form [formGroup]="stepOneForm">\n        <div class="row">\n            <div class="col s6">\n                <a (click)="onDados()">\n                    <div class="col s2">\n                        <ion-icon name="ios-arrow-dropleft" class="white-text icon-back"></ion-icon>\n                    </div>\n                </a>\n                <div class="col s10">\n                    <p style="background-color: #fff;border-radius: 35px;padding: 10px 20px;margin-top: -6px;color: #3b6687;">Transferência</p>\n                </div>\n            </div>\n        </div>\n        <div class="row">\n            <img src="../assets/imgs/passo1.png" style="width: 100%;height: 40px;">\n        </div>\n        <ion-slides class="slides-home">\n            <ion-slide>\n                <div class="row">\n                    <div class="col s12">\n                        <div class="card" style="background: #fff !important;border-bottom: none;text-align: left;">\n                            <div class="card-content white-text">\n                                <br>\n                                <a style="color: #2e4c63;">\n                                    <p style="font-size: 26px;"><b>Entre Cartões</b></p>\n                                </a>\n                            </div>\n                            <div class="card-action" style="border-top: none;">\n                                <a href="#" style="color: #2e4c63 !important;">Saldo disponível</a>\n                                <a href="#" style="color: #2e4c63 !important;float: right;"><b>R$ {{limitedValue}}</b></a>\n                                <br><br>\n                                <p style="color: #3b6687;">Informações bancárias</p>\n                                <ion-item>\n                                    <ion-input formControlName="account_id" [(ngModel)]="account_id" type="number" style="color:#000 !important;--placeholder-color: #000;--placeholder-opacity: 1;"></ion-input>\n                                    <ion-label floating>Conta</ion-label>\n                                </ion-item>\n                                <ion-item *ngIf="!stepOneForm.controls[\'account_id\'].valid && stepOneForm.controls[\'account_id\'].errors && stepOneForm.controls[\'account_id\'].touched">\n                                    <p class="error" *ngIf="stepOneForm.controls[\'account_id\'].errors.required">{{ validation_messages.account_id[0].message }}</p>\n                                </ion-item>\n                                <button ion-button class="waves-effect waves-light btn button-login" (click)="onTransPart2()" style="background-color:#024b7d !important" [disabled]="!stepOneForm.valid">Próximo</button>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </ion-slide>\n        </ion-slides>\n    </form>\n</ion-content>`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/pages/tranferencia/tranferencia.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_7__common_common_module__["a" /* BusinessService */]])
    ], TranferenciaPage);
    return TranferenciaPage;
}());

//# sourceMappingURL=tranferencia.js.map

/***/ }),

/***/ 142:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransferenciaSegundaPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_module__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the TransferenciaSegundaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TransferenciaSegundaPage = (function () {
    function TransferenciaSegundaPage(navCtrl, navParams, http, fb, toastController, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.fb = fb;
        this.toastController = toastController;
        this.storage = storage;
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["c" /* HttpHeaders */]({
                'Authorization': 'Bearer cr9qu3Ju7Vo7',
                'Content-Type': 'application/json',
                'access_token': 'cr9qu3Ju7Vo7',
                'client_id': 'kjiLnbesiMMD'
            })
        };
        var apiUrlForLimitValue = 'https://sandbox.conductor.com.br/pier/v2/api/limites-disponibilidades?idConta=17';
        this.http.get(apiUrlForLimitValue, httpOptions).subscribe(function (result) {
            _this.products = result;
            _this.limitedValue = _this.products.saldoDisponivelGlobal;
        });
        this.viewFlag = true;
    }
    TransferenciaSegundaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TransferenciaSegundaPage');
    };
    TransferenciaSegundaPage.prototype.onTrans = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_module__["p" /* TranferenciaPage */]);
    };
    TransferenciaSegundaPage.prototype.onTransPart3 = function () {
        var self = this;
        var toast = self.toastController.create({
            duration: 5000,
            position: 'bottom'
        });
        if (self.stepSecondForm.valid) {
            var realBrlValue = this.brlValue.replace(/\D+/g, '');
            if (realBrlValue > this.limitedValue) {
                // console.log(document.getElementById("brlValue"));
                this.viewFlag = !this.viewFlag;
                toast.setMessage('O valor máximo é ' + this.limitedValue);
                toast.present();
                return false;
            }
            else {
                if (realBrlValue[0] == '0') {
                    realBrlValue = realBrlValue[1] + realBrlValue[2];
                }
                this.viewFlag = !this.viewFlag;
                self.storage.set('brlValue', realBrlValue);
                this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_module__["r" /* TransferenciaTerceiraPage */]);
            }
        }
    };
    TransferenciaSegundaPage.prototype.validateBrlValue = function () {
        var self = this;
        self.validation_messages = {
            'brlValue': [
                { type: 'required', message: 'O valor em BRL é obrigatório.' },
            ],
        };
        self.stepSecondForm = self.fb.group({
            brlValue: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required])],
        });
    };
    TransferenciaSegundaPage.prototype.ngOnInit = function () {
        var self = this;
        self.validateBrlValue();
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('brlValue'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */])
    ], TransferenciaSegundaPage.prototype, "brlValueRef", void 0);
    TransferenciaSegundaPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-transferencia-segunda',template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/pages/transferencia-segunda/transferencia-segunda.html"*/`<ion-content padding style="background-image: url(\'../assets/imgs/fundo-interno.jpg\');background-repeat: no-repeat;background-size:100%;">\n    <form [formGroup]="stepSecondForm">\n        <div class="row">\n            <div class="col s6">\n                <a (click)="onTrans()">\n                    <div class="col s2">\n                        <ion-icon name="ios-arrow-dropleft" class="white-text icon-back"></ion-icon>\n                    </div>\n                </a>\n                <div class="col s10">\n                    <p style="background-color: #fff;border-radius: 35px;padding: 10px 20px;margin-top: -6px;color: #3b6687;">Transferência</p>\n                </div>\n            </div>\n        </div>\n        <div class="row">\n            <img src="../assets/imgs/passo2.png" style="width: 100%;height: 40px;">\n        </div>\n        <div class="row">\n            <div class="col s12">\n                <div class="card" style="background: #fff !important;border-bottom: none;text-align: left;">\n                    <div class="card-action" style="border-top: none;">\n                        <a href="#" style="color: #2e4c63 !important;">Saldo disponível</a>\n                        <a href="#" style="color: #2e4c63 !important;float: right;"><b>R$ {{limitedValue}}</b></a>\n                        <br><br>\n                        <p style="color: #3b6687;">Valor a ser transferido</p>\n                        <div class="input-field">\n                            <ion-item class="inputSenha" style="border-bottom: none !important;">\n                                <ion-label style="color:#000;font-size: 15px;">R$</ion-label>\n                                <ion-input [brmasker]="{money: true, thousand: \',\',  decimalCaracter: \',\', decimal: 2}" clearInput formControlName="brlValue" id="brlValue" type="text" [(ngModel)]="brlValue" [max]="limitedValue"></ion-input>\n                            </ion-item>\n                            <ion-item *ngIf="!stepSecondForm.controls[\'brlValue\'].valid && stepSecondForm.controls[\'brlValue\'].errors && stepSecondForm.controls[\'brlValue\'].touched">\n                                <p class="error" *ngIf="stepSecondForm.controls[\'brlValue\'].errors.required">{{ validation_messages.brlValue[0].message }}</p>\n                                <p class="error" [hidden]="!viewFlag">O valor máximo é {{limitedValue}}.</p>\n                            </ion-item>\n                        </div>\n                        <button ion-button class="waves-effect waves-light btn button-login" (click)="onTransPart3()" style="background-color:#024b7d !important" [disabled]="!stepSecondForm.valid">Próximo</button>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </form>\n</ion-content>`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/pages/transferencia-segunda/transferencia-segunda.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
    ], TransferenciaSegundaPage);
    return TransferenciaSegundaPage;
}());

//# sourceMappingURL=transferencia-segunda.js.map

/***/ }),

/***/ 143:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TransferenciaTerceiraPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_module__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__aws_aws_module__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the TransferenciaTerceiraPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var TransferenciaTerceiraPage = (function () {
    // session: CognitoUserSession;
    // private userPool: CognitoUserPool;
    function TransferenciaTerceiraPage(navCtrl, navParams, http, storage, cognitoService) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.storage = storage;
        this.cognitoService = cognitoService;
        var self = this;
        // self.storage.get('authUser')
        // .then((result) => {
        //     console.log(result);
        // });
        // console.log(cognitoService.refreshOrResetCreds());
        // console.log(this.session.getIdToken().getJwtToken());
        self.storage.get('idToken').then(function (val) {
            _this.idToken = val;
        });
        self.storage.get('idConta').then(function (val) {
            _this.idConta = val;
        });
        self.storage.get('account_id').then(function (val) {
            _this.account_id = val;
            var apiUrlForStep3 = 'https://sandbox.conductor.com.br/pier/v2/api/contas/' + _this.account_id;
            var apiUrlForLimitValue = 'https://sandbox.conductor.com.br/pier/v2/api/limites-disponibilidades?idConta=' + _this.account_id;
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
                    'Authorization': 'Bearer cr9qu3Ju7Vo7',
                    'Content-Type': 'application/json',
                    'access_token': 'cr9qu3Ju7Vo7',
                    'client_id': 'kjiLnbesiMMD'
                })
            };
            _this.http.get(apiUrlForStep3, httpOptions).subscribe(function (result) {
                _this.products = result;
                _this.nomeValue = _this.products.nome;
            });
            _this.http.get(apiUrlForLimitValue, httpOptions).subscribe(function (result) {
                _this.products = result;
                _this.limitedValue = _this.products.saldoDisponivelGlobal;
            });
        });
        self.storage.get('brlValue').then(function (val) {
            _this.brlValue = val;
        });
        this.today = __WEBPACK_IMPORTED_MODULE_6_moment__().format("MM/DD/YYYY");
    }
    TransferenciaTerceiraPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad TransferenciaTerceiraPage');
    };
    TransferenciaTerceiraPage.prototype.onTransSeg = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_module__["q" /* TransferenciaSegundaPage */]);
    };
    TransferenciaTerceiraPage.prototype.onSenhaTrans = function () {
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["c" /* HttpHeaders */]({
                'Access-Control-Allow-Origin': '*',
                'Authorization': 'eyJraWQiOiJyWVE1cFd3OHRtMFBqUjUxMEt1K2hkM3JxOCs3czRPOStGWWJjckdncW93PSIsImFsZyI6IlJTMjU2In0.eyJjdXN0b206aWRDb250YSI6IjEiLCJjdXN0b206Y291bnRyeV9hbmRfY29kZSI6IkJSIiwic3ViIjoiNGE5YmQwNDUtZTZjYi00YjFjLWE0OGUtZGFlMWRmYjkzZGFmIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJiaXJ0aGRhdGUiOiIxOTY4LTExLTI3IiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMi5hbWF6b25hd3MuY29tXC91cy1lYXN0LTJfY25GVHRWc2dHIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnVzZXJuYW1lIjoiOTMyLjM0NS4yNjgtMjAiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiI5MzIuMzQ1LjI2OC0yMCIsImdpdmVuX25hbWUiOiJqZWFuIHRlc3RpbmciLCJhdWQiOiI2bDluaWdmYWxkYm43c2o3dGhpYjEycjRwIiwiZXZlbnRfaWQiOiJjNDhlYzYyMS0wMmU4LTExZTktODBmMS01MWJiMDA0MDM3OTgiLCJjdXN0b206bWJyX3NpbmNlIjoiMjAxOCIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTQ1MTUzNDM2LCJwaG9uZV9udW1iZXIiOiIrNTUxMjk5NzQ0OTQwNyIsImV4cCI6MTU0NTE1NzAzNiwiaWF0IjoxNTQ1MTUzNDM2LCJjdXN0b206aWRQZXNzb2EiOiIzIiwiZW1haWwiOiJqZWFuQHJvYWRwYXNzLmNvbS5iciJ9.MaG2LLfQXhJc06goMT7M5XLqFGmObsuaKB_3zWEZdOhE4vDeCzZLX5OLfD6C4x_XHyYfAo4BN6dtsO65s-OrTCU5cVzcVZh4G2yupon1I-gbBvPZEJiIbES58zUbXv6XvWyMGDXy4Uc1qwMaBsEY0WN1BrhpsnZ0Ek-X4KnNGtiZ6wLXGBYEdPa0__XhAb2r08Hm8cX92jDv_7IzkWneyzTE-gzz2fIwhIClFMLyNqZsr0hLmd4p6iF3ZoF0if-K3iv5Yq8nw9kiMjfWUgIr2el6rPdlr59GvLcK4OHPkHLcNCb41kzw8I_wYZoDW_d5CE6RO_hSqzp9ljihBJ54Hw',
                // 'Authorization' : 'Bearer cr9qu3Ju7Vo7',
                'Content-Type': 'application/json',
                'access_token': 'cr9qu3Ju7Vo7',
                'client_id': 'kjiLnbesiMMD',
            })
        };
        var apiUrlForStep3Transfer = 'https://sandbox.conductor.com.br/pier/v2/api/contas/18/transferencias-creditos-cartoes?id_conta_destino=24&valor_transferencia=50';
        // const apiUrlForStep3Transfer = 'https://sandbox.conductor.com.br/pier/v2/api/contas/17/transferencias-creditos-cartoes?id_conta_destino='+ this.idConta + '&valor_transferencia='+this.brlValue;
        var postData = { idContaOrigem: 17 };
        this.http.post(apiUrlForStep3Transfer, postData, httpOptions)
            .subscribe(function (data) {
            console.log(data);
        }, function (error) {
            console.log(error);
        });
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_module__["n" /* SenhaPagamentoPage */]);
    };
    TransferenciaTerceiraPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-transferencia-terceira',template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/pages/transferencia-terceira/transferencia-terceira.html"*/`<ion-content padding style="background-image: url(\'../assets/imgs/fundo-interno.jpg\');background-repeat: no-repeat;background-size:100%;">\n    <div class="row">\n        <div class="col s6">\n            <a (click)="onTransSeg()">\n                <div class="col s2">\n                    <ion-icon name="ios-arrow-dropleft" class="white-text icon-back"></ion-icon>\n                </div>\n            </a>\n            <div class="col s10">\n                <p style="background-color: #fff;border-radius: 35px;padding: 10px 20px;margin-top: -6px;color: #3b6687;">Transferência</p>\n            </div>\n        </div>\n    </div>\n    <div class="row">\n        <img src="../assets/imgs/passo3.png" style="width: 100%;height: 40px;">\n    </div>\n    <div class="row">\n        <div class="col s12">\n            <div class="card" style="background: #fff !important;border-bottom: none;text-align: left;">\n                <div class="card-action" style="border-top: none;">\n                    <a href="#" style="color: #2e4c63 !important;"><b>Saldo disponível</b></a>\n                    <a href="#" style="color: #2e4c63 !important;float: right;"><b>R$ {{limitedValue}}</b></a>\n                    <br><br>\n                    <ion-item style="padding-left: 0px;margin-left: -10px !important;">\n                        <div class="col s6">\n                            <small style="color: #2e4c63"><b>Dados da conta creditada</b></small><br>\n                            <small style="color: #2e4c63 !important;">Nome do cliente: {{nomeValue}}</small><br>\n                            <small style="color: #2e4c63 !important;">Conta do cliente: {{account_id}}</small><br>\n                        </div>\n                    </ion-item>\n                    <ion-item style="padding-left: 0px;margin-left: -10px !important;">\n                        <div class="col s6">\n                            <small style="color: #2e4c63"><b>Data de transferência</b></small><br>\n                            <small style="color: #2e4c63 !important;">{{today}}</small><br>\n                        </div>\n                    </ion-item>\n                    <ion-item style="padding-left: 0px;margin-left: -10px !important;">\n                        <div class="col s6">\n                            <small style="color: #2e4c63"><b>Valor da transferência</b></small><br>\n                            <small style="color: #2e4c63 !important;">R$ {{brlValue}}</small><br>\n                        </div>\n                    </ion-item>\n                    <button ion-button class="waves-effect waves-light btn button-login" (click)="onSenhaTrans()" style="background-color:#024b7d !important">Transferir</button>\n                </div>\n            </div>\n        </div>\n    </div>\n</ion-content>`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/pages/transferencia-terceira/transferencia-terceira.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_4__aws_aws_module__["d" /* CognitoService */]])
    ], TransferenciaTerceiraPage);
    return TransferenciaTerceiraPage;
}());

// export interface CognitoUserSessionData {
//   IdToken: string;
//   AccessToken: string;
//   RefreshToken?: string;
// }
// export class CognitoUserSession {
//   constructor(data: CognitoUserSessionData);
//   public getIdToken(): CognitoIdToken;
//   public getRefreshToken(): CognitoRefreshToken;
//   public getAccessToken(): CognitoAccessToken;
//   public isValid(): boolean;
// } 
//# sourceMappingURL=transferencia-terceira.js.map

/***/ }),

/***/ 144:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SenhaPagamentoPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_module__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_storage__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__aws_cognito_config__ = __webpack_require__(104);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the SenhaPagamentoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SenhaPagamentoPage = (function () {
    function SenhaPagamentoPage(navCtrl, navParams, fb, http, toastController, storage) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.http = http;
        this.toastController = toastController;
        this.storage = storage;
        this.config = __WEBPACK_IMPORTED_MODULE_6__aws_cognito_config__["a" /* CognitoConfig */];
        var self = this;
        self.storage.get('idConta').then(function (val) {
            _this.idConta = val;
        });
        console.log(this.config);
    }
    SenhaPagamentoPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SenhaPagamentoPage');
    };
    SenhaPagamentoPage.prototype.onPagarConta = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_module__["r" /* TransferenciaTerceiraPage */]);
    };
    SenhaPagamentoPage.prototype.onComprovanteConta = function () {
        var _this = this;
        var self = this;
        var toast = self.toastController.create({
            duration: 5000,
            position: 'bottom'
        });
        if (self.confirmPasswordForm.valid) {
            // const apiUrlForConfirmPassword = 'https://sandbox.conductor.com.br/pier/v2/api/cartoes/24/validar-senha';
            var apiUrlForConfirmPassword = 'https://yo0ex03d21.execute-api.sa-east-1.amazonaws.com/Prod/RPNet/Emissor/Cartao/GetCartao/api/cartoes/' + this.idConta + '/validar-senha=' + this.password;
            var httpOptions = {
                headers: new __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["c" /* HttpHeaders */]({
                    'Access-Control-Allow-Origin': '*',
                    'Authorization': 'eyJraWQiOiJyWVE1cFd3OHRtMFBqUjUxMEt1K2hkM3JxOCs3czRPOStGWWJjckdncW93PSIsImFsZyI6IlJTMjU2In0.eyJjdXN0b206aWRDb250YSI6IjE4IiwiY3VzdG9tOmNvdW50cnlfYW5kX2NvZGUiOiJCUiIsInN1YiI6IjRhOWJkMDQ1LWU2Y2ItNGIxYy1hNDhlLWRhZTFkZmI5M2RhZiIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiYmlydGhkYXRlIjoiMTk2OC0xMS0yNyIsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC51cy1lYXN0LTIuYW1hem9uYXdzLmNvbVwvdXMtZWFzdC0yX2NuRlR0VnNnRyIsInBob25lX251bWJlcl92ZXJpZmllZCI6dHJ1ZSwiY29nbml0bzp1c2VybmFtZSI6IjkzMi4zNDUuMjY4LTIwIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiOTMyLjM0NS4yNjgtMjAiLCJnaXZlbl9uYW1lIjoiamVhbiB0ZXN0aW5nIiwiYXVkIjoiNmw5bmlnZmFsZGJuN3NqN3RoaWIxMnI0cCIsImV2ZW50X2lkIjoiMjY4OTJkMTEtMDNjNy0xMWU5LWI5NmItZWY4NmZhNjU1MTI2IiwiY3VzdG9tOm1icl9zaW5jZSI6IjIwMTgiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTU0NTI0ODk0OSwicGhvbmVfbnVtYmVyIjoiKzU1MTI5OTc0NDk0MDciLCJleHAiOjE1NDUyNTI1NDksImlhdCI6MTU0NTI0ODk0OSwiY3VzdG9tOmlkUGVzc29hIjoiMjEiLCJlbWFpbCI6ImplYW5Acm9hZHBhc3MuY29tLmJyIn0.f7h8djmlHyi69ho8VVK672FakLb_8o8mROShaM8gLHdd4Ggma7bsq-WegOP6z8FoZUwVlvlAMuZClhzBEV2oJtzTAqsdnU3EijXpRhQC-ej6RNT752ZvfdgFl7irteSFVH94pWyq9TmpCt1M45z-iT7IBTD1tf_wv8__TfmycNR5ZDKTvx-7qy97yVysueU3sb-WWM2-PGbJxyX8Ro8P4SFkl5KCzlxIX5HFcDznVkngvzOmDGFSILCcylwUWPoV6GcNkITpVmJMQHxwIfqOZW8mhMptHNe6WOHDnPi-32elV0TCBZo0k-vkZOnT-JhHRM5Rx3OX16uZFeOQG3_cOA',
                    // 'Authorization' : 'Bearer cr9qu3Ju7Vo7',
                    'Content-Type': 'application/json; charset=utf-8',
                })
            };
            this.http.get(apiUrlForConfirmPassword, httpOptions).subscribe(function (result) {
                _this.products = result;
                console.log(result);
                if (_this.products.mensagem == 'Ok, senha válida.') {
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__pages_module__["c" /* ComprovanteContaPage */]);
                }
            }, function (error) {
                toast.setMessage('A senha está incorreta. Por favor, tente novamente.');
                toast.present();
            });
        }
        else {
            toast.setMessage('Por favor digite a senha correta.');
            toast.present();
        }
    };
    SenhaPagamentoPage.prototype.buildForm = function () {
        var self = this;
        self.validation_messages = {
            'password': [
                { type: 'required', message: 'Senha obrigatória' }
            ]
        };
        self.confirmPasswordForm = self.fb.group({
            password: ['', __WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_3__angular_forms__["h" /* Validators */].required])]
        }, { updatedOn: 'blur' });
    };
    SenhaPagamentoPage.prototype.ngOnInit = function () {
        var self = this;
        self.buildForm();
    };
    SenhaPagamentoPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-senha-pagamento',template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/pages/senha-pagamento/senha-pagamento.html"*/`<ion-content padding style="background-image: url(\'../assets/imgs/fundo-interno.jpg\');background-repeat: no-repeat;background-size:100%;">\n    <form [formGroup]="confirmPasswordForm">\n        <div class="row">\n            <div class="col s6">\n                <a (click)="onPagarConta()">\n                    <div class="col s2">\n                        <ion-icon name="ios-arrow-dropleft" class="white-text icon-back"></ion-icon>\n                    </div>\n                </a>\n                <div class="col s10">\n                    <p style="background-color: #fff;border-radius: 35px;padding: 10px 20px;margin-top: -6px;color: #3b6687;">Senha do Cartão</p>\n                </div>\n            </div>\n        </div>\n        <div class="row">\n            <div class="col s12">\n                <p class="white-text">Digite a senha do seu cartão:</p>\n            </div>\n        </div>\n        <div align="center">\n            <div style="width: 55%;">\n                <ion-item class="inputSenha" style="border: 5px solid #fff; background-color: transparent;">\n                    <ion-input show-hide-input formControlName="password" [(ngModel)]="password" type="number" type="password" class="white-text"></ion-input>\n                </ion-item>\n            </div>\n        </div>\n        <div class="col-12 s12">\n            <button ion-button class="waves-effect waves-light btn button-login" (click)="onComprovanteConta()" style="background-color:#024b7d !important" [disabled]="!confirmPasswordForm.valid">Confirmar</button>\n        </div>\n    </form>\n</ion-content>`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/pages/senha-pagamento/senha-pagamento.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_3__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */],
            __WEBPACK_IMPORTED_MODULE_5__ionic_storage__["b" /* Storage */]])
    ], SenhaPagamentoPage);
    return SenhaPagamentoPage;
}());

//# sourceMappingURL=senha-pagamento.js.map

/***/ }),

/***/ 155:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 155;

/***/ }),

/***/ 16:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppPages; });
/* unused harmony export MainPage */
/* unused harmony export PagesModule */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_common_module__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(359);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__welcome_welcome__ = __webpack_require__(130);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(131);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__signup_signup__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__profile_profile__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__signupconfirm_signupconfirm__ = __webpack_require__(133);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__change_password_change_password__ = __webpack_require__(128);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__forgot_forgot__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__forgot_confirm_forgot_confirm__ = __webpack_require__(135);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__my_card_my_card__ = __webpack_require__(136);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__extrato_credito_extrato_credito__ = __webpack_require__(137);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__comprovantes_comprovantes__ = __webpack_require__(138);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__deposit_deposit__ = __webpack_require__(139);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__deposit_ticket_deposit_ticket__ = __webpack_require__(140);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__tranferencia_tranferencia__ = __webpack_require__(141);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__transferencia_segunda_transferencia_segunda__ = __webpack_require__(142);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__transferencia_terceira_transferencia_terceira__ = __webpack_require__(143);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__senha_pagamento_senha_pagamento__ = __webpack_require__(144);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__comprovante_conta_comprovante_conta__ = __webpack_require__(129);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_8__change_password_change_password__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_9__forgot_forgot__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_10__forgot_confirm_forgot_confirm__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_2__home_home__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_4__login_login__["a"]; });
/* unused harmony namespace reexport */
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "o", function() { return __WEBPACK_IMPORTED_MODULE_7__signupconfirm_signupconfirm__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "s", function() { return __WEBPACK_IMPORTED_MODULE_3__welcome_welcome__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "m", function() { return __WEBPACK_IMPORTED_MODULE_6__profile_profile__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "l", function() { return __WEBPACK_IMPORTED_MODULE_11__my_card_my_card__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_12__extrato_credito_extrato_credito__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_13__comprovantes_comprovantes__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_14__deposit_deposit__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_15__deposit_ticket_deposit_ticket__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "p", function() { return __WEBPACK_IMPORTED_MODULE_16__tranferencia_tranferencia__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "q", function() { return __WEBPACK_IMPORTED_MODULE_17__transferencia_segunda_transferencia_segunda__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "r", function() { return __WEBPACK_IMPORTED_MODULE_18__transferencia_terceira_transferencia_terceira__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "n", function() { return __WEBPACK_IMPORTED_MODULE_19__senha_pagamento_senha_pagamento__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_20__comprovante_conta_comprovante_conta__["a"]; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





















var AppPages = [
    __WEBPACK_IMPORTED_MODULE_8__change_password_change_password__["a" /* ChangePasswordPage */],
    __WEBPACK_IMPORTED_MODULE_9__forgot_forgot__["a" /* ForgotPage */],
    __WEBPACK_IMPORTED_MODULE_10__forgot_confirm_forgot_confirm__["a" /* ForgotConfirmPage */],
    __WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */],
    __WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */],
    __WEBPACK_IMPORTED_MODULE_6__profile_profile__["a" /* ProfilePage */],
    __WEBPACK_IMPORTED_MODULE_5__signup_signup__["a" /* SignupPage */],
    __WEBPACK_IMPORTED_MODULE_7__signupconfirm_signupconfirm__["a" /* SignupconfirmPage */],
    __WEBPACK_IMPORTED_MODULE_3__welcome_welcome__["a" /* WelcomePage */],
    __WEBPACK_IMPORTED_MODULE_11__my_card_my_card__["a" /* MyCardPage */],
    __WEBPACK_IMPORTED_MODULE_12__extrato_credito_extrato_credito__["a" /* ExtratoCreditoPage */],
    __WEBPACK_IMPORTED_MODULE_13__comprovantes_comprovantes__["a" /* ComprovantesPage */],
    __WEBPACK_IMPORTED_MODULE_14__deposit_deposit__["a" /* DepositPage */],
    __WEBPACK_IMPORTED_MODULE_15__deposit_ticket_deposit_ticket__["a" /* DepositTicketPage */],
    __WEBPACK_IMPORTED_MODULE_16__tranferencia_tranferencia__["a" /* TranferenciaPage */],
    __WEBPACK_IMPORTED_MODULE_17__transferencia_segunda_transferencia_segunda__["a" /* TransferenciaSegundaPage */],
    __WEBPACK_IMPORTED_MODULE_18__transferencia_terceira_transferencia_terceira__["a" /* TransferenciaTerceiraPage */],
    __WEBPACK_IMPORTED_MODULE_19__senha_pagamento_senha_pagamento__["a" /* SenhaPagamentoPage */],
    __WEBPACK_IMPORTED_MODULE_20__comprovante_conta_comprovante_conta__["a" /* ComprovanteContaPage */],
];
var MainPage = __WEBPACK_IMPORTED_MODULE_3__welcome_welcome__["a" /* WelcomePage */];



















Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
    declarations: [
        AppPages,
        __WEBPACK_IMPORTED_MODULE_3__welcome_welcome__["a" /* WelcomePage */]
    ],
    imports: [],
    exports: [
        AppPages,
        __WEBPACK_IMPORTED_MODULE_3__welcome_welcome__["a" /* WelcomePage */]
    ]
});
var PagesModule = (function () {
    function PagesModule(parentModule) {
        Object(__WEBPACK_IMPORTED_MODULE_1__common_common_module__["f" /* throwIfAlreadyLoaded */])(parentModule, 'PagesModule');
    }
    PagesModule = __decorate([
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Optional */])()), __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* SkipSelf */])()),
        __metadata("design:paramtypes", [PagesModule])
    ], PagesModule);
    return PagesModule;
}());

//# sourceMappingURL=pages.module.js.map

/***/ }),

/***/ 19:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["f"] = throwIfAlreadyLoaded;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CommonModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__validators_validator_module__ = __webpack_require__(454);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__business_business_module__ = __webpack_require__(456);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_interface__ = __webpack_require__(809);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_3__common_interface__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators_validator_service__ = __webpack_require__(96);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_4__validators_validator_service__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__validators_phone_validator__ = __webpack_require__(810);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_5__validators_phone_validator__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__business_business_service__ = __webpack_require__(358);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_6__business_business_service__["a"]; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};







function throwIfAlreadyLoaded(parentModule, moduleName) {
    if (parentModule) {
        throw new Error(moduleName + " has already been loaded. Import Core modules in the AppModule only.");
    }
}
var CommonModule = (function () {
    function CommonModule(parentModule) {
        throwIfAlreadyLoaded(parentModule, 'CommonModule');
    }
    CommonModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__business_business_module__["a" /* BusinessModule */],
                __WEBPACK_IMPORTED_MODULE_1__validators_validator_module__["a" /* ValidatorModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__validators_validator_module__["a" /* ValidatorModule */],
                __WEBPACK_IMPORTED_MODULE_2__business_business_module__["a" /* BusinessModule */]
            ],
            providers: []
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Optional */])()), __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* SkipSelf */])()),
        __metadata("design:paramtypes", [CommonModule])
    ], CommonModule);
    return CommonModule;
}());

//# sourceMappingURL=common.module.js.map

/***/ }),

/***/ 197:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/change-password/change-password.module": [
		852,
		17
	],
	"../pages/comprovante-conta/comprovante-conta.module": [
		853,
		16
	],
	"../pages/comprovantes/comprovantes.module": [
		854,
		15
	],
	"../pages/deposit-ticket/deposit-ticket.module": [
		855,
		14
	],
	"../pages/deposit/deposit.module": [
		856,
		13
	],
	"../pages/extrato-credito/extrato-credito.module": [
		857,
		12
	],
	"../pages/forgot-confirm/forgot-confirm.module": [
		858,
		11
	],
	"../pages/forgot/forgot.module": [
		859,
		10
	],
	"../pages/login/login.module": [
		860,
		9
	],
	"../pages/my-card/my-card.module": [
		861,
		8
	],
	"../pages/profile/profile.module": [
		862,
		7
	],
	"../pages/senha-pagamento/senha-pagamento.module": [
		863,
		6
	],
	"../pages/signup/signup.module": [
		864,
		5
	],
	"../pages/signupconfirm/signupconfirm.module": [
		865,
		4
	],
	"../pages/tranferencia/tranferencia.module": [
		866,
		3
	],
	"../pages/transferencia-segunda/transferencia-segunda.module": [
		867,
		2
	],
	"../pages/transferencia-terceira/transferencia-terceira.module": [
		868,
		1
	],
	"../pages/welcome/welcome.module": [
		869,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 197;
module.exports = webpackAsyncContext;

/***/ }),

/***/ 357:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return S3Service; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_aws_sdk_clients_s3__ = __webpack_require__(221);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_aws_sdk_clients_s3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_aws_sdk_clients_s3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__s3_config__ = __webpack_require__(808);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__cognito_service__ = __webpack_require__(97);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var S3Service = (function () {
    function S3Service(prior, cognitoService) {
        this.cognitoService = cognitoService;
        this.config = __WEBPACK_IMPORTED_MODULE_3__s3_config__["a" /* S3Config */];
        if (prior) {
            return prior;
        }
        this.S3 = this.getS3();
    }
    S3Service.prototype.getS3 = function () {
        return new __WEBPACK_IMPORTED_MODULE_1_aws_sdk_clients_s3__({
            params: {
                'Bucket': this.config.bucketName
            },
            region: __WEBPACK_IMPORTED_MODULE_3__s3_config__["a" /* S3Config */].bucketRegion
        });
    };
    S3Service.prototype.isExpired = function (url) {
        var result;
        var _url = new URL(url);
        if (_url.search === '') {
            result = true;
        }
        else {
            var param = _url.searchParams.get('Expires');
            if (param) {
                result = __WEBPACK_IMPORTED_MODULE_2_moment__().isAfter(__WEBPACK_IMPORTED_MODULE_2_moment__["unix"](parseInt(param)));
            }
            else {
                result = false;
            }
        }
        return result;
    };
    S3Service.prototype.handleError = function (error, caller) {
        var exception = new __WEBPACK_IMPORTED_MODULE_4__cognito_service__["b" /* CognitoException */](error);
        console.error("AWS Cognito Service::handleError callerMethod::" + caller, exception);
        return exception;
    };
    S3Service.prototype.getFileByUrl = function (url) {
        var self = this;
        var baseurl = "https://" + self.config.bucketName + ".s3.amazonaws.com/";
        var fileKey = url.replace(baseurl, '');
        var _url = new URL(url);
        return new Promise(function (resolve, reject) {
            try {
                if (fileKey === '') {
                    resolve(url);
                }
                else if (self.isExpired(url)) {
                    self.S3.getSignedUrl('getObject', { Key: fileKey }, function (err, url) {
                        if (err) {
                            reject(self.handleError(err, 'getSignedUrl'));
                        }
                        else {
                            resolve(url);
                        }
                    });
                }
                else {
                    resolve(url);
                }
            }
            catch (error) {
                reject(self.handleError(error, 'try/catch getSignedUrl'));
            }
        });
    };
    S3Service.prototype.getFile = function (filename, folder) {
        var self = this;
        var directory = self.config.folderLevel + "/";
        if (folder) {
            directory += folder + "/";
        }
        var fileKey = "" + directory + filename;
        return new Promise(function (resolve, reject) {
            try {
                self.S3.getSignedUrl('getObject', { Key: fileKey }, function (err, url) {
                    if (err) {
                        reject(self.handleError(err, 'getSignedUrl'));
                    }
                    else {
                        // self.cognitoService.user.cognitoProfile.picture = url;
                        resolve(url);
                    }
                });
            }
            catch (error) {
                reject(self.handleError(error, 'try/catch getSignedUrl'));
            }
        });
    };
    S3Service.prototype.uploadFile = function (file, filename, folder) {
        var self = this;
        // self.config.folderLevel = "protected" - this prevents unautheticated access to the file.
        var directory = self.config.publicLevel + "/";
        if (folder) {
            directory += folder + "/";
        }
        // console.log({'directory': directory});
        // console.log({'filename':filename});
        // console.log({'filetype':file.type});
        // filename = filename.toLowerCase().replace(' ','-');
        filename = filename.toLowerCase().replace(/\s+/g, "-");
        if (file.type === 'image/jpeg') {
            filename += '.jpg';
        }
        if (file.type === 'image/png') {
            filename += '.png';
        }
        var fileKey = "" + directory + filename;
        return new Promise(function (resolve, reject) {
            try {
                self.S3.upload({
                    Bucket: self.config.bucketName,
                    Key: fileKey,
                    ContentType: file.type,
                    ContentEncoding: 'base64',
                    Body: file,
                    StorageClass: 'STANDARD',
                }, function (err, data) {
                    if (err) {
                        self.handleError(err, 'uploadFile');
                        reject(err);
                    }
                    else {
                        console.log('successful uploadFile.');
                        resolve(data);
                    }
                });
            }
            catch (error) {
                reject(self.handleError(error, 'try/catch upload'));
            }
        });
    };
    S3Service.prototype.upload = function (file, type) {
        var self = this;
        //the s3 upload method requires
        // let fileName = name;
        var directory = self.config.folderLevel + "/" + self.cognitoService.user.identityId + "/";
        var fileKey = directory + "avatar";
        return new Promise(function (resolve, reject) {
            try {
                self.S3.upload({
                    Bucket: self.config.bucketName,
                    Key: fileKey,
                    ContentType: type,
                    Body: file,
                    StorageClass: 'STANDARD',
                }, function (err, data) {
                    if (err) {
                        self.handleError(err, 'there was an error uploading your photo:');
                        resolve(false);
                    }
                    else {
                        console.log('successfully uploaded photo.');
                        console.log(data);
                        resolve(true);
                    }
                });
            }
            catch (error) {
                reject(self.handleError(error, 'try/catch upload'));
            }
        });
    };
    S3Service.prototype.getAvatar = function (fileName) {
        var self = this;
        var result = '';
        var directory = self.config.folderLevel + "/" + self.cognitoService.user.identityId + "/";
        var fileKey = directory + "avatar";
        console.log('fileKey', fileKey);
        return new Promise(function (resolve, reject) {
            try {
                self.S3.getSignedUrl('getObject', { Key: fileKey }, function (err, url) {
                    if (err) {
                        reject(self.handleError(err, 'getSignedUrl'));
                    }
                    result = url;
                    self.cognitoService.user.cognitoProfile.picture = url;
                    resolve(url);
                });
            }
            catch (error) {
                reject(self.handleError(error, 'try/catch getSignedUrl'));
            }
        });
    };
    S3Service.dataURItoBlob = function (dataURI, type) {
        var binary = atob(dataURI.split(',')[1]);
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        var blob = new Blob([new Uint8Array(array)], { type: type });
        return blob;
    };
    S3Service = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Optional */])()), __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* SkipSelf */])()),
        __metadata("design:paramtypes", [S3Service,
            __WEBPACK_IMPORTED_MODULE_4__cognito_service__["c" /* CognitoService */]])
    ], S3Service);
    return S3Service;
}());

//# sourceMappingURL=s3.service.js.map

/***/ }),

/***/ 358:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusinessService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__aws_aws_module__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(39);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



var BusinessService = (function () {
    function BusinessService(prior, cognitoService, storage) {
        this.cognitoService = cognitoService;
        this.storage = storage;
        if (prior) {
            return prior;
        }
        this.authUser = __WEBPACK_IMPORTED_MODULE_1__aws_aws_module__["a" /* AuthUser */].Factory();
    }
    BusinessService.prototype.changePassword = function (oldPassword, newPassword) {
        var self = this;
        return self.cognitoService.changePassword(oldPassword, newPassword);
    };
    BusinessService.prototype.checkAuthorization = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.refreshOrResetCreds()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, self.storage.get('authUser')
                                .then(function (result) {
                                self.authUser.set(result);
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BusinessService.prototype.getCognitoAttributesData = function (profile, update) {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.cognitoService.getCognitoAttributesData(profile, update)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BusinessService.prototype.updateCognitoProfile = function (attributes) {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.cognitoService.updateCognitoProfile(attributes)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BusinessService.prototype.refreshOrResetCreds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.cognitoService.refreshOrResetCreds()];
                    case 1:
                        _a.sent();
                        self.authUser.cognitoUser = self.cognitoService.cognitoUser;
                        return [2 /*return*/];
                }
            });
        });
    };
    BusinessService.prototype.signIn = function (creds) {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.cognitoService.signIn(creds)
                                .then(function (resp) {
                                self.authUser.set(resp);
                                return resp;
                            })
                                .catch(function (error) {
                                console.log('an error occurred logging into the auth service.', error);
                                throw error;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BusinessService.prototype.signOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.cognitoService.signOut()
                                .then(function (resp) {
                                self.authUser = self.cognitoService.user;
                            })
                                .catch(function (error) {
                                console.log('an error occurred signing out of the auth service', error);
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BusinessService.prototype.signUp = function (creds) {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.cognitoService.signUp(creds)
                                .then(function (resp) {
                                return resp;
                            })
                                .catch(function (error) {
                                console.log('an error occurred signing up through the auth service', error);
                                throw error;
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BusinessService.prototype.getCognitoUser = function (creds) {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        self = this;
                        return [4 /*yield*/, self.cognitoService.getCognitoUserData(creds)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BusinessService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Optional */])()), __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* SkipSelf */])()),
        __metadata("design:paramtypes", [BusinessService, __WEBPACK_IMPORTED_MODULE_1__aws_aws_module__["d" /* CognitoService */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]])
    ], BusinessService);
    return BusinessService;
}());

//# sourceMappingURL=business.service.js.map

/***/ }),

/***/ 359:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__pages_module__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_common_module__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__aws_aws_module__ = __webpack_require__(38);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};





var HomePage = (function () {
    function HomePage(businessService, modalController, navCtrl) {
        this.businessService = businessService;
        this.modalController = modalController;
        this.navCtrl = navCtrl;
    }
    HomePage.prototype.changePassword = function () {
        var self = this;
        var modal = self.modalController.create(__WEBPACK_IMPORTED_MODULE_2__pages_module__["b" /* ChangePasswordPage */]);
        modal.onDidDismiss(function (data) {
        });
        modal.present();
    };
    HomePage.prototype.edit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            var self, modal;
            return __generator(this, function (_a) {
                self = this;
                modal = self.modalController.create(__WEBPACK_IMPORTED_MODULE_2__pages_module__["m" /* ProfilePage */]);
                modal.onDidDismiss(function (data, role) { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        if (data.operation == __WEBPACK_IMPORTED_MODULE_3__common_common_module__["c" /* ModelParamOptions */].SAVE) {
                            // update the saved information //
                            self.user.set(self.businessService.authUser);
                        }
                        return [2 /*return*/];
                    });
                }); });
                modal.present();
                return [2 /*return*/];
            });
        });
    };
    HomePage.prototype.ngOnInit = function () {
        var self = this;
        self.user = __WEBPACK_IMPORTED_MODULE_4__aws_aws_module__["a" /* AuthUser */].Factory();
        self.user.set(self.businessService.authUser);
    };
    HomePage.prototype.signOut = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                self.businessService.signOut();
                self.navCtrl.setRoot(__WEBPACK_IMPORTED_MODULE_2__pages_module__["s" /* WelcomePage */]);
                return [2 /*return*/];
            });
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/pages/home/home.html"*/`<ion-header>\n  <ion-navbar>\n    <ion-title>\n      ArBank\n    </ion-title>\n\n    <ion-buttons end>\n      <button ion-button icon-start (click)="signOut()">\n        <ion-icon name="log-out"></ion-icon>\n        Sair\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-fab bottom right>\n    <button ion-fab mini (click)="edit()">\n      <ion-icon name="create"></ion-icon>\n    </button>\n  </ion-fab>\n  <ion-list>\n    <ion-item>\n      <p>{{ user.cognitoProfile.given_name }}</p>\n    </ion-item>\n    <ion-item>\n      <p>{{ user.cognitoProfile.preferred_username }}</p>\n    </ion-item>\n    <ion-item>\n      <p>{{ user.cognitoProfile.email }}</p>\n    </ion-item>\n    <ion-item>\n      <p>{{ user.cognitoProfile.birthdate | date }}</p>\n    </ion-item>\n    <ion-item *ngIf="user.cognitoProfile.phone_number">\n      <p>{{ user.cognitoProfile.phone_number | phoneMask: user.cognitoProfile.country_and_code }}</p>\n    </ion-item>\n    <ion-item>\n      <button ion-item no-padding (click)="changePassword()">\n        <p>Esqueci a senha</p>\n      </button>\n    </ion-item>\n  </ion-list>\n\n</ion-content>\n`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__common_common_module__["a" /* BusinessService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 38:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return AwsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_common_module__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cognito_service__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__s3_service__ = __webpack_require__(357);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__cognito_service__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_2__cognito_service__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_2__cognito_service__["c"]; });
/* unused harmony namespace reexport */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};






var AwsModule = (function () {
    function AwsModule(parentModule) {
        Object(__WEBPACK_IMPORTED_MODULE_1__common_common_module__["f" /* throwIfAlreadyLoaded */])(parentModule, 'AwsModule');
    }
    AwsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            imports: [],
            exports: [],
            providers: [
                __WEBPACK_IMPORTED_MODULE_2__cognito_service__["c" /* CognitoService */],
                __WEBPACK_IMPORTED_MODULE_3__s3_service__["a" /* S3Service */]
            ]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Optional */])()), __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* SkipSelf */])()),
        __metadata("design:paramtypes", [AwsModule])
    ], AwsModule);
    return AwsModule;
}());

//# sourceMappingURL=aws.module.js.map

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowHideInput; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var ShowHideInput = (function () {
    function ShowHideInput(el) {
        this.el = el;
        this.type = 'password';
    }
    ShowHideInput.prototype.changeType = function (type) {
        this.type = type;
        this.el.nativeElement.children[0].type = this.type;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostBinding */])(),
        __metadata("design:type", String)
    ], ShowHideInput.prototype, "type", void 0);
    ShowHideInput = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */])({
            selector: '[show-hide-input]'
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]])
    ], ShowHideInput);
    return ShowHideInput;
}());

//# sourceMappingURL=show-hide-input.js.map

/***/ }),

/***/ 407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MomentPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_moment__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var MomentPipe = (function () {
    function MomentPipe() {
    }
    /**
     * Takes a value and makes it lowercase.
     */
    MomentPipe.prototype.transform = function (date, format) {
        return __WEBPACK_IMPORTED_MODULE_1_moment__(date).format(format);
    };
    MomentPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Pipe */])({
            name: 'moment',
        })
    ], MomentPipe);
    return MomentPipe;
}());

//# sourceMappingURL=moment.js.map

/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhoneMaskPipe; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_google_libphonenumber__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_google_libphonenumber___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_google_libphonenumber__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


// value | phoneMask: countryCode: PNF //
var PhoneMaskPipe = (function () {
    function PhoneMaskPipe() {
    }
    /**
     *
     * @param value
     * @param countryCode
     * @param pnf
     */
    PhoneMaskPipe.prototype.transform = function (value, countryCode, pnf) {
        if (!value)
            return value;
        var _pnf = pnf == null ? __WEBPACK_IMPORTED_MODULE_1_google_libphonenumber___default.a.PhoneNumberFormat.NATIONAL : pnf;
        var _countryCode = countryCode == null ? 'US' : countryCode;
        var util = __WEBPACK_IMPORTED_MODULE_1_google_libphonenumber___default.a.PhoneNumberUtil.getInstance();
        var result = util.format(util.parse(value, _countryCode), _pnf);
        return result;
    };
    PhoneMaskPipe = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["T" /* Pipe */])({
            name: 'phoneMask'
        })
    ], PhoneMaskPipe);
    return PhoneMaskPipe;
}());

//# sourceMappingURL=phonemask.js.map

/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(410);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(430);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 430:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_brmasker_ionic_3__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__app_component__ = __webpack_require__(842);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pages_pages_module__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__common_common_module__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_components_module__ = __webpack_require__(843);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__ionic_storage__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pipes_pipes_module__ = __webpack_require__(846);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_common_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__providers_apirest_apirest__ = __webpack_require__(847);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__providers_infinite_list_infinite_list__ = __webpack_require__(851);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};















var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_pages_module__["a" /* AppPages */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_5_brmasker_ionic_3__["b" /* BrMaskerModule */],
                __WEBPACK_IMPORTED_MODULE_8__common_common_module__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_9__components_components_module__["a" /* ComponentsModule */],
                __WEBPACK_IMPORTED_MODULE_11__pipes_pipes_module__["a" /* PipesModule */],
                __WEBPACK_IMPORTED_MODULE_12__angular_common_http__["b" /* HttpClientModule */],
                //HttpModule,
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */], {
                    platforms: {
                        ios: {
                            statusbarPadding: true
                        }
                    }
                }, {
                    links: [
                        { loadChildren: '../pages/change-password/change-password.module#ChangePasswordPageModule', name: 'ChangePasswordPage', segment: 'change-password', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/comprovante-conta/comprovante-conta.module#ComprovanteContaPageModule', name: 'ComprovanteContaPage', segment: 'comprovante-conta', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/comprovantes/comprovantes.module#ComprovantesPageModule', name: 'ComprovantesPage', segment: 'comprovantes', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/deposit-ticket/deposit-ticket.module#DepositTicketPageModule', name: 'DepositTicketPage', segment: 'deposit-ticket', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/deposit/deposit.module#DepositPageModule', name: 'DepositPage', segment: 'deposit', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/extrato-credito/extrato-credito.module#ExtratoCreditoPageModule', name: 'ExtratoCreditoPage', segment: 'extrato-credito', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/forgot-confirm/forgot-confirm.module#ForgotConfirmPageModule', name: 'ForgotConfirmPage', segment: 'forgot-confirm', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/forgot/forgot.module#ForgotPageModule', name: 'ForgotPage', segment: 'forgot', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/my-card/my-card.module#MyCardPageModule', name: 'MyCardPage', segment: 'my-card', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/profile/profile.module#ProfilePageModule', name: 'ProfilePage', segment: 'profile', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/senha-pagamento/senha-pagamento.module#SenhaPagamentoPageModule', name: 'SenhaPagamentoPage', segment: 'senha-pagamento', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signup/signup.module#SignupPageModule', name: 'SignupPage', segment: 'signup', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/signupconfirm/signupconfirm.module#SignupconfirmPageModule', name: 'SignupconfirmPage', segment: 'signupconfirm', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/tranferencia/tranferencia.module#TranferenciaPageModule', name: 'TranferenciaPage', segment: 'tranferencia', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/transferencia-segunda/transferencia-segunda.module#TransferenciaSegundaPageModule', name: 'TransferenciaSegundaPage', segment: 'transferencia-segunda', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/transferencia-terceira/transferencia-terceira.module#TransferenciaTerceiraPageModule', name: 'TransferenciaTerceiraPage', segment: 'transferencia-terceira', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/welcome/welcome.module#WelcomePageModule', name: 'WelcomePage', segment: 'welcome', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_10__ionic_storage__["a" /* IonicStorageModule */].forRoot({
                    name: '__ionic-aws-cognito-app',
                    driverOrder: ['indexeddb', 'sqlite', 'websql']
                })
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_6__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_7__pages_pages_module__["a" /* AppPages */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_13__providers_apirest_apirest__["a" /* ApirestProvider */],
                __WEBPACK_IMPORTED_MODULE_14__providers_infinite_list_infinite_list__["a" /* InfiniteListProvider */]
            ],
            schemas: [__WEBPACK_IMPORTED_MODULE_1__angular_core__["i" /* CUSTOM_ELEMENTS_SCHEMA */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 454:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidatorModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_module__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__equal_validator_directive__ = __webpack_require__(455);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validator_service__ = __webpack_require__(96);
/* unused harmony namespace reexport */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};





var ValidatorModule = (function () {
    function ValidatorModule(parentModule) {
        Object(__WEBPACK_IMPORTED_MODULE_1__common_module__["f" /* throwIfAlreadyLoaded */])(parentModule, 'ValidatorModule');
    }
    ValidatorModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            imports: [],
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__equal_validator_directive__["a" /* EqualValidator */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__equal_validator_directive__["a" /* EqualValidator */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__validator_service__["a" /* ValidatorService */]
            ]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Optional */])()), __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* SkipSelf */])()),
        __metadata("design:paramtypes", [ValidatorModule])
    ], ValidatorModule);
    return ValidatorModule;
}());

//# sourceMappingURL=validator.module.js.map

/***/ }),

/***/ 455:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EqualValidator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(10);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};


var EqualValidator = (function () {
    function EqualValidator(validateEqual, reverse) {
        this.validateEqual = validateEqual;
        this.reverse = reverse;
    }
    EqualValidator_1 = EqualValidator;
    Object.defineProperty(EqualValidator.prototype, "isReverse", {
        get: function () {
            if (!this.reverse)
                return false;
            return this.reverse === 'true' ? true : false;
        },
        enumerable: true,
        configurable: true
    });
    EqualValidator.prototype.validate = function (c) {
        // throw new Error("Method not implemented.");
        // self value
        var v = c.value;
        // control value
        var e = c.root.get(this.validateEqual);
        // value not equal
        if (e && v !== e.value && !this.isReverse) {
            return {
                validateEqual: true
            };
        }
        // value equal and reverse
        if (e && v === e.value && this.isReverse) {
            delete e.errors['validateEqual'];
            if (!Object.keys(e.errors).length)
                e.setErrors(null);
        }
        // value not equal and reverse
        if (e && v !== e.value && this.isReverse) {
            e.setErrors({ validateEqual: true });
        }
        return null;
    };
    EqualValidator = EqualValidator_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* Directive */])({
            selector: '[validateEqual][formControlName],[validateEqual][formControl],[validateEqual][ngModel]',
            providers: [
                {
                    provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* NG_VALIDATORS */],
                    useExisting: Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_15" /* forwardRef */])(function () { return EqualValidator_1; }),
                    multi: true
                }
            ]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Attribute */])('validateEqual')),
        __param(1, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["g" /* Attribute */])('reverse')),
        __metadata("design:paramtypes", [String, String])
    ], EqualValidator);
    return EqualValidator;
    var EqualValidator_1;
}());

//# sourceMappingURL=equal-validator.directive.js.map

/***/ }),

/***/ 456:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return BusinessModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__common_common_module__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__aws_aws_module__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__business_service__ = __webpack_require__(358);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};




var BusinessModule = (function () {
    function BusinessModule(parentModule) {
        Object(__WEBPACK_IMPORTED_MODULE_1__common_common_module__["f" /* throwIfAlreadyLoaded */])(parentModule, 'BusinessModule');
    }
    BusinessModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [],
            imports: [
                __WEBPACK_IMPORTED_MODULE_2__aws_aws_module__["b" /* AwsModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__aws_aws_module__["b" /* AwsModule */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_3__business_service__["a" /* BusinessService */]
            ]
        }),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Optional */])()), __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* SkipSelf */])()),
        __metadata("design:paramtypes", [BusinessModule])
    ], BusinessModule);
    return BusinessModule;
}());

//# sourceMappingURL=business.module.js.map

/***/ }),

/***/ 69:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignupPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__common_common_module__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_google_libphonenumber__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_google_libphonenumber___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_google_libphonenumber__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__pages_module__ = __webpack_require__(16);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var SignupPage = (function () {
    function SignupPage(businessService, fb, loadingController, toastController, navCtrl, navParams) {
        this.businessService = businessService;
        this.fb = fb;
        this.loadingController = loadingController;
        this.toastController = toastController;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.brConfig = {};
        this.countries = [];
        this.dial_code = '';
        this.phoneUtil = __WEBPACK_IMPORTED_MODULE_4_google_libphonenumber___default.a.PhoneNumberUtil.getInstance();
        this.PNF = __WEBPACK_IMPORTED_MODULE_4_google_libphonenumber___default.a.PhoneNumberFormat;
        this.PNT = __WEBPACK_IMPORTED_MODULE_4_google_libphonenumber___default.a.PhoneNumberType;
        this.submitAttempt = false;
    }
    SignupPage.prototype.buildForm = function () {
        var self = this;
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
        var initial_country = self.countries[0];
        var country_and_code = new __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* FormControl */](initial_country.code, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required]));
        self.dial_code = '+' + self.phoneUtil.getCountryCodeForRegion(initial_country.code);
        self.country_example_number = self.phoneUtil.getExampleNumberForType(initial_country.code, self.PNT.MOBILE);
        self.example_number_formatted = self.phoneUtil.format(self.country_example_number, self.PNF.NATIONAL);
        self.brConfig.mask = self.example_number_formatted;
        self.signupForm = self.fb.group({
            email: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].email])],
            username: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].minLength(14)])],
            given_name: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].pattern('[a-zA-Z ]*'), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].minLength(2), __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].maxLength(30)])],
            //family_name: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z ]*'), Validators.minLength(2), Validators.maxLength(30)])],
            password: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].minLength(8)])],
            confirmPassword: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required])],
            birthdate: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required])],
            country_and_code__c: country_and_code,
            phone_number: ['', __WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].compose([__WEBPACK_IMPORTED_MODULE_2__angular_forms__["h" /* Validators */].required, __WEBPACK_IMPORTED_MODULE_3__common_common_module__["d" /* PhoneValidator */].validCountryPhone(country_and_code)])]
        });
    };
    SignupPage.prototype.goToLogin = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_module__["k" /* LoginPage */]);
    };
    SignupPage.prototype.ionViewDidLoad = function () { };
    SignupPage.prototype.loadCountries = function () {
        var self = this;
        var br = { id: 76, code: 'BR', dial_code: '+55', flag: null, name: 'Brasil', sortOrder: 0 };
        var us = { id: 232, code: 'US', dial_code: '+1', flag: null, name: 'United States', sortOrder: 1 };
        var ca = { id: 70, code: 'CA', dial_code: '+1', flag: null, name: 'Canada', sortOrder: 2 };
        var mx = { id: 156, code: 'MX', dial_code: '+52', flag: null, name: 'Mexico', sortOrder: 3 };
        self.countries.push(br);
        self.countries.push(us);
        self.countries.push(ca);
        self.countries.push(mx);
    };
    SignupPage.prototype.ngOnInit = function () {
        var self = this;
        self.buildForm();
    };
    SignupPage.prototype.onSelect = function ($event) {
        var self = this;
        self.signupForm.controls['phone_number'].reset();
        self.dial_code = '+' + self.phoneUtil.getCountryCodeForRegion($event);
        self.country_example_number = self.phoneUtil.getExampleNumberForType($event, self.PNT.MOBILE);
        self.example_number_formatted = self.phoneUtil.format(this.country_example_number, self.PNF.NATIONAL);
        self.brConfig.mask = self.example_number_formatted;
    };
    SignupPage.prototype.signUp = function () {
        console.log('signup form', this.signupForm);
        var self = this;
        self.submitAttempt = true;
        var toast = this.toastController.create({
            duration: 5000,
            position: 'bottom'
        });
        if (self.signupForm.valid) {
            var loader_1 = self.loadingController.create({
                showBackdrop: false,
                spinner: 'dots'
            });
            var creds_1 = this.signupForm.value;
            creds_1.phone_number = self.phoneUtil.format(self.phoneUtil.parse(creds_1.phone_number, creds_1.country_and_code__c), self.PNF.E164);
            loader_1.present()
                .then(function () {
                loader_1.dismiss();
                self.businessService.signUp(creds_1)
                    .then(function (data) {
                    console.log("signupresult user data returned successful", data);
                    self.businessService.signIn(creds_1)
                        .then(function (user) {
                        loader_1.dismiss();
                        self.signupForm.reset();
                        self.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_module__["j" /* HomePage */]);
                    }).catch(function (err) {
                        loader_1.dismiss();
                        console.log('signIn error happened..', err);
                        if (err.code === 'UserNotConfirmedException') {
                            self.signupForm.reset();
                            self.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__pages_module__["o" /* SignupconfirmPage */]);
                        }
                    });
                }).catch(function (err) {
                    toast.setMessage(err.message);
                    toast.setCssClass('dangerToast');
                    toast.present();
                    loader_1.dismiss();
                });
            }, function () {
                loader_1.dismiss();
            });
        }
        else {
        }
    };
    SignupPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'page-signup',template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/pages/signup/signup.html"*/`\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>Abrir Conta</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content class="content-md-blue" padding>\n  <form [formGroup]="signupForm">\n    <ion-item>\n      <ion-label floating>Nome Completo</ion-label>\n      <ion-input formControlName="given_name" type="text"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!signupForm.controls[\'given_name\'].valid && signupForm.controls[\'given_name\'].errors && signupForm.controls[\'given_name\'].touched">\n      <p class="error" *ngIf="signupForm.controls[\'given_name\'].errors.required">{{ validation_messages.given_name[0].message }}</p>\n      <p class="error" *ngIf="signupForm.controls[\'given_name\'].errors.pattern">{{ validation_messages.given_name[1].message }}</p>\n      <p class="error" *ngIf="signupForm.controls[\'given_name\'].errors.minlength">{{ validation_messages.given_name[2].message }}</p>\n      <p class="error" *ngIf="signupForm.controls[\'given_name\'].errors.maxlength">{{ validation_messages.given_name[3].message }}</p>\n    </ion-item>\n  <!--  <ion-item>\n      <ion-label floating>Sobrenome</ion-label>\n      <ion-input formControlName="family_name" type="text"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!signupForm.controls[\'family_name\'].valid && signupForm.controls[\'family_name\'].errors && signupForm.controls[\'family_name\'].touched">\n      <p class="error" *ngIf="signupForm.controls[\'family_name\'].errors.required">{{ validation_messages.family_name[0].message }}</p>\n      <p class="error" *ngIf="signupForm.controls[\'family_name\'].errors.pattern">{{ validation_messages.family_name[1].message }}</p>\n      <p class="error" *ngIf="signupForm.controls[\'family_name\'].errors.minlength">{{ validation_messages.family_name[2].message }}</p>\n      <p class="error" *ngIf="signupForm.controls[\'family_name\'].errors.maxlength">{{ validation_messages.family_name[3].message }}</p>\n    </ion-item>-->\n    <ion-item>\n      <ion-label floating>CPF ou CNPJ</ion-label>\n      <ion-input name="CPF ou CNPJ" [brmasker]="{person: true}" value="" formControlName="username" type="text" autocapitalize="none"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!signupForm.controls[\'username\'].valid && signupForm.controls[\'username\'].errors && signupForm.controls[\'username\'].touched">\n      <p class="error" *ngIf="signupForm.controls[\'username\'].errors.required">{{ validation_messages.username[0].message }}</p>\n      <p class="error" *ngIf="signupForm.controls[\'username\'].errors.pattern">{{ validation_messages.username[1].message }}</p>\n      <p class="error" *ngIf="signupForm.controls[\'username\'].errors.minlength">{{ validation_messages.username[2].message }}</p>\n      <p class="error" *ngIf="signupForm.controls[\'username\'].errors.maxlength">{{ validation_messages.username[3].message }}</p>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>E-mail</ion-label>\n      <ion-input formControlName="email" type="email"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!signupForm.controls[\'email\'].valid && signupForm.controls[\'email\'].errors && signupForm.controls[\'email\'].touched">\n      <p class="error" *ngIf="signupForm.controls[\'email\'].errors.required">{{ validation_messages.email[0].message }}</p>\n      <p class="error" *ngIf="signupForm.controls[\'email\'].errors.email">{{ validation_messages.email[1].message }}</p>\n    </ion-item>\n    <phone-number formControlName="phone_number" [countries]="countries" [countryCode]="signupForm.controls[\'country_and_code__c\']"></phone-number>\n    <ion-item *ngIf="!signupForm.controls[\'phone_number\'].valid && signupForm.controls[\'phone_number\'].errors && signupForm.controls[\'phone_number\'].touched">\n      <p class="error" *ngIf="signupForm.controls[\'phone_number\'].errors.required">{{ validation_messages.phone_number[0].message }}</p>\n      <p class="error" *ngIf="signupForm.controls[\'phone_number\'].errors.validCountryPhone">{{ validation_messages.phone_number[1].message }}</p>\n    </ion-item>\n    <ion-item>\n      <ion-label floating><span class="w-font">Nascimento</span></ion-label>\n      <ion-datetime formControlName="birthdate" displayFormat="DD/MM/YYYY"></ion-datetime>\n    </ion-item>\n    <ion-item *ngIf="!signupForm.controls[\'birthdate\'].valid && signupForm.controls[\'birthdate\'].errors && signupForm.controls[\'birthdate\'].touched">\n      <p class="error" *ngIf="signupForm.controls[\'birthdate\'].errors.required">{{ validation_messages.birthdate[0].message }}</p>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Senha</ion-label>\n      <ion-input formControlName="password" type="password" validateEqual="confirmPassword" reverse="true"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!signupForm.controls[\'password\'].valid && signupForm.controls[\'password\'].errors && signupForm.controls[\'password\'].touched">\n      <p class="error" *ngIf="signupForm.controls[\'password\'].errors.required">{{ validation_messages.password[0].message }}</p>\n      <p class="error" *ngIf="signupForm.controls[\'password\'].errors.minlength">{{ validation_messages.password[1].message }}</p>\n      <p class="error" *ngIf="signupForm.controls[\'password\'].errors.pattern">{{ validation_messages.password[2].message }}</p>\n    </ion-item>\n    <ion-item>\n      <ion-label floating>Confirmar</ion-label>\n      <ion-input formControlName="confirmPassword" type="password" validateEqual="password" reverse="false"></ion-input>\n    </ion-item>\n    <ion-item *ngIf="!signupForm.controls[\'confirmPassword\'].valid && signupForm.controls[\'confirmPassword\'].errors && signupForm.controls[\'confirmPassword\'].touched">\n      <p class="error" *ngIf="signupForm.controls[\'confirmPassword\'].errors.required">{{ validation_messages.confirmPassword[0].message }}</p>\n      <p class="error" *ngIf="signupForm.controls[\'confirmPassword\'].errors.validateEqual">{{ validation_messages.confirmPassword[1].message }}</p>\n    </ion-item>\n    <div padding>\n      <button ion-button block color="primary" class="signup" (click)="signUp()" [disabled]="!signupForm.valid">Abrir Conta</button>\n    </div>\n    <div padding text-center class="white-font">\n      Já tem uma conta?\n      <a (click)=\'goToLogin()\'>\n        <strong>\n          Entrar\n        </strong>\n      </a>\n    </div>\n  </form>\n</ion-content>\n`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/pages/signup/signup.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__common_common_module__["a" /* BusinessService */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* LoadingController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* ToastController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */]])
    ], SignupPage);
    return SignupPage;
}());

//# sourceMappingURL=signup.js.map

/***/ }),

/***/ 796:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./af": 222,
	"./af.js": 222,
	"./ar": 223,
	"./ar-dz": 224,
	"./ar-dz.js": 224,
	"./ar-kw": 225,
	"./ar-kw.js": 225,
	"./ar-ly": 226,
	"./ar-ly.js": 226,
	"./ar-ma": 227,
	"./ar-ma.js": 227,
	"./ar-sa": 228,
	"./ar-sa.js": 228,
	"./ar-tn": 229,
	"./ar-tn.js": 229,
	"./ar.js": 223,
	"./az": 230,
	"./az.js": 230,
	"./be": 231,
	"./be.js": 231,
	"./bg": 232,
	"./bg.js": 232,
	"./bm": 233,
	"./bm.js": 233,
	"./bn": 234,
	"./bn.js": 234,
	"./bo": 235,
	"./bo.js": 235,
	"./br": 236,
	"./br.js": 236,
	"./bs": 237,
	"./bs.js": 237,
	"./ca": 238,
	"./ca.js": 238,
	"./cs": 239,
	"./cs.js": 239,
	"./cv": 240,
	"./cv.js": 240,
	"./cy": 241,
	"./cy.js": 241,
	"./da": 242,
	"./da.js": 242,
	"./de": 243,
	"./de-at": 244,
	"./de-at.js": 244,
	"./de-ch": 245,
	"./de-ch.js": 245,
	"./de.js": 243,
	"./dv": 246,
	"./dv.js": 246,
	"./el": 247,
	"./el.js": 247,
	"./en-au": 248,
	"./en-au.js": 248,
	"./en-ca": 249,
	"./en-ca.js": 249,
	"./en-gb": 250,
	"./en-gb.js": 250,
	"./en-ie": 251,
	"./en-ie.js": 251,
	"./en-il": 252,
	"./en-il.js": 252,
	"./en-nz": 253,
	"./en-nz.js": 253,
	"./eo": 254,
	"./eo.js": 254,
	"./es": 255,
	"./es-do": 256,
	"./es-do.js": 256,
	"./es-us": 257,
	"./es-us.js": 257,
	"./es.js": 255,
	"./et": 258,
	"./et.js": 258,
	"./eu": 259,
	"./eu.js": 259,
	"./fa": 260,
	"./fa.js": 260,
	"./fi": 261,
	"./fi.js": 261,
	"./fo": 262,
	"./fo.js": 262,
	"./fr": 263,
	"./fr-ca": 264,
	"./fr-ca.js": 264,
	"./fr-ch": 265,
	"./fr-ch.js": 265,
	"./fr.js": 263,
	"./fy": 266,
	"./fy.js": 266,
	"./gd": 267,
	"./gd.js": 267,
	"./gl": 268,
	"./gl.js": 268,
	"./gom-latn": 269,
	"./gom-latn.js": 269,
	"./gu": 270,
	"./gu.js": 270,
	"./he": 271,
	"./he.js": 271,
	"./hi": 272,
	"./hi.js": 272,
	"./hr": 273,
	"./hr.js": 273,
	"./hu": 274,
	"./hu.js": 274,
	"./hy-am": 275,
	"./hy-am.js": 275,
	"./id": 276,
	"./id.js": 276,
	"./is": 277,
	"./is.js": 277,
	"./it": 278,
	"./it.js": 278,
	"./ja": 279,
	"./ja.js": 279,
	"./jv": 280,
	"./jv.js": 280,
	"./ka": 281,
	"./ka.js": 281,
	"./kk": 282,
	"./kk.js": 282,
	"./km": 283,
	"./km.js": 283,
	"./kn": 284,
	"./kn.js": 284,
	"./ko": 285,
	"./ko.js": 285,
	"./ky": 286,
	"./ky.js": 286,
	"./lb": 287,
	"./lb.js": 287,
	"./lo": 288,
	"./lo.js": 288,
	"./lt": 289,
	"./lt.js": 289,
	"./lv": 290,
	"./lv.js": 290,
	"./me": 291,
	"./me.js": 291,
	"./mi": 292,
	"./mi.js": 292,
	"./mk": 293,
	"./mk.js": 293,
	"./ml": 294,
	"./ml.js": 294,
	"./mn": 295,
	"./mn.js": 295,
	"./mr": 296,
	"./mr.js": 296,
	"./ms": 297,
	"./ms-my": 298,
	"./ms-my.js": 298,
	"./ms.js": 297,
	"./mt": 299,
	"./mt.js": 299,
	"./my": 300,
	"./my.js": 300,
	"./nb": 301,
	"./nb.js": 301,
	"./ne": 302,
	"./ne.js": 302,
	"./nl": 303,
	"./nl-be": 304,
	"./nl-be.js": 304,
	"./nl.js": 303,
	"./nn": 305,
	"./nn.js": 305,
	"./pa-in": 306,
	"./pa-in.js": 306,
	"./pl": 307,
	"./pl.js": 307,
	"./pt": 308,
	"./pt-br": 309,
	"./pt-br.js": 309,
	"./pt.js": 308,
	"./ro": 310,
	"./ro.js": 310,
	"./ru": 311,
	"./ru.js": 311,
	"./sd": 312,
	"./sd.js": 312,
	"./se": 313,
	"./se.js": 313,
	"./si": 314,
	"./si.js": 314,
	"./sk": 315,
	"./sk.js": 315,
	"./sl": 316,
	"./sl.js": 316,
	"./sq": 317,
	"./sq.js": 317,
	"./sr": 318,
	"./sr-cyrl": 319,
	"./sr-cyrl.js": 319,
	"./sr.js": 318,
	"./ss": 320,
	"./ss.js": 320,
	"./sv": 321,
	"./sv.js": 321,
	"./sw": 322,
	"./sw.js": 322,
	"./ta": 323,
	"./ta.js": 323,
	"./te": 324,
	"./te.js": 324,
	"./tet": 325,
	"./tet.js": 325,
	"./tg": 326,
	"./tg.js": 326,
	"./th": 327,
	"./th.js": 327,
	"./tl-ph": 328,
	"./tl-ph.js": 328,
	"./tlh": 329,
	"./tlh.js": 329,
	"./tr": 330,
	"./tr.js": 330,
	"./tzl": 331,
	"./tzl.js": 331,
	"./tzm": 332,
	"./tzm-latn": 333,
	"./tzm-latn.js": 333,
	"./tzm.js": 332,
	"./ug-cn": 334,
	"./ug-cn.js": 334,
	"./uk": 335,
	"./uk.js": 335,
	"./ur": 336,
	"./ur.js": 336,
	"./uz": 337,
	"./uz-latn": 338,
	"./uz-latn.js": 338,
	"./uz.js": 337,
	"./vi": 339,
	"./vi.js": 339,
	"./x-pseudo": 340,
	"./x-pseudo.js": 340,
	"./yo": 341,
	"./yo.js": 341,
	"./zh-cn": 342,
	"./zh-cn.js": 342,
	"./zh-hk": 343,
	"./zh-hk.js": 343,
	"./zh-tw": 344,
	"./zh-tw.js": 344
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 796;

/***/ }),

/***/ 808:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return S3Config; });
var S3Config = {
    bucketName: 'arbanks3',
    bucketRegion: 'us-east-2',
    s3_endpoint: 's3.us-east-2.amazonaws.com',
    folderLevel: 'protected',
    publicLevel: 'public'
};
//# sourceMappingURL=s3.config.js.map

/***/ }),

/***/ 809:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export BrMaskTypeOption */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ModelParamOptions; });
var BrMaskTypeOption;
(function (BrMaskTypeOption) {
    BrMaskTypeOption["ALFA"] = "alfa";
    BrMaskTypeOption["NUM"] = "num";
    BrMaskTypeOption["ALL"] = "all";
})(BrMaskTypeOption || (BrMaskTypeOption = {}));
;
var ModelParamOptions;
(function (ModelParamOptions) {
    ModelParamOptions["CANCEL"] = "cancel";
    ModelParamOptions["SAVE"] = "save";
})(ModelParamOptions || (ModelParamOptions = {}));
//# sourceMappingURL=common.interface.js.map

/***/ }),

/***/ 810:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhoneValidator; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_google_libphonenumber__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_google_libphonenumber___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_google_libphonenumber__);

var PhoneValidator = (function () {
    function PhoneValidator() {
    }
    PhoneValidator.validCountryPhone = function (c) {
        var subscribe = false;
        return function (p) {
            if (!subscribe) {
                subscribe = true;
                c.valueChanges.subscribe(function () {
                    p.updateValueAndValidity();
                });
            }
            if (p.value !== '') {
                try {
                    var util = __WEBPACK_IMPORTED_MODULE_0_google_libphonenumber___default.a.PhoneNumberUtil.getInstance();
                    var phoneNumber = '' + p.value + '', region = c.value, number = util.parse(phoneNumber, region), isValidNumber = util.isValidNumber(number);
                    if (isValidNumber) {
                        return null;
                    }
                }
                catch (err) {
                    return {
                        validCountryPhone: true
                    };
                }
                return {
                    validCountryPhone: true
                };
            }
            else {
                return null;
            }
        };
    };
    ;
    return PhoneValidator;
}());

//# sourceMappingURL=phone.validator.js.map

/***/ }),

/***/ 842:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_pages_module__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__common_common_module__ = __webpack_require__(19);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};






var MyApp = (function () {
    function MyApp(businessService, platform, statusBar, splashScreen) {
        var _this = this;
        this.businessService = businessService;
        platform.ready().then(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Okay, so the platform is ready and our plugins are available.
                        // Here you can do any higher level native things you might need.
                        statusBar.styleDefault();
                        splashScreen.hide();
                        return [4 /*yield*/, this.businessService.checkAuthorization()];
                    case 1:
                        _a.sent();
                        if (this.businessService.authUser.authenticated && this.businessService.authUser.cognitoUser) {
                            this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_pages_module__["l" /* MyCardPage */];
                        }
                        else {
                            this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_pages_module__["s" /* WelcomePage */];
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/app/app.html"*/`<ion-nav [root]="rootPage"></ion-nav>\n`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__common_common_module__["a" /* BusinessService */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 843:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ComponentsModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_brmasker_ionic_3__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__show_hide_password_show_hide_container__ = __webpack_require__(844);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__show_hide_password_show_hide_input__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__phone_number_phone_number__ = __webpack_require__(845);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var ComponentsModule = (function () {
    function ComponentsModule() {
    }
    ComponentsModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__show_hide_password_show_hide_input__["a" /* ShowHideInput */],
                __WEBPACK_IMPORTED_MODULE_3__show_hide_password_show_hide_container__["a" /* ShowHideContainer */],
                __WEBPACK_IMPORTED_MODULE_5__phone_number_phone_number__["a" /* PhoneNumberComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* IonicModule */],
                __WEBPACK_IMPORTED_MODULE_2_brmasker_ionic_3__["b" /* BrMaskerModule */]
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_4__show_hide_password_show_hide_input__["a" /* ShowHideInput */],
                __WEBPACK_IMPORTED_MODULE_3__show_hide_password_show_hide_container__["a" /* ShowHideContainer */],
                __WEBPACK_IMPORTED_MODULE_5__phone_number_phone_number__["a" /* PhoneNumberComponent */],
            ],
            schemas: [
                __WEBPACK_IMPORTED_MODULE_0__angular_core__["i" /* CUSTOM_ELEMENTS_SCHEMA */]
            ]
        })
    ], ComponentsModule);
    return ComponentsModule;
}());

//# sourceMappingURL=components.module.js.map

/***/ }),

/***/ 844:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ShowHideContainer; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__show_hide_input__ = __webpack_require__(406);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var ShowHideContainer = (function () {
    function ShowHideContainer() {
        this.show = false;
    }
    ShowHideContainer.prototype.toggleShow = function () {
        this.show = !this.show;
        if (this.show) {
            this.input.changeType("text");
        }
        else {
            this.input.changeType("password");
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["r" /* ContentChild */])(__WEBPACK_IMPORTED_MODULE_1__show_hide_input__["a" /* ShowHideInput */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__show_hide_input__["a" /* ShowHideInput */])
    ], ShowHideContainer.prototype, "input", void 0);
    ShowHideContainer = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'show-hide-container',template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/components/show-hide-password/show-hide-password.html"*/`<ng-content></ng-content>\n<a class="type-toggle" (click)="toggleShow()">\n	<ion-icon class="show-option" [hidden]="show" name="eye"></ion-icon>\n	<ion-icon class="hide-option" [hidden]="!show" name="eye-off"></ion-icon>\n</a>`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/components/show-hide-password/show-hide-password.html"*/,
            host: {
                'class': 'show-hide-password'
            }
        }),
        __metadata("design:paramtypes", [])
    ], ShowHideContainer);
    return ShowHideContainer;
}());

//# sourceMappingURL=show-hide-container.js.map

/***/ }),

/***/ 845:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PhoneNumberComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_brmasker_ionic_3__ = __webpack_require__(127);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_google_libphonenumber__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_google_libphonenumber___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_google_libphonenumber__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_ionic_angular__ = __webpack_require__(9);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var PhoneNumberComponent = (function () {
    function PhoneNumberComponent(elementRef) {
        this.elementRef = elementRef;
        this.brConfig = {};
        this.dial_code = '';
        this.util = __WEBPACK_IMPORTED_MODULE_3_google_libphonenumber___default.a.PhoneNumberUtil.getInstance();
        this.PNF = __WEBPACK_IMPORTED_MODULE_3_google_libphonenumber___default.a.PhoneNumberFormat;
        this.PNT = __WEBPACK_IMPORTED_MODULE_3_google_libphonenumber___default.a.PhoneNumberType;
        this.onChange = function (phoneNumber) { };
        this.onTouch = function () { };
        this.countryCodeChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* EventEmitter */]();
        this.disabled = false;
    }
    PhoneNumberComponent_1 = PhoneNumberComponent;
    PhoneNumberComponent.prototype.ngOnChanges = function (changes) {
        // console.log(changes);
    };
    PhoneNumberComponent.prototype.ngOnInit = function () {
        var self = this;
        if (self.countryCode) {
            self.country_and_code = self.countryCode.value;
        }
        self.country_and_code = self.country_and_code == undefined || '' ? 'US' : self.country_and_code;
        self.dial_code = '+' + self.util.getCountryCodeForRegion(self.country_and_code);
        self.country_example_number = self.util.getExampleNumberForType(self.country_and_code, self.PNT.MOBILE);
        self.example_number_formatted = self.util.format(self.country_example_number, self.PNF.NATIONAL);
        self.brConfig.mask = self.example_number_formatted;
        self.phoneNumber = self.phoneNumber == '' ? '' : self.phoneNumber;
    };
    PhoneNumberComponent.prototype.ngAfterViewInit = function () {
        var self = this;
        self.telinput.writeValue(self.phoneNumber);
    };
    PhoneNumberComponent.prototype.onIonBlur = function (ev) {
        this.writeValue(ev._value);
        this.onTouch();
    };
    PhoneNumberComponent.prototype.onIonChange = function (ev) {
        this.writeValue(ev._value);
        this.onTouch();
    };
    PhoneNumberComponent.prototype.onSelect = function ($event) {
        var self = this;
        self.countryCodeChange.emit($event);
        self.country_and_code = $event;
        self.dial_code = '+' + self.util.getCountryCodeForRegion(self.country_and_code);
        self.country_example_number = self.util.getExampleNumberForType(self.country_and_code, self.PNT.MOBILE);
        self.example_number_formatted = self.util.format(self.country_example_number, self.PNF.NATIONAL);
        self.brConfig.mask = self.example_number_formatted;
        if (self.countryCode) {
            self.countryCode.setValue($event, { onlySelf: true, emitEvent: true, emitModelToViewChange: true });
            self.countryCode.markAsTouched();
            self.countryCode.markAsDirty();
        }
        self.telinput.writeValue('');
    };
    PhoneNumberComponent.prototype.writeValue = function (value) {
        this.onChange(value);
        this.phoneNumber = value;
    };
    PhoneNumberComponent.prototype.registerOnChange = function (fn) {
        this.onChange = fn;
    };
    PhoneNumberComponent.prototype.registerOnTouched = function (fn) {
        this.onTouch = fn;
    };
    PhoneNumberComponent.prototype.setDisabledState = function (disabled) {
        this.disabled = disabled;
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Array)
    ], PhoneNumberComponent.prototype, "countries", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["b" /* FormControl */])
    ], PhoneNumberComponent.prototype, "countryCode", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["P" /* Output */])(),
        __metadata("design:type", Object)
    ], PhoneNumberComponent.prototype, "countryCodeChange", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["E" /* Input */])(),
        __metadata("design:type", Boolean)
    ], PhoneNumberComponent.prototype, "disabled", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */])('telinput'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_4_ionic_angular__["k" /* TextInput */])
    ], PhoneNumberComponent.prototype, "telinput", void 0);
    PhoneNumberComponent = PhoneNumberComponent_1 = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            host: {
                '(input)': 'onChange',
                '(ionBlur)': 'onTouched'
            },
            selector: 'phone-number',template:/*ion-inline-start:"/home/smile/Public/Ionic/private-project/src/components/phone-number/phone-number.html"*/`<ion-item>\n    <ion-label floating><span class="w-font">Celular</span></ion-label>\n    <ion-select [(ngModel)]="country_and_code" (ionChange)="onSelect($event)">\n        <ion-option *ngFor="let c of countries" [value]="c.code">\n        {{ c.name }}\n        </ion-option>\n    </ion-select>\n  </ion-item>\n  <ion-item>\n    <span item-content padding-right>{{ dial_code }}</span>\n    <ion-input #telinput type="tel" [(ngModel)]="phone_number" [placeholder]="example_number_formatted" [brmasker]="brConfig"\n              (ionBlur)="onIonBlur($event)" (ionChange)="onIonChange($event)"></ion-input>\n  </ion-item>\n`/*ion-inline-end:"/home/smile/Public/Ionic/private-project/src/components/phone-number/phone-number.html"*/,
            providers: [
                __WEBPACK_IMPORTED_MODULE_2_brmasker_ionic_3__["a" /* BrMaskerIonic3 */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_forms__["e" /* NG_VALUE_ACCESSOR */], useExisting: PhoneNumberComponent_1, multi: true }
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_core__["u" /* ElementRef */]])
    ], PhoneNumberComponent);
    return PhoneNumberComponent;
    var PhoneNumberComponent_1;
}());

//# sourceMappingURL=phone-number.js.map

/***/ }),

/***/ 846:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PipesModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__moment_moment__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__phonemask_phonemask__ = __webpack_require__(408);
/* unused harmony namespace reexport */
/* unused harmony namespace reexport */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var PipesModule = (function () {
    function PipesModule() {
    }
    PipesModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["J" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_1__moment_moment__["a" /* MomentPipe */],
                __WEBPACK_IMPORTED_MODULE_2__phonemask_phonemask__["a" /* PhoneMaskPipe */]
            ],
            imports: [],
            exports: [
                __WEBPACK_IMPORTED_MODULE_1__moment_moment__["a" /* MomentPipe */],
                __WEBPACK_IMPORTED_MODULE_2__phonemask_phonemask__["a" /* PhoneMaskPipe */]
            ]
        })
    ], PipesModule);
    return PipesModule;
}());

//# sourceMappingURL=pipes.module.js.map

/***/ }),

/***/ 847:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ApirestProvider; });
/* unused harmony export Product */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(848);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(360);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/*
  Generated class for the ApirestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var ApirestProvider = (function () {
    function ApirestProvider(httpClient) {
        this.httpClient = httpClient;
        this.baseUrl = "https://ductor.com.br/pier/v2/api/cartoes/1/limites-disponibilidade";
        console.log('Hello ApirestProvider Provider');
    }
    ApirestProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], ApirestProvider);
    return ApirestProvider;
}());

var Product = (function () {
    function Product(values) {
        if (values === void 0) { values = {}; }
        Object.assign(this, values);
    }
    return Product;
}());

//# sourceMappingURL=apirest.js.map

/***/ }),

/***/ 851:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InfiniteListProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_common_http__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var InfiniteListProvider = (function () {
    function InfiniteListProvider(http) {
        this.http = http;
        this.perpage = 5;
        this.listDatas = [];
        console.log('Hello InfiniteListProvider Provider');
        // const httpOptions = {
        //   headers: new HttpHeaders({
        //     'Authorization' : 'Bearer cr9qu3Ju7Vo7',
        //     'Content-Type': 'application/json',
        //     'access_token' : 'cr9qu3Ju7Vo7',
        //     'client_id' : 'kjiLnbesiMMD'
        //   })
        // };
        // // const apiUrlForListing = 'https://sandbox.conductor.com.br/pier/v2/api/contas/1/transacoes?limit=30';
        // // const apiUrlForListing = 'https://sandbox.conductor.com.br/pier/v2/api/contas/1/transacoes';
        // const apiUrlForListing = 'https://sandbox.conductor.com.br/pier/v2/api/contas/1/transacoes=';
        // this.http.get(apiUrlForListing, httpOptions).subscribe(result => {
        //   this.listObject = result;
        //   this.listDatas = this.listObject.content;
        //   console.log(this.listDatas);
        // });
    }
    InfiniteListProvider.prototype.load = function (start) {
        var _this = this;
        if (start === void 0) { start = 0; }
        var httpOptions = {
            headers: new __WEBPACK_IMPORTED_MODULE_0__angular_common_http__["c" /* HttpHeaders */]({
                'Authorization': 'Bearer cr9qu3Ju7Vo7',
                'Content-Type': 'application/json',
                'access_token': 'cr9qu3Ju7Vo7',
                'client_id': 'kjiLnbesiMMD'
            })
        };
        var apiUrlForListing = 'https://sandbox.conductor.com.br/pier/v2/api/contas/1/transacoes?limit=';
        return new Promise(function (resolve) {
            _this.http.get(apiUrlForListing + _this.perpage, httpOptions)
                .subscribe(function (data) {
                resolve(data);
            });
        });
    };
    InfiniteListProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["B" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_common_http__["a" /* HttpClient */]])
    ], InfiniteListProvider);
    return InfiniteListProvider;
}());

//# sourceMappingURL=infinite-list.js.map

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ValidatorService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};

var ValidatorService = (function () {
    function ValidatorService(prior) {
        if (prior) {
            return prior;
        }
    }
    ValidatorService.ValidateEmail = function (c) {
        // RFC 2822 compliant regex
        return (c.value && c.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) ? null : { 'email': true };
    };
    ValidatorService.ValidatePhone = function (c) {
        var regEx = /^((\+\d{1,2}|1)[\s.-]?)?\(?[2-9](?!11)\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$|^$/;
        if (c.value && regEx.test(c.value)) {
            return null;
        }
        else {
            return { 'invalidPhoneNumber': true };
        }
    };
    ValidatorService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Optional */])()), __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* SkipSelf */])()),
        __metadata("design:paramtypes", [ValidatorService])
    ], ValidatorService);
    return ValidatorService;
}());

//# sourceMappingURL=validator.service.js.map

/***/ }),

/***/ 97:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthUser; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CognitoException; });
/* unused harmony export CognitoProfile */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return CognitoService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_storage__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_fromPromise__ = __webpack_require__(458);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_fromPromise___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_fromPromise__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_aws_sdk__ = __webpack_require__(459);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_aws_sdk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_aws_sdk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_moment___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_moment__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_amazon_cognito_identity_js__ = __webpack_require__(797);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__cognito_config__ = __webpack_require__(104);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};









var AuthUser = (function () {
    function AuthUser() {
        this.identityId = '';
        this.authenticated = false;
    }
    AuthUser.Factory = function () {
        return new AuthUser();
    };
    AuthUser.prototype.set = function (values) {
        if (values === void 0) { values = {}; }
        Object.assign(this, values);
    };
    return AuthUser;
}());

;
var CognitoException = (function () {
    function CognitoException(values) {
        if (values === void 0) { values = {}; }
        Object.assign(this, values);
    }
    return CognitoException;
}());

var CognitoProfile = (function () {
    function CognitoProfile(values) {
        if (values === void 0) { values = {}; }
        Object.assign(this, values);
    }
    CognitoProfile.Factory = function () {
        var init = { sub: '' };
        return new CognitoProfile(init);
    };
    return CognitoProfile;
}());

var CognitoService = (function () {
    function CognitoService(prior, storage) {
        this.storage = storage;
        this.config = __WEBPACK_IMPORTED_MODULE_8__cognito_config__["a" /* CognitoConfig */];
        this.signInSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.signOutSubject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        if (prior) {
            return prior;
        }
        if (this.config.region === 'your-region') {
            throw new Error("Cognito service has not been configured properly. Please refer to the README file for more details.");
        }
        __WEBPACK_IMPORTED_MODULE_5_aws_sdk__["config"].region = this.config.region;
        __WEBPACK_IMPORTED_MODULE_5_aws_sdk__["config"].credentials = new __WEBPACK_IMPORTED_MODULE_5_aws_sdk__["CognitoIdentityCredentials"]({
            IdentityPoolId: this.config.identityPoolId
        });
        this.poolData = { UserPoolId: this.config.userPoolId, ClientId: this.config.appId };
        this.userPool = new __WEBPACK_IMPORTED_MODULE_7_amazon_cognito_identity_js__["d" /* CognitoUserPool */](this.poolData);
        this.user = AuthUser.Factory();
    }
    CognitoService.prototype.authDetails = function (creds) {
        return new __WEBPACK_IMPORTED_MODULE_7_amazon_cognito_identity_js__["a" /* AuthenticationDetails */]({ Username: creds.username, Password: creds.password });
    };
    CognitoService.prototype.buildCreds = function () {
        var self = this;
        var json = self.buildLogins(self.session.getIdToken().getJwtToken());
        return new __WEBPACK_IMPORTED_MODULE_5_aws_sdk__["CognitoIdentityCredentials"](json);
    };
    CognitoService.prototype.buildLogins = function (token) {
        var self = this;
        var key = self.config.idpUrl + "/" + self.config.userPoolId;
        var json = { IdentityPoolId: self.config.identityPoolId, Logins: {} };
        json.Logins[key] = token;
        return json;
    };
    CognitoService.prototype.buildSocialLogins = function (key, authResult) {
        var self = this;
        var json = { IdentityPoolId: self.config.identityPoolId, Logins: {} };
        if (key === 'graph.facebook.com') {
            json.Logins[key] = authResult.accessToken;
        }
        return json;
    };
    CognitoService.prototype.buildLinkedLogins = function (identityId, token) {
        var self = this;
        var json = { IdentityPoolId: self.config.identityPoolId, IdentityId: identityId,
            Logins: {} };
        var key = 'cognito-identity.amazonaws.com';
        json.Logins[key] = token;
        return json;
    };
    CognitoService.prototype.changePassword = function (oldPassword, newPassword) {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        try {
                            if (self.cognitoUser != null) {
                                try {
                                    self.cognitoUser.changePassword(oldPassword, newPassword, function (err, result) {
                                        if (err) {
                                            reject(self.handleError(err, 'changePassword'));
                                        }
                                        else {
                                            resolve(result);
                                        }
                                    });
                                }
                                catch (error) {
                                    reject(self.handleError(error, 'try/catch changePassword'));
                                }
                            }
                            else {
                                reject(self.handleError(new Error('cognitoUser was null'), 'deleteUser'));
                            }
                        }
                        catch (error) {
                            reject(self.handleError(error, 'try/catch changePassword'));
                        }
                    })];
            });
        });
    };
    CognitoService.prototype.confirmPassword = function (username, verificationCode, password) {
        var self = this;
        var userData = {
            Username: username,
            Pool: self.userPool
        };
        var cognitoUser = new __WEBPACK_IMPORTED_MODULE_7_amazon_cognito_identity_js__["b" /* CognitoUser */](userData);
        return new Promise(function (resolve, reject) {
            try {
                cognitoUser.confirmPassword(verificationCode, password, {
                    onFailure: function (err) {
                        reject(self.handleError(err, 'confirmPassword'));
                    },
                    onSuccess: function () {
                        resolve('Confirm Password SUCCESS');
                    }
                });
            }
            catch (error) {
                reject(self.handleError(error, 'try/catch confirmPassword'));
            }
        });
    };
    CognitoService.prototype.confirmRegistration = function (code) {
        var _this = this;
        var self = this;
        var userData = {
            Username: self.cognitoUser.getUsername(),
            Pool: self.userPool
        };
        var cognitoUser = new __WEBPACK_IMPORTED_MODULE_7_amazon_cognito_identity_js__["b" /* CognitoUser */](userData);
        return new Promise(function (resolve, reject) {
            try {
                cognitoUser.confirmRegistration(code, true, function (err, result) {
                    if (err) {
                        var exception = self.handleError(err, 'confirmRegistration'); // new CognitoException(err);
                        reject(exception);
                    }
                    else {
                        console.log('confirm registration successful', result);
                        resolve(result);
                    }
                });
            }
            catch (error) {
                var exception = _this.handleError(error, 'try/catch confirmRegistration'); //new CognitoException(error);
                reject(exception);
            }
        });
    };
    CognitoService.prototype.deleteUser = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            if (self.cognitoUser != null) {
                try {
                    self.cognitoUser.deleteUser(function (err, result) {
                        if (err) {
                            // let exception: ICognitoException = this.handleError(err,'deleteUser');//new CognitoException(err);
                            // console.log('Error deleting Cognito User', exception);
                            reject(self.handleError(err, 'deleteUser'));
                        }
                        // console.log('Cognito User deletion result', result);
                        resolve(result);
                    });
                }
                catch (error) {
                    // let exception: ICognitoException = this.handleError(error,'try/catch deleteUser');//new CognitoException(error);
                    reject(self.handleError(error, 'try/catch deleteUser'));
                }
            }
            else {
                reject(self.handleError(new Error('cognitoUser was null'), 'deleteUser'));
            }
        });
    };
    CognitoService.prototype.forgotPassword = function (username) {
        var self = this;
        var userData = {
            Username: username,
            Pool: self.userPool
        };
        var cognitoUser = new __WEBPACK_IMPORTED_MODULE_7_amazon_cognito_identity_js__["b" /* CognitoUser */](userData);
        return new Promise(function (resolve, reject) {
            try {
                cognitoUser.forgotPassword({
                    onFailure: function (err) {
                        // let exception: ICognitoException = self.handleError(err,'forgotPassword');//new CognitoException(err);
                        reject(self.handleError(err, 'forgotPassword'));
                    },
                    onSuccess: function () {
                        resolve('Verification Code Sent');
                    },
                    inputVerificationCode: function () {
                        resolve('Verification Code Sent');
                    }
                });
            }
            catch (error) {
                // let exception: ICognitoException = self.handleError(error,'try/catch forgotPassword');//new CognitoException(error);
                reject(self.handleError(error, 'try/catch forgotPassword'));
            }
        });
    };
    CognitoService.prototype.getAWSCredentials = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            try {
                __WEBPACK_IMPORTED_MODULE_5_aws_sdk__["config"].credentials.get(function (err) {
                    if (err) {
                        return reject(err);
                    }
                    // console.log({'aws_credentials': AWS.config.credentials});
                    resolve(__WEBPACK_IMPORTED_MODULE_5_aws_sdk__["config"].credentials);
                });
            }
            catch (error) {
                var exception = _this.handleError(error, 'try/catch getAWSCredentials'); //new CognitoException(error);
                reject(exception);
            }
        });
    };
    CognitoService.prototype.getCredentials = function () {
        var result = null;
        if (this.cognitoUser === null) {
            result = this.getAWSCredentials();
        }
        else if (this.session && this.session.isValid()) {
            result = this.getAWSCredentials();
        }
        else {
            result = this.refreshSession().
                then(this.getAWSCredentials);
        }
        //return Observable.from(result);
        return __WEBPACK_IMPORTED_MODULE_3_rxjs_Observable__["Observable"].fromPromise(result);
    };
    CognitoService.prototype.getCognitoUser = function (creds) {
        var self = this;
        var _cognitoUser = new __WEBPACK_IMPORTED_MODULE_7_amazon_cognito_identity_js__["b" /* CognitoUser */]({ Username: creds.username, Pool: self.userPool });
        return _cognitoUser;
    };
    CognitoService.prototype.getCognitoUserData = function (creds) {
        var self = this;
        self.cognitoUser = self.getCognitoUser(creds);
        return new Promise(function (resolve, reject) {
            resolve(self.cognitoUser);
        });
        // return cognitoUser;
    };
    CognitoService.prototype.getCognitoAttributes = function (profile) {
        var cognitoAttributes = [];
        for (var key in profile) {
            if (!key.includes('password') && !key.includes('confirmPassword')) {
                var attribute = void 0;
                if (key.includes('username')) {
                    attribute = new __WEBPACK_IMPORTED_MODULE_7_amazon_cognito_identity_js__["c" /* CognitoUserAttribute */]({ Name: 'preferred_username', Value: profile[key] });
                }
                else if (key.endsWith('__c')) {
                    var k = key.substring(0, key.length - 3);
                    var name_1 = "custom:" + k;
                    attribute = new __WEBPACK_IMPORTED_MODULE_7_amazon_cognito_identity_js__["c" /* CognitoUserAttribute */]({ Name: name_1, Value: profile[key] });
                }
                else {
                    attribute = new __WEBPACK_IMPORTED_MODULE_7_amazon_cognito_identity_js__["c" /* CognitoUserAttribute */]({ Name: key, Value: profile[key] });
                }
                cognitoAttributes.push(attribute);
            }
        }
        return cognitoAttributes;
    };
    CognitoService.prototype.getCognitoAttributesData = function (profile, update) {
        var cognitoUserAttributeData = [];
        for (var key in profile) {
            if (!key.includes('password') && !key.includes('confirmPassword')) {
                var attribute = void 0;
                if (update) {
                    if (key.includes('email'))
                        continue;
                }
                if (key.includes('username')) {
                    attribute = ({ Name: 'preferred_username', Value: profile[key] });
                }
                else if (key.endsWith('__c')) {
                    var k = key.substring(0, key.length - 3);
                    // console.log(k);
                    var name_2 = "custom:" + k;
                    // console.log(name);
                    attribute = ({ Name: name_2, Value: profile[key] });
                }
                else {
                    attribute = ({ Name: key, Value: profile[key] });
                }
                cognitoUserAttributeData.push(attribute);
            }
        }
        return cognitoUserAttributeData;
    };
    CognitoService.prototype.getCognitoProfile = function (attributes) {
        var values;
        values = attributes;
        var dynObj = {
            sub: '', email: '', email_verified: false, preferred_username: ''
        };
        values.forEach(function (attr) {
            if (attr.Name.startsWith('custom:')) {
                var attributeName = attr.Name.substring(7);
                // console.log('custom attribute',attributeName);
                dynObj[attributeName] = attr.Value;
            }
            else {
                dynObj[attr.Name] = attr.Value;
            }
        });
        // console.log('dynObj', dynObj);
        var result = new CognitoProfile(dynObj);
        return result;
    };
    CognitoService.prototype.handleError = function (error, caller) {
        var exception = new CognitoException(error);
        console.error("AWS Cognito Service::handleError callerMethod::" + caller, exception);
        // this.loggerService.error(`AWS Cognito Service::handleError callerMethod::${caller}`, exception);
        return exception;
    };
    CognitoService.prototype.isAuthenticated = function () {
        var self = this;
        if (self.session) {
            return self.session.isValid();
        }
    };
    CognitoService.prototype.resendConfirmationCode = function () {
        var self = this;
        var userData = {
            Username: self.cognitoUser.getUsername(),
            Pool: self.userPool
        };
        var cognitoUser = new __WEBPACK_IMPORTED_MODULE_7_amazon_cognito_identity_js__["b" /* CognitoUser */](userData);
        return new Promise(function (resolve, reject) {
            try {
                cognitoUser.resendConfirmationCode(function (err, result) {
                    if (err) {
                        // let exception: ICognitoException = self.handleError(err,'resendConfirmationCode');
                        // console.log('error occurred while confirming registration code', exception);
                        reject(self.handleError(err, 'resendConfirmationCode'));
                    }
                    else {
                        console.log('confirm registration successful', result);
                        resolve(result);
                    }
                });
            }
            catch (error) {
                // let exception: ICognitoException = self.handleError(error,'try/catch resendConfirmationCode');//new CognitoException(error);
                reject(self.handleError(error, 'try/catch resendConfirmationCode'));
            }
        });
    };
    CognitoService.prototype.refreshCreds = function (creds) {
        var self = this;
        return new Promise(function (resolve, reject) {
            creds.refresh(function (error) {
                if (error) {
                    // let exception: ICognitoException = new CognitoException(error);
                    reject(self.handleError(error, 'refreshCreds'));
                }
                else {
                    // console.log('this is working ok');
                    resolve('creds refresh successful');
                }
            });
        });
    };
    CognitoService.prototype.refreshOrResetCreds = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            return __generator(this, function (_a) {
                self = this;
                self.cognitoUser = self.userPool.getCurrentUser();
                if (self.cognitoUser !== null) {
                    self.refreshSession();
                }
                else {
                    self.resetCreds();
                }
                return [2 /*return*/];
            });
        });
    };
    CognitoService.prototype.refreshSession = function () {
        var self = this;
        return new Promise(function (resolve, reject) {
            self.cognitoUser.getSession(function (err, session) {
                if (err) {
                    // let exception: ICognitoException = self.handleError(err,'refreshSession');//new CognitoException(err);
                    // console.log('error refreshing user session', err);
                    // reject(exception);
                    reject(self.handleError(err, 'refreshSession'));
                }
                // console.log(session);
                // console.log(self.buildLogins(session.getIdToken().getJwtToken()));
                self.storage.set('idToken', session.getIdToken().getJwtToken());
                // Link user pool identity to federated pool identity //
                __WEBPACK_IMPORTED_MODULE_5_aws_sdk__["config"].credentials = new __WEBPACK_IMPORTED_MODULE_5_aws_sdk__["CognitoIdentityCredentials"](self.buildLogins(session.getIdToken().getJwtToken()));
                // console.log(`${new Date()} - refreshed session for ${self.cognitoUser.getUsername()}. Valid?: `, session.isValid());
                console.log(__WEBPACK_IMPORTED_MODULE_5_aws_sdk__["config"]);
                self.saveCreds(session);
                resolve(session);
            });
        });
    };
    CognitoService.prototype.resetCreds = function (clearCache) {
        if (clearCache === void 0) { clearCache = false; }
        var self = this;
        self.cognitoUser = null;
        self.unauthCreds = self.unauthCreds || new __WEBPACK_IMPORTED_MODULE_5_aws_sdk__["CognitoIdentityCredentials"]({ IdentityPoolId: self.config.identityPoolId });
        if (clearCache) {
            self.unauthCreds.clearCachedId();
        }
        // this.setCredentials(this.unauthCreds);
    };
    CognitoService.prototype.saveCreds = function (session, cognitoUser) {
        var self = this;
        if (session != null) {
            self.session = session;
            self.user.authenticated = session.isValid();
        }
        if (cognitoUser) {
            self.cognitoUser = cognitoUser;
            self.user.cognitoUser = cognitoUser;
        }
        return self.setCredentials(self.buildCreds());
    };
    CognitoService.prototype.setCognitoProfile = function (cognitoUser) {
        var self = this;
        return new Promise(function (resolve, reject) {
            if (cognitoUser === null) {
                reject(null);
            }
            else {
                cognitoUser.getUserAttributes(function (err, result) {
                    if (err) {
                        var exception = self.handleError(err, 'setCognitoProfile');
                        reject(exception);
                    }
                    var dynObj = self.getCognitoProfile(result);
                    self.user.cognitoProfile = dynObj;
                    resolve(dynObj);
                });
            }
        });
    };
    CognitoService.prototype.setCredentials = function (creds) {
        var self = this;
        __WEBPACK_IMPORTED_MODULE_5_aws_sdk__["config"].credentials = creds;
        return new Promise(function (resolve, reject) {
            creds.get(function (err) {
                if (err) {
                    reject(err);
                }
                else {
                    self.user.identityId = creds.identityId;
                    self.user.authCredentials = {
                        accessKeyId: creds.accessKeyId,
                        secretAccessKey: creds.secretAccessKey,
                        sessionToken: creds.sessionToken
                    };
                    __WEBPACK_IMPORTED_MODULE_5_aws_sdk__["config"].update({
                        accessKeyId: creds.accessKeyId,
                        secretAccessKey: creds.secretAccessKey,
                        sessionToken: creds.sessionToken
                    });
                    resolve(self.user);
                }
            });
        });
    };
    CognitoService.prototype.signInWithCredentials = function (authResult) {
        var _this = this;
        var self = this;
        var token;
        var identityId;
        var key = 'graph.facebook.com';
        return new Promise(function (resolve, reject) {
            var creds;
            creds = new __WEBPACK_IMPORTED_MODULE_5_aws_sdk__["CognitoIdentityCredentials"](_this.buildSocialLogins(key, authResult));
            self.setCredentials(creds)
                .then(function (user) {
                creds = new __WEBPACK_IMPORTED_MODULE_5_aws_sdk__["CognitoIdentityCredentials"](_this.buildLinkedLogins(user.identityId, user.authCredentials.sessionToken));
                resolve(user);
            })
                .catch(function (error) {
                reject(self.handleError(error, 'error setCredentials'));
            });
        });
    };
    CognitoService.prototype.signIn = function (creds) {
        var self = this;
        self.cognitoUser = self.getCognitoUser(creds);
        return new Promise(function (resolve, reject) {
            try {
                self.cognitoUser.authenticateUser(self.authDetails(creds), {
                    newPasswordRequired: function (userAttributes, requiredAttributes) {
                        self.cognitoUser.completeNewPasswordChallenge(creds.password, requiredAttributes, {
                            onSuccess: function (session) {
                                var creds;
                                creds = new __WEBPACK_IMPORTED_MODULE_5_aws_sdk__["CognitoIdentityCredentials"](self.buildLogins(session.getIdToken().getJwtToken()));
                                var sc = self.saveCreds(session);
                                var scp = self.setCognitoProfile(self.cognitoUser);
                                Promise.all([sc, scp])
                                    .then(function (result) {
                                    self.storage.set('authUser', self.user)
                                        .then(function (oResult) {
                                        resolve(result[0]);
                                    })
                                        .catch(function (err) {
                                        reject(self.handleError(err, 'storage.set'));
                                    });
                                })
                                    .catch(function (error) {
                                    reject(self.handleError(error, 'promises.all saveCreds/setCognitoProfile'));
                                });
                            }, onFailure: function (err) {
                                reject(self.handleError(err, 'completeNewPasswordChallenge'));
                            }
                        });
                    },
                    mfaRequired: function (challangeName, challengeParameters) { },
                    customChallenge: function (challangeParameters) { },
                    onSuccess: function (session) {
                        var creds;
                        creds = new __WEBPACK_IMPORTED_MODULE_5_aws_sdk__["CognitoIdentityCredentials"](self.buildLogins(session.getIdToken().getJwtToken()));
                        var sc = self.saveCreds(session);
                        var scp = self.setCognitoProfile(self.cognitoUser);
                        Promise.all([sc, scp])
                            .then(function (result) {
                            self.storage.set('authUser', self.user)
                                .then(function (oResult) {
                                resolve(result[0]);
                            })
                                .catch(function (err) {
                                reject(self.handleError(err, 'storage.set'));
                            });
                        })
                            .catch(function (error) {
                            reject(self.handleError(error, 'promises.all saveCreds/setCognitoProfile'));
                        });
                    },
                    onFailure: function (err) {
                        reject(self.handleError(err, 'signIn'));
                    },
                });
            }
            catch (error) {
                reject(self.handleError(error, 'catch/try authenticateUser'));
            }
        });
    };
    CognitoService.prototype.signOut = function () {
        var self = this;
        // console.log(self.cognitoUser);
        if (self.cognitoUser) {
            var _username_1 = self.cognitoUser.getUsername();
            // console.log('_username', _username);
            return new Promise(function (resolve, reject) {
                try {
                    // self.deleteUser();
                    self.cognitoUser.signOut();
                    self.resetCreds(true);
                    self.user = AuthUser.Factory();
                    self.storage.ready().then(function () {
                        self.storage.remove('authUser');
                    });
                    self.signOutSubject.next(_username_1);
                    resolve('cognito service log out successful');
                }
                catch (error) {
                    reject(self.handleError(error, 'try/catch signOut'));
                }
            });
        }
    };
    CognitoService.prototype.signUp = function (creds) {
        var self = this;
        creds.mbr_since__c = __WEBPACK_IMPORTED_MODULE_6_moment__().year().toString();
        return new Promise(function (resolve, reject) {
            try {
                var attributes = [];
                attributes = self.getCognitoAttributes(creds);
                return self.userPool.signUp(creds.username, creds.password, attributes, null, function (err, result) {
                    if (err) {
                        reject(self.handleError(err, 'signUp'));
                    }
                    else {
                        // self.loggerService.info('aws registration successful', result);
                        console.log('aws registration successful', result);
                        resolve(result);
                    }
                });
            }
            catch (error) {
                reject(self.handleError(error, 'catch/try signUp'));
            }
        });
    };
    CognitoService.prototype.updateCognitoProfile = function (attributes) {
        var _this = this;
        var self = this;
        return new Promise(function (resolve, reject) { return __awaiter(_this, void 0, void 0, function () {
            var _this = this;
            var error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, self.cognitoUser.updateAttributes(attributes, function (err, result) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            if (err) {
                                                reject(self.handleError(err, 'updateAttributes'));
                                            }
                                            return [4 /*yield*/, self.setCognitoProfile(self.cognitoUser)
                                                    .then(function (profile) {
                                                    self.user.cognitoProfile = profile;
                                                    self.storage.set('authUser', self.user);
                                                    resolve(profile);
                                                })
                                                    .catch(function (error) {
                                                    reject(self.handleError(error, 'setCognitoProfile'));
                                                })];
                                        case 1:
                                            _a.sent();
                                            return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _a.sent();
                        reject(self.handleError(error_1, 'catch/try updateCognitoProfile'));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    };
    CognitoService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
        __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Optional */])()), __param(0, Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_3" /* SkipSelf */])()),
        __metadata("design:paramtypes", [CognitoService,
            __WEBPACK_IMPORTED_MODULE_1__ionic_storage__["b" /* Storage */]])
    ], CognitoService);
    return CognitoService;
}());

//# sourceMappingURL=cognito.service.js.map

/***/ })

},[409]);
//# sourceMappingURL=main.js.map