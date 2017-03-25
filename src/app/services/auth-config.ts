import { AuthProviders, AuthMethods } from 'angularfire2';
import { FirebaseConfigObject } from './firebase-config-object';

// The firebase config object is in a separate file wich
// will not pushed to github
export const FirebaseConfig = FirebaseConfigObject;

export const FirebaseAuthConfig = {
  // provider: AuthProviders.Google,   // <---- use with Google signin
  // method: AuthMethods.Redirect
  // method: AuthMethods.Popup         // <---- use with Google signin
  provider: AuthProviders.Password,
  method: AuthMethods.Password,
};
