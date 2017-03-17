import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { AngularFire } from 'angularfire2';


@Injectable()
export class AuthenticationGuard implements CanActivate {

  authenticated: any;

    constructor(
      private router: Router,
      private FirebaseService: FirebaseService,
      public af: AngularFire
      ) {
        console.log('auth in constructor in AuthenticationGuard');
        this.af.auth.subscribe(auth => {
          console.log(auth);
          this.authenticated = auth;
        });
      }

    canActivate(): boolean {
      if ( this.authenticated ) {
        console.log('canActivate says: this.af.auth = true');
        return true;
      }
      this.router.navigate(['']);
      console.log('canActivate says: this.af.auth = false');
      return false;
    }
}
