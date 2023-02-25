import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthRegisterService {
  user:any =''
  constructor(private http:HttpClient) { }
  signUp(user:any): Observable<any> {
    let url = 'http://localhost:3007/register/new'
    return this.http.post<any>(url,user);
  }
  signIn(user:any): Observable<any>{
    let url =  'http://localhost:3007/register/login'
    return this.http.post<any>(url,user)
  }
  signWithGoogle(idToken:any): Observable<any>{
    let url = 'http://localhost:3007/google-auth'
    return this.http.post<any>(url,idToken)
  }
  setUser(user:any){
  sessionStorage.setItem('user',  JSON.stringify(user))
  }
  getUser(){
    let user:any = sessionStorage.getItem('user');
    return JSON.parse(user)
  }
}
