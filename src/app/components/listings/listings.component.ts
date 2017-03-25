import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styles: []
})
export class ListingsComponent implements OnInit {

  listings: any;
  imageUrl: any;

  constructor(
    private FirebaseService: FirebaseService,
  ) { }

  ngOnInit() {
    this.FirebaseService.getListings().subscribe(listings => {
      console.log('In Listings - log listings: ', listings);
      this.listings = listings;
      // Ref to the root of the cloud bucket
      const storageRef = firebase.storage().ref();
      // Ref to the image
      const spaceRef = storageRef.child(listings[0].path);
      console.log('spaceRef', spaceRef);
    });

  }

}
