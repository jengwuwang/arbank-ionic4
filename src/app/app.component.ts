import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WelcomePage, HomePage, MyCardPage} from '../pages/pages.module';
import { BusinessService } from '../common/common.module';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage:any;

  constructor(private businessService: BusinessService, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(async () => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();

      await this.businessService.checkAuthorization();

      if (this.businessService.authUser.authenticated && this.businessService.authUser.cognitoUser) {
        this.rootPage = MyCardPage;
      } else {
        this.rootPage = WelcomePage;
      }
    });
  }
}
