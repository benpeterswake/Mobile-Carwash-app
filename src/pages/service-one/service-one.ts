import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-service-one',
  templateUrl: 'service-one.html',
})
export class ServiceOnePage {

  serviceID: any;
  title: any;
  price: any;
  time: any;
  overview: any;
  imgs = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.serviceID = this.navParams.get("serviceID");

    if(this.serviceID === 1){
      this.title = "Basic Scrub";
      this.overview = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
      this.price = "$20-25";
      this.time = "30-45 mins";
      this.imgs = {
        img1: "https://previews.123rf.com/images/imthong89/imthong891403/imthong89140300055/26712280-beauty-black-car-with-soap-in-car-wash.jpg",
        img2: "https://previews.123rf.com/images/tomwang/tomwang1312/tomwang131200077/24477392-hands-hold-sponge-for-washing-car.jpg",
        img3: "https://previews.123rf.com/images/nejron/nejron1803/nejron180300563/98116417-man-worker-washing-cars-alloy-wheels-on-a-car-wash-.jpg"
      }

    }else if (this.serviceID === 2){
      this.title = "Basic Scrub Plus";
      this.overview = "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      this.price = "$30-35";
      this.time = "40-45 mins"
    }
  }

  ionViewDidLoad(){
    console.log('ionViewDidLoad ServiceOnePage');
  }

  orderService(){
    this.navCtrl.setRoot(HomePage, {
        title: this.title,
        serviceID: this.serviceID
      }
    )
  }

}
