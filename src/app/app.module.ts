import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlashMessagesModule } from 'angular2-flash-messages';

import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { FirebaseService } from './services/firebase.service';
import { AuthenticationGuard } from './services/authentication.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ListingsComponent } from './components/listings/listings.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddListingComponent } from './components/add-listing/add-listing.component';
import { EditListingComponent } from './components/edit-listing/edit-listing.component';


// Must export the config
export const firebaseConfig = {
  apiKey: 'AIzaSyASID39mSDRiQq9nSAO8-Kmz5p6CJBBH_A',
  authDomain: 'proplistings-e38d6.firebaseapp.com',
  databaseURL: 'https://proplistings-e38d6.firebaseio.com',
  storageBucket: 'proplistings-e38d6.appspot.com',
  messagingSenderId: '337292254170'
};

const firebaseAuthConfig = {
  provider: AuthProviders.Google,
  // method: AuthMethods.Redirect
  method: AuthMethods.Popup
};

// ROUTES
const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'listings', component: ListingsComponent, canActivate: [AuthenticationGuard] },
  { path: 'add-listings', component: AddListingComponent, canActivate: [AuthenticationGuard] },
  { path: 'listing/:id', component: ListingComponent, canActivate: [AuthenticationGuard] }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListingsComponent,
    NavbarComponent,
    ListingComponent,
    AddListingComponent,
    EditListingComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    FlashMessagesModule,
  ],
  providers: [
    FirebaseService,
    AuthenticationGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
