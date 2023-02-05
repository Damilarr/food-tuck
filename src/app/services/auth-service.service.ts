import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
   private isSignedIn = false;

  signIn() {
    this.isSignedIn = true;
  }

  signOut() {
    this.isSignedIn = false;
  }

  isSignedInn() {
    return this.isSignedIn;
  }
}
