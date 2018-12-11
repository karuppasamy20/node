import { Component } from '@angular/core';
import { Alert,AlertController, Loading, LoadingController,IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-resetpwd',
  templateUrl: 'resetpwd.html',
})
export class ResetpwdPage {
  signupError: string;
  private ResetPassForm : FormGroup;

  constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public alertCtrl: AlertController,private auth: AuthService, public navParams: NavParams,private formBuilder: FormBuilder) {
        this.ResetPassForm = this.formBuilder.group({
        mail: ['',Validators.compose([ Validators.required,Validators.email ])]
      });
  
    }

   //reset password
 
  async ResetPassword():Promise<any>{
      let loading: Loading = this.loadingCtrl.create();
      loading.present();
      const email: string = this.ResetPassForm.value.mail;
      try {
        await this.auth.resetPassword(email);
        await loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: `rest password link sent to your mail!`,
          buttons: [
            {
              text: 'Ok', role: 'cancel',
              handler: data => { this.navCtrl.pop(); }
            }]
        });
        alert.present();
      } catch (error) {
        await loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancel' }]
        });
        alert.present();
      }
    
    //
      this.auth.resetPassword(this.ResetPassForm.value);
     
    }
   


    backtologin(){
      this.navCtrl.push(LoginPage);
    }


}






