import { Component } from '@angular/core';
import { IonicPage, NavController ,ToastController} from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupError: string;
  private SignupForm : FormGroup;

	constructor(private toastCtrl: ToastController,private formBuilder: FormBuilder,private navCtrl: NavController,private auth:AuthService) {
   
    
    this.SignupForm = this.formBuilder.group({
      mail: ['',Validators.compose([ Validators.required,Validators.email ])],
      password: ['',Validators.compose([
        Validators.required,
        Validators.minLength(5)
     ])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
		let data = this.SignupForm.value;
		let credentials = {
			email: data.mail,
			password: data.password
		};
    this.auth.signUp(credentials).then(() => 
      this.navCtrl.setRoot(LoginPage),
			error => this.signupError = error.message,
    );
   this.presentToast();
  }

  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'account created successfully',
      duration: 3000,
      position: 'top'
    });
    toast.onDidDismiss(() => {
      this.navCtrl.push(LoginPage);
    });
    toast.present();
  }

  backtologin(){
    this.navCtrl.push(LoginPage);
  }
  
}
