import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import firebase from 'firebase'; 


@Injectable()
export class AuthService {
	
	public fireAuth: any;
	firedata = firebase.database().ref('/users');
	
	constructor(public afAuth: AngularFireAuth,public firestore: AngularFirestore) {
		afAuth.authState.subscribe(user => {
			if(user){
				console.log(user);
			}
			else{
				console.log("no User login");
			}
		});
	}


	

	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			 credentials.password);
			 
	}

	UsersignOut(){
		console.log("test signout");
		return this.afAuth.auth.signOut();
	}



	signUp(credentials) {
		
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email,credentials.password).then(()=>{
			const id = this.firestore.createId();
			return this.firestore.doc(`User/${id}`).set({
				id,
				gmail:credentials.email,
				password:credentials.password
			});
		})
	
	}
	
	resetPassword(email) {
		var auth = firebase.auth();
		return auth.sendPasswordResetEmail(email)
		.then(() => console.log("email sent"))
		.catch((error) => console.log(error))
	  }





//

} //end
