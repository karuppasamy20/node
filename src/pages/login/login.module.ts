import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';
import { SignupPage } from '../signup/signup';
//import { ResetpwdPage } from '../resetpwd/resetpwd';

@NgModule({
  declarations: [
    LoginPage,
    SignupPage,
    //ResetpwdPage
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
  entryComponents: [
    SignupPage,
    //ResetpwdPage
  ],
})
export class LoginPageModule {}
