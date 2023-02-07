import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor() { }
   private isSignedIn = false;

  signIn() {
   const signedIn = sessionStorage.getItem('TOKEN')
   if (signedIn) {
    this.isSignedIn = true;
   } 
  }

  signOut() {
    this.isSignedIn = false;
  }

  isSignedInn() {
    return this.isSignedIn;
  }
}
