import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthRegisterService } from './auth-register.service';

import { WishListService } from './wish-list.service';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(
    private wishservice: WishListService,
    private http: HttpClient,
    private userService: AuthRegisterService
  ) {}
  // product:any = []
  // private product  = new  BehaviorSubject<array>([]){

  // }
  User: any;
  url: any = `${environment.SERVER_URL}/cart`;
  public product: any = new BehaviorSubject<string[]>([]);
  myProductArray$ = this.product.asObservable();

  private cartQuantity = new BehaviorSubject<number>(0);
  myValue$ = this.cartQuantity.asObservable();

  setCartQuantity(newValue: number) {
    this.cartQuantity.next(newValue);
  }
  storeCart(products: any) {
    this.User = this.userService.getUser();
    const details = { id: this.User._id, item: products };
    this.http.post<any>(this.url, details);
  }
  updateProduct(products: any) {
    this.User = this.userService.getUser();
    this.product.next(products);
    const details = { id: this.User._id, item: products };
    this.http.post(`${this.url}/update`, details).subscribe((res: any) => {
      console.log('updated', res);
    });
  }

  public addToCart(prodct: any) {
    if (this.product._value.length > 0) {
      let productArr: any = [];
      productArr.push(prodct);

      productArr.forEach((productt: { id: any }) => {
        let found = this.product._value.find((product: any) => {
          return product.id == productt.id;
        });

        if (!found) {
          this.product._value.push(prodct);
        }
        this.wishservice.product._value.find((prod: any, i: any) => {
          if (prodct.id === prod.id) {
            return this.wishservice.removeFromWish(i);
          }
        });
      });
    } else {
      this.product._value.push(prodct);
    }
   
    this.setCartQuantity(this.product._value.length);
    const details = { id: this.User._id, item: this.product._value };
    this.http.post<any>(this.url, details).subscribe((resp) => {
      console.log(resp);
    });
  }

  getProducts() {
    this.User = this.userService.getUser();
    if (this.User) {
     
      let getUrl = `${this.url}?id=${this.User._id}`;
      let prod;
      this.http.get<any>(getUrl).subscribe((resp: any) => {
        prod = resp;
        if (prod.length > 0) {
          if (this.product._value.length > 0) {
            prod.forEach((productt: { id: any }) => {
              let found = this.product._value.find((product: any) => {
                return product.id == productt.id;
              });
              if (!found) {
                this.product._value.push(productt);
              }
            });
          } else {
            this.updateProduct(prod);
          }
        }
        this.setCartQuantity(this.product._value.length);
      });
      return true;
    } else {
     
      this.product._value.length = 0;
      this.setCartQuantity(this.product._value.length);
      return false;
    }
  }
  removeFromCart(i: any) {
    this.product._value.splice(i, 1);
    this.updateProduct(this.product._value);
    this.setCartQuantity(this.product._value.length);
  }
}
