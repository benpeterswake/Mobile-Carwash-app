import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

import { HomePage } from '../pages/home/home';
import { CarsPage } from '../pages/cars/cars';
import { LoginPage } from '../pages/login/login';
import { ExplorePage } from '../pages/explore/explore';
import { PaymentPage } from '../pages/payment/payment'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  profileData;
  rootPage: any = LoginPage;
  pages: Array<{title: string, component: any, icon: string}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private afAuth: AngularFireAuth, private afDatabase: AngularFireDatabase, private toast: ToastController) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon:'home' },
      { title: 'My Cars', component: CarsPage, icon:'car' },
      { title: 'Payment', component: PaymentPage, icon:'card' },
      { title: 'Explore', component: ExplorePage, icon:'compass' }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          this.profileData = this.afDatabase.object(`profile/${user.uid}`).valueChanges();
          this.nav.setRoot(HomePage);
          this.toast.create({
            message: `Login Successful!`,
            duration: 1000,
            cssClass: "toast-success"
          }).present();
        } else {
          this.profileData = null;
          this.nav.setRoot(LoginPage);
        }
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(){
    this.afAuth.auth.signOut()
  }
}
