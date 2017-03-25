import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-edit-listing',
  templateUrl: './edit-listing.component.html',
  styles: []
})
export class EditListingComponent implements OnInit {
  id: any;
  listing: any;
  imageUrl: any;

  title: string;
  city: string;
  owner: string;
  bedrooms: number;
  type: string;
  image: string;
  price: number;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // Get ID of the specific listing from the url
    this.id = this.route.snapshot.params['id'];

    this.firebaseService.getListingDetails(this.id).subscribe(listing => {
      this.title = listing.title;
      this.city = listing.city;
      this.owner = listing.owner;
      this.bedrooms = listing.bedrooms;
      this.type = listing.type;
      this.image = listing.image;
      this.price = listing.price;

      // // Ref to the root of the cloud bucket
      // const storageRef = firebase.storage().ref();
      // // Ref to the image
      // const spaceRef = storageRef.child(this.listing.path);
      // // resolving the promise with...
      // storageRef.child(this.listing.path)
      //           // getting the download url
      //           .getDownloadURL()
      //           // and setting it to the image url
      //           .then( (url) => {
      //             this.imageUrl = url;
      // })
      // // in case there are any errors
      // .catch((error) => {
      //   console.log('Error occors in getting image: ', error);
      });
  }

  onEditSubmit() {
    let listing = {
      title: this.title,
      city: this.city,
      owner: this.owner,
      bedrooms: this.bedrooms,
      type: this.type,
      image: this.image,
      price: this.price
    };
    this.firebaseService.updateListing(this.id, listing);

    this.router.navigate(['/listing/' + this.id]);
  }

}
