import { Component, OnInit } from '@angular/core';
import { AngularFire, AuthProviders, AuthMethods, AngularFireAuth } from 'angularfire2';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { IFirebaseAuthState } from '../../services/firebase.interfaces';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit, IFirebaseAuthState {
  authenticated: any;
  auth: any;
  uid: any;

  constructor(
        public af: AngularFire,
        private router: Router,
        public _auth: AngularFireAuth,
        private FirebaseService: FirebaseService,
        public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    this._auth.subscribe((state: IFirebaseAuthState ) => {
        this.authenticated = state;
        console.log('HomeComponent - ngOnInit - state: ', state);
    });
    console.log('HomeComponent - ngOnInit - this.authenticated: ', this.authenticated);
  }

  loginWithGoogle() {
    this.af.auth.login( {
      provider: AuthProviders.Google,   // <---- use with Google signin
      method: AuthMethods.Redirect         // <---- use with Google signin
    } )
    .then( ( resolve: IFirebaseAuthState ) => {
        console.log('HomeComponent resolve - is logged-in? ' + this.af.auth );
        console.log(`FirebaseAuthState: ${resolve.uid}`);
        this.flashMessage.show(`Hey Mister, welcome, you\'re logged-in with Google! 
        Your User ID: ${resolve.uid}`, {cssClass: 'alert-success', timeout: 6000});
        // this.router.navigate(['listings']);
      }, ( error: Error ) => {
        console.log('HomeComponent reject - is logged-in? ' + this.af.auth._getNow );
        this.flashMessage.show(`Hey Mister, your credentials aren\'t right! ${error.message}`,
            {cssClass: 'alert-warning', timeout: 6000});
      });
    // this.router.navigate(['listings']);
    this.flashMessage.show('Hey Mister, welcome, you\'re logged-in with Google!', {cssClass: 'alert-success', timeout: 15000});
  }

}
