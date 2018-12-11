import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PostPage } from '../pages/post/post';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { ResetpwdPage } from '../pages/resetpwd/resetpwd';
import { CreatepostPage } from '../pages/createpost/createpost';

import { Camera } from '@ionic-native/camera';

import { AngularFireModule } from 'angularfire2';   //Angular fire 
import { AngularFireAuth } from 'angularfire2/auth'; //Angular fire Auth

import { firebaseConfig } from '../config'; //firebase api
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AuthService } from '../services/auth.service';
import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreProvider } from '../services/post.service';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SignupPage,
    ResetpwdPage,
    PostPage,
    CreatepostPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig.fire),
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    SignupPage,
    ResetpwdPage,
    PostPage,
    CreatepostPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Camera,
    FirestoreProvider,
    AuthService,
    AngularFirestore,
    AngularFireAuth,
    {provide: ErrorHandler,useClass: IonicErrorHandler},
    

  ]

})
export class AppModule {}
