import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase/app';
import { Song } from '../models/post.interface';

@Injectable()
export class FirestoreProvider {

  constructor(public firestore: AngularFirestore) {

  }

  createSong(albumName: string,artistName: string,songDescription: string,songName: string ) {

    const id = this.firestore.createId();

    return this.firestore.doc(`songList/${id}`).set({
      id,
      albumName,
      artistName,
      songDescription,
      songName
    });
  }



  getSongList(){
    return this.firestore.collection(`songList`);
  }

  getSongData(){
    return this.firestore.collection(`id`);
  }

  deleteSong(songId: string){
    return this.firestore.doc(`songList/${songId}`).delete();
  }

}
