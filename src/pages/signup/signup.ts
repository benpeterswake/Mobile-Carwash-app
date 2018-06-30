import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

import * as firebase from 'firebase/app';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  profile = {};
  email;
  password;

  constructor(public navCtrl: NavController, public navParams: NavParams, public afAuth: AngularFireAuth, public afDatabase: AngularFireDatabase, private toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  async signUp(){
    try{
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password);
      if(result){
        this.afAuth.authState.take(1).subscribe(auth => {
          this.afDatabase.object(`profile/${auth.uid}`).set(this.profile)
          .then(() => {
            this.afDatabase.object(`profile/${auth.uid}/order`).set({active: false})
            .then(() => this.navCtrl.setRoot(HomePage));
          });
        });
      }
    }catch(e){
      this.toast.create({
        message: e.message,
        duration: 3000,
        cssClass: "toast-error"
      }).present();
      console.log(e)
    }
  }

  goToLoginPage(){
    this.navCtrl.setRoot(LoginPage)
  }

}
