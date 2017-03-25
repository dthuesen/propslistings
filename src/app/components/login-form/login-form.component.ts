import { Component, Output, EventEmitter, OnInit } from '@angular/core';

import { FirebaseService } from '../../services/firebase.service';
import { AngularFire, AngularFireAuth } from 'angularfire2';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { IFirebaseAuthState } from '../../services/firebase.interfaces';
import { ICredentials } from '../../services/firebase.interfaces';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styles: []
})
export class LoginFormComponent implements OnInit, ICredentials {
  email: string;
  password: string;
  authenticated: any;
  private credentials: ICredentials = {
    email: '',
    password: ''
  };


  constructor(
    private router: Router,
    private FirebaseService: FirebaseService,
    public af: AngularFire,
    public _auth: AngularFireAuth,
    public flashMessage: FlashMessagesService,
  ) {}

  ngOnInit() {
    this._auth.subscribe((state: IFirebaseAuthState ) => {
        this.authenticated = state;
        console.log('LoginFormComponent - ngOnInit - state: ', state);
    });
    console.log('LoginFormComponent - ngOnInit - this.authenticated: ', this.authenticated);
  }

  submitForm(form: any): void{
    console.log('Form Data: ');
    console.log(form);
  }


  loginWithCredential(form: any) {

    this.credentials.email = form.useremail;
    this.credentials.password = form.userpassword;

    this.af.auth.login(this.credentials)
      .then( ( resolve: IFirebaseAuthState ) => {
        console.log('login-form resolve - is logged-in? ' + this.authenticated );
        console.log(`FirebaseAuthState: ${resolve.uid}`);
        this.flashMessage.show(`Hey Mister, welcome, you\'re logged-in now! 
        Your User ID: ${resolve.uid}`, {cssClass: 'alert-success', timeout: 6000});
        this.router.navigate(['listings']);
      }, ( error: Error ) => {
        console.log('login-form reject - is logged-in? ' + this.authenticated );
        this.flashMessage.show(`Hey Mister, your credentials aren\'t right! ${error.message}`, 
            {cssClass: 'alert-warning', timeout: 6000});
      });
  }
}
