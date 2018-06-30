import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { ServiceOnePage } from '../service-one/service-one';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

declare var google;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  @ViewChild('map') mapElement: ElementRef;
  title: any;
  map: any;
  coordsLat: any;
  coordsLng: any;
  activeOrder: any;
  order = {};
  active: any;
  userId: any;
  search: any;
  price: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public geolocation: Geolocation,
    public menuCtrl: MenuController,
    public afAuth: AngularFireAuth,
    public afDatabase: AngularFireDatabase,
    private alertCtrl: AlertController) {
    this.menuCtrl.enable(true, 'myMenu');
    this.userId = firebase.auth().currentUser.uid;
    this.active = false;
    //selected service
    this.title = this.navParams.get("title")
    if(this.title){
      this.loadMap()
      this.price = this.afDatabase.object("prices/").valueChanges()
    }
  }

  ionViewDidLoad(){
    firebase.database().ref(`profile/${this.userId}/order`).once("value", snapshot => {
      if(snapshot.val() == null){
        console.log('Small bug here')
      }else if(snapshot.val().active){
          this.active = true;
          this.activeOrder = this.afDatabase.object(`profile/${this.userId}/order`).valueChanges()
      }
    })
  }

  loadMap(){
    this.geolocation.getCurrentPosition().then((position) => {

      this.coordsLat = position.coords.latitude;
      this.coordsLng = position.coords.longitude;

      let latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

      let mapOptions = {
          center: latLng,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          zoomControl: true,
          mapTypeControl: false,
          scaleControl: true,
          streetViewControl: false,
          rotateControl: true,
          fullscreenControl: false
      }

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      let marker = new google.maps.Marker({
          position: latLng,
          title: "Your Location"
      });
      marker.setMap(this.map);
    }, (err) => {
      console.log(err);
    });

  }

  selectService(id){
    this.navCtrl.push(ServiceOnePage, {
      serviceID: id
    })
  }

  confirmOrder(){
    this.order = {
      title: this.title,
      price: 25,
      workerID: "looking",
      lat: this.coordsLat,
      lng: this.coordsLng,
      active: true
    }
    this.afDatabase.object(`profile/${this.userId}/order`).update(this.order)
    .then(() => this.navCtrl.setRoot(HomePage));
  }

  cancelOrder(){
    //if on preorder screen and you cancel then dont show the alert
    if(this.title){
      this.afDatabase.object(`profile/${this.userId}/order`).set({active: false})
      .then(() => this.navCtrl.setRoot(HomePage));
    }else{
    //else if you're on the active order screen then show alert
      let alert = this.alertCtrl.create({
        title: 'Confirm Cancelation',
        message: 'You will be charged a $5 cancelation fee',
        buttons: [
          {
            text: 'Don\'t Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Confirm',
            handler: () => {
              this.afDatabase.object(`profile/${this.userId}/order`).set({active: false})
              .then(() => this.navCtrl.setRoot(HomePage));
            }
          }
        ]
      });
      alert.present();
    }

  }

}
