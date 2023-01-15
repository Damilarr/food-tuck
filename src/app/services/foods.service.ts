import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodsService {

  constructor(private http:HttpClient) { }
  getFoods(foodType:string): Observable<any> {
    return this.http.get(`https://free-food-menus-api-production.up.railway.app/${foodType}`);
    // return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
  getAnyFood(food:any): Observable<any> {
    return this.http.get(`https://free-food-menus-api-production.up.railway.app/${food}`);
    // return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
}
