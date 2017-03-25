import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { IListing } from '../../services/firebase.interfaces';

@Component({
  selector: 'app-add-listing',
  templateUrl: './add-listing.component.html',
  styles: []
})
export class AddListingComponent implements OnInit {

  title: string;
  city: string;
  owner: string;
  bedrooms: number;
  type: string;
  image: string;
  price: number;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onAddSubmit() {
    let listing = {
      title: this.title,
      city: this.city,
      owner: this.owner,
      bedrooms: this.bedrooms,
      type: this.type,
      image: this.image,
      price: this.price
    };
    this.firebaseService.addListing(listing);
    this.router.navigate(['listings']);
  }

}
