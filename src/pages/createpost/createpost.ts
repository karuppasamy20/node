import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Loading,
  LoadingController,
  AlertController,
  Alert } from 'ionic-angular';
  import { FormGroup, FormBuilder, Validators } from '@angular/forms';
  import { Camera, CameraOptions } from '@ionic-native/camera';
  import { FirestoreProvider } from '../../services/post.service';
  import firebase from 'firebase'; 
  import {storage } from 'firebase';
import {AuthService} from '../../services/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-createpost',
  templateUrl: 'createpost.html',
})
export class CreatepostPage {

  public createForm: FormGroup;
  constructor(public navCtrl: NavController,public firestore: AngularFirestore,private cameraPlugin: Camera, public navParams: NavParams,public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public firestoreProvider: FirestoreProvider,
    formBuilder: FormBuilder) {
      this.createForm = formBuilder.group({
        albumName: ['', Validators.required],
        artistName: ['', Validators.required],
        songDescription: ['', Validators.required],
        songName: ['', Validators.required],
      });
      
  }

  createSong() {
    const loading: Loading = this.loadingCtrl.create();
   loading.present();
  
    const albumName = this.createForm.value.albumName;
    const artistName = this.createForm.value.artistName;
    const songDescription = this.createForm.value.songDescription;
    const songName = this.createForm.value.songName;
   

    this.firestoreProvider.createSong(albumName, artistName, songDescription, songName).then(
      () => {
        loading.dismiss().then(() => {
          this.navCtrl.pop();
        });
      },
      error => {
        loading.dismiss().then(() => {
          const alert: Alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: 'Ok', role: 'cancel' }],
          });
          alert.present();
        });
      }
    );
  }

//end



}
