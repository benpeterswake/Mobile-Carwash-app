import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  email;
  password;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, private toast: ToastController, public menuCtrl: MenuController) {
     this.menuCtrl.enable(false, 'myMenu');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    try{
      this.afAuth.auth.signInWithEmailAndPassword(this.email, this.password);
    } catch(e){
      this.toast.create({
        message: "Invalid email or password!",
        duration: 3000,
        cssClass: "toast-error"
      }).present();
    }
  }

  goToRegisterPage(){
    this.navCtrl.push(SignupPage)
  }

}
