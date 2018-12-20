import { NgModule, Optional, SkipSelf } from '@angular/core';
import { throwIfAlreadyLoaded } from '../common/common.module';
import { HomePage } from './home/home';
import { WelcomePage } from './welcome/welcome';
import { LoginPage } from './login/login';
import { SignupPage } from './signup/signup';
import { ProfilePage } from './profile/profile';
import { SignupconfirmPage } from './signupconfirm/signupconfirm';
import { ChangePasswordPage } from './change-password/change-password';
import { ForgotPage } from './forgot/forgot';
import { ForgotConfirmPage } from './forgot-confirm/forgot-confirm';
import { MyCardPage } from './my-card/my-card';
import { ExtratoCreditoPage } from './extrato-credito/extrato-credito';
import { ComprovantesPage } from './comprovantes/comprovantes';
import { DepositPage } from './deposit/deposit';
import { DepositTicketPage } from './deposit-ticket/deposit-ticket';
import { TranferenciaPage } from './tranferencia/tranferencia';
import { TransferenciaSegundaPage } from './transferencia-segunda/transferencia-segunda';
import { TransferenciaTerceiraPage } from './transferencia-terceira/transferencia-terceira';
import { SenhaPagamentoPage } from './senha-pagamento/senha-pagamento';
import { ComprovanteContaPage } from './comprovante-conta/comprovante-conta';

export const AppPages = [
    ChangePasswordPage,
    ForgotPage,
    ForgotConfirmPage,
    HomePage,
    LoginPage,
    ProfilePage,
    SignupPage,
    SignupconfirmPage,
    WelcomePage,
    MyCardPage,
    ExtratoCreditoPage,
    ComprovantesPage,
    DepositPage,
    DepositTicketPage,
    TranferenciaPage,
    TransferenciaSegundaPage,
    TransferenciaTerceiraPage,
    SenhaPagamentoPage,
    ComprovanteContaPage,
];

export const MainPage = WelcomePage;

export * from './change-password/change-password';
export * from './forgot/forgot';
export * from './forgot-confirm/forgot-confirm';
export * from './home/home';
export * from './login/login';
export * from './signup/signup';
export * from './signupconfirm/signupconfirm';
export * from './welcome/welcome';
export * from './profile/profile';
export * from './my-card/my-card';
export * from './extrato-credito/extrato-credito';
export * from './comprovantes/comprovantes';
export * from './deposit/deposit';
export * from './deposit-ticket/deposit-ticket';
export * from './tranferencia/tranferencia';
export * from './transferencia-segunda/transferencia-segunda';
export * from './transferencia-terceira/transferencia-terceira';
export * from './senha-pagamento/senha-pagamento';
export * from './comprovante-conta/comprovante-conta';

NgModule({
    declarations: [
        AppPages,
        WelcomePage
    ],
    imports: [],
    exports: [
        AppPages,
        WelcomePage
    ]
})
export class PagesModule {
    constructor(@Optional() @SkipSelf() parentModule: PagesModule){
        throwIfAlreadyLoaded(parentModule, 'PagesModule');
    }
}
