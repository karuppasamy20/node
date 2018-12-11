import { Component } from '@angular/core';
import { IonicPage, NavController,AlertController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';
import { CreatepostPage } from '../createpost/createpost';


import { Song } from '../../models/post.interface';
import { FirestoreProvider } from '../../services/post.service';

import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';





@IonicPage()
@Component({
  selector: 'page-post',
  templateUrl: 'post.html',
})
export class PostPage {
  //
  captureDataUrl: string;
  alertCtrl: AlertController;

  //@Input('useURI') useURI: Boolean = true;
  //
  usermail:any;
  uid:any;
  Downloadimage:any;
  data:any;
  public songList: any;
  constructor(private camera: Camera,alertCtrl: AlertController,public firestoreProvider: FirestoreProvider,public afAuth: AngularFireAuth,public navCtrl: NavController,private auth: AuthService, public navParams: NavParams) {
    this.alertCtrl = alertCtrl;
  }

  //
  getPicture(sourceType){
    const cameraOptions: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType
    };

    this.camera.getPicture(cameraOptions)
     .then((captureDataUrl) => {
       this.captureDataUrl = 'data:image/jpeg;base64,' + captureDataUrl;
    }, (err) => {
        console.log(err);
    });
  }

upload() {
    let storageRef = firebase.storage().ref();
    // Create a timestamp as filename
    const filename = Math.floor(Date.now() / 1000);

    // Create a reference to 'images/todays-date.jpg'
    const imageRef = storageRef.child(`images/1.jpg`);

    imageRef.putString(this.captureDataUrl, firebase.storage.StringFormat.DATA_URL)
      .then((snapshot)=> {
        // Do something here when the data is succesfully uploaded!
        this.showSuccesfulUploadAlert();

    });

  }

  showSuccesfulUploadAlert() {
    let alert = this.alertCtrl.create({
      title: 'Uploaded!',
      subTitle: 'Picture is uploaded to Firebase',
      buttons: ['OK']
    });
    alert.present();
    // clear the previous photo data in the variable
    this.captureDataUrl = "";
  }
  //


  goToCreatePage(){
    this.navCtrl.push(CreatepostPage);
  }


  ionViewDidLoad() {
    this.songList = this.firestoreProvider.getSongList().valueChanges();
    this.data=this.firestoreProvider.getSongData().valueChanges();
    // console.log('this.data',this.data);
    // imgElem.setAttribute('src', this.data.photo);
  }

  goToDetailPage(song: Song){
    //this.navCtrl.push(DetailPage, { song: song });
  }


  logout(){
    this.auth.UsersignOut();
    this.navCtrl.setRoot(LoginPage);
  }


  view(){


    let storageRef = firebase.storage().ref();

    var imageRef = storageRef.child(`images/1.jpg`);
    // Create a reference to the file we want to download

    imageRef.getDownloadURL().then((url)=>{
      this.Downloadimage=url;
    }).catch(function(error) {

  //
  switch (error.code) {
    case 'storage/object_not_found':
      // File doesn't exist
      break;

    case 'storage/unauthorized':
      // User doesn't have permission to access the object
      break;

    case 'storage/canceled':
      // User canceled the upload
      break;
    case 'storage/unknown':
      // Unknown error occurred, inspect the server response
      break;
  }
  //


    });

  }










//end
}
