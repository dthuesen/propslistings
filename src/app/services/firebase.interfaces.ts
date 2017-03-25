import { AuthProviders, AngularFire } from 'angularfire2';

export interface IFirebaseAuthState {
  provider?: AuthProviders;
  auth: firebase.User;
  expires?: number;
  uid: string;
  github?: firebase.UserInfo;
  google?: firebase.UserInfo;
  twitter?: firebase.UserInfo;
  facebook?: firebase.UserInfo;
  anonymous?: boolean;
}

export interface ICredentials {
  email: string;
  password: string;
};

export interface IListing {
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
