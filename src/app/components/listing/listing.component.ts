import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import * as firebase from 'firebase';


@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styles: []
})
export class ListingComponent implements OnInit {
  id: any;
  listing: any;
  imageUrl: any;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Get ID of the specific listing from the url
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getListingDetails(this.id).subscribe(listing => {
      this.listing = listing;
      console.log('listing:', this.listing );

      // Ref to the root of the cloud bucket
      const storageRef = firebase.storage().ref();
      // Ref to the image
      const spaceRef = storageRef.child(listing.path);

      if (spaceRef) {

        // resolving the promise with...
        storageRef.child(this.listing.path)
                  // getting the download url
                  .getDownloadURL()
                  // and setting it to the image url
                  .then( (url) => {
                    this.imageUrl = url;
        })
        // in case there are any errors
        .catch((error) => {
          console.log('Error occors in getting image: ', error);
        });
      }
    });
  }

  onDeleteClick() {
    this.firebaseService.deleteListing(this.id);

    this.router.navigate(['/listings']);
  }

}
