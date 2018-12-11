import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  Alert,NavController,AlertController, Loading, LoadingController} from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { PostPage } from '../../pages/post/post';
import { SignupPage } from '../../pages/signup/signup';
import { ResetpwdPage } from '../../pages/resetpwd/resetpwd';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})

export class LoginPage {  
  loginError: string;
  private loginForm : FormGroup;


	constructor( public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,private formBuilder: FormBuilder,private navCtrl: NavController,private auth: AuthService) {
    this.loginForm = this.formBuilder.group({
      mail: ['',Validators.compose([ Validators.required,Validators.email ])],
      password: ['',Validators.compose([
        Validators.required,
        Validators.minLength(5)
     ])],
    });
  }
        
  //User login 
  async login() : Promise<any>{
    const data = this.loginForm.value;
      if (!data.mail) {
            return;
          }
          else {
            let loading: Loading = this.loadingCtrl.create();
      loading.present();
            const credentials = {
              email: data.mail,
              password: data.password
                                };
      try {
        await this.auth.signInWithEmail(credentials);
        await loading.dismiss();
        this.navCtrl.setRoot(PostPage);
      }catch (error) {
        await loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: error.message,
          buttons: [{ text: 'Ok', role: 'cancel' }]
        });
        alert.present();
      }
          }
       
        }
  
  //Sign up
   signup(){
        this.navCtrl.push(SignupPage);
        }   
        


//forget password
forgetPassword() {
            this.navCtrl.push(ResetpwdPage);
          }




	}




