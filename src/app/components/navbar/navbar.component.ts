import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { AngularFire } from 'angularfire2';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private FirebaseService: FirebaseService,
    public af: AngularFire,
    public flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  login() {
    // this.af.auth.login({ email: 'email', password: 'pass' });
    this.af.auth.login(); // This version should bring the google popup
    this.flashMessage.show('Hey Mister, welcome, you\'re logged-in now!', {cssClass: 'alert-success', timeout: 15000});
  }

  logout() {
    this.af.auth.logout();
    this.router.navigate(['']);
    this.flashMessage.show('Hey, you\'re logged-out now!', {cssClass: 'alert-warning', timeout: 3000});
  }

}
