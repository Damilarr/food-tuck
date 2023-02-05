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
  setUser(user:any){
    this.user = user
  }
  getUser(){
    return this.user;
  }
}
