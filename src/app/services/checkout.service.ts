import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private http:HttpClient) { }
  makePayment(stripeToken:any):Observable<any>{
    const url = `${environment.SERVER_URL}/checkout`
    return this.http.post<any>(url,{token:stripeToken});
  }
}
