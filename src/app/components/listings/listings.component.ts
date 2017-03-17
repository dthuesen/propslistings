import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({
  selector: 'app-listings',
  templateUrl: './listings.component.html',
  styles: []
})
export class ListingsComponent implements OnInit {

  listings: any;

  constructor(
    private FirebaseService: FirebaseService
  ) { }

  ngOnInit() {
    this.FirebaseService.getListings().subscribe(listings => {
      console.log(listings);
      this.listings = listings;
    });
  }

}
