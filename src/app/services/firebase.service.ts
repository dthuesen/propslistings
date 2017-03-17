import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

@Injectable()
export class FirebaseService {

  listings: FirebaseListObservable<any[]>;

  constructor(
    private af: AngularFire
  ) { }

  getListings(){
    this.listings = this.af.database.list('/listings') as FirebaseListObservable<IListing[]>
    return  this.listings;
  }

}

interface IListing {
  $key?: string;
  title?: string;
  type?: string;
  image?: string;
  city?: string;
  owner?: string;
  bedrooms?: number;
  path?: string;
  price?: string;
}
