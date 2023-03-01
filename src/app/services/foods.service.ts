import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'; 

@Injectable({
  providedIn: 'root'
})
export class FoodsService {
  api_url = environment.SERVER_URL;
  constructor(private http:HttpClient) { }
  getFoods(foodType:string): Observable<any> {
    return this.http.get(`https://free-food-menus-api-production.up.railway.app/${foodType}`);
    // return this.http.get(`http://localhost:3200/${foodType}`);
  }
}
