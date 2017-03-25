import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { FlashMessagesService } from 'angular2-flash-messages';

import { IListing } from './firebase.interfaces';
import * as firebase from 'firebase';

@Injectable()
export class FirebaseService {

  listings: FirebaseListObservable<any[]>;
  listing: FirebaseObjectObservable<any>;
  folder: any;

  // Create root ref that points to the root of the cloud bucket
  private storageRef = firebase.storage().ref();
  // Variable for storing a Ref to the specific image
  private imageRef: any;

  constructor(
    private af: AngularFire,
    public flashMessage: FlashMessagesService,
  ) {
    this.folder = 'listingimages';
    this.listings = this.af.database.list('/listings') as FirebaseListObservable<IListing[]>;
  }


  getListings() {
    return  this.listings;
  }

  getListingDetails(id) {
    // fetch details of listing
    this.listing = this.af.database.object('/listings/' + id) as FirebaseObjectObservable<IListing>;
    console.log('this.listing: ', this.listing);
    return this.listing;
  }

  addListing(listing) {
    // Create root ref that points to the root of the cloud bucket
    const storageRef = firebase.storage().ref();
    // getting the name of the selected image in the form (input element with id="image")
    for (const selectedFile of [(<HTMLInputElement>document.getElementById('image')).files[0]]) {
      // putting the path together wit the filename
      const path = `/${this.folder}/${selectedFile.name}`;
      // building the reference one step lower in the tree to the file itself
      const iRef = storageRef.child(path);
      // now with the put method the file will be taken via the JavaScript File and Blob APIs
      // and uploaded to the specific location
      // MDM says: "A Blob object represents a file-like object of immutable, raw data. Blobs represent
      // data that isn't necessarily in a JavaScript-native format.""
      iRef.put(selectedFile)
          // Solving the promise wtih...
          .then( (snapshot) => {
            // adding the name of the image to the db entry of the
            // the parameter
            listing.image = selectedFile.name;
            // and the path as well
            listing.path = path;
            // and returning it with a push adding it
            // to this.listings with all the information 
            // of the form and the image
            return this.listings.push(listing);
          });
    }
  }

  updateListing(id, listing) {
    return this.listings.update(id, listing);
  }

  getRefToImage(id) {
    this.getListingDetails(id).subscribe( listing => {
      // Create a Ref to the specific image
      return this.imageRef = this.storageRef.child(listing.path);
    });

  }

  deleteImage(id) {
      // making this.flashMessage available for .catch()
      const flashText = this.flashMessage;

      this.getRefToImage(id);

      // Delete image only if it exists
      if (this.imageRef) {
        // Delete the file
        this.imageRef.delete().then(function() {
          // File deleted successfully
          console.log('File deleted - object "listing": ', this.listing );
        }).catch(function(error) {
            // Uh-oh, an error occurred!
            console.log('An error occured: ', error.message);
        });
      } else {
        flashText.show(`There was no image to delete!`,
            {cssClass: 'alert-warning', timeout: 6000});
        console.log(`Image path is empty: ${this.imageRef}`);
      }
  }
  // deleteImage(id) {

  //   this.getListingDetails(id).subscribe( listing => {

  //     // Create root ref that points to the root of the cloud bucket
  //     const storageRef = firebase.storage().ref();

  //     // Create a Ref to the specific image
  //     const imageRef = storageRef.child(listing.path);

  //     // making this.flashMessage available for .catch()
  //     const flashText = this.flashMessage;

  //     // Delete image only if it exists
  //     if (imageRef) {
  //       // Delete the file
  //       imageRef.delete().then(function() {
  //         // File deleted successfully
  //         console.log('File deleted - object "listing": ', listing );
  //       }).catch(function(error) {
  //           // Uh-oh, an error occurred!
  //           console.log('An error occured: ', error.message);
  //           flashText.show(error.message,
  //             {cssClass: 'alert-danger', timeout: 6000});
  //       });
  //     } else {
  //       flashText.show(`There was no image to delete!`,
  //           {cssClass: 'alert-warning', timeout: 6000});
  //       console.log(`Image path is empty: ${imageRef}`);
  //     }
  //   });
  // }

  deleteListing(id) {
    console.log(id);
    const listing: IListing = this.getListingDetails(id);
    this.flashMessage.show(`Your listing has been successfully deleted.`,
            {cssClass: 'alert-success', timeout: 6000});
    // First:
    // Delete the picture
    this.deleteImage(id);

    // ... and finally:
    // Delete the rest of the listing:
    return this.listings.remove(id);
  }
}

