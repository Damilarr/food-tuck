import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthRegisterService } from './auth-register.service';

@Injectable({
  providedIn: 'root',
})
export class WishListService {
  constructor(
    private userService: AuthRegisterService,
    private http: HttpClient
  ) {}

  public product: any = new BehaviorSubject<string[]>([]);
  myProductArray$ = this.product.asObservable();

  private wishQuantity = new BehaviorSubject<number>(0);
  myValue$ = this.wishQuantity.asObservable();
  url: any = `${environment.SERVER_URL}/wish-list`;
  User: any;
  setWishQuantity(newValue: number) {
    this.wishQuantity.next(newValue);
  }

  storeCart(products: any) {
    localStorage.setItem('cart-items', JSON.stringify(products));
  }

  public addToWish(prodct: any) {
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
      });
    } else {
      this.product._value.push(prodct);
    }
    this.setWishQuantity(this.product._value.length);
    this.User = this.userService.getUser();
    const details = { id: this.User._id, item: this.product._value };
    this.http.post<any>(this.url, details).subscribe((resp) => {
      console.log(resp);
    });
  }

  updateProduct(products: any) {
    this.User = this.userService.getUser();
    this.product.next(products);
    const details = { id: this.User._id, item: products };
    this.http.post(`${this.url}/update`, details).subscribe((res: any) => {
      console.log('updated', res);
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
        this.setWishQuantity(this.product._value.length);
      });
      return true;
    } else {
    
      this.product._value.length = 0;
      this.setWishQuantity(this.product._value.length);
      return false;
    }
    // let prod = JSON.parse(localStorage.getItem('wish-items') || '{}');
  }
  removeFromWish(i: any) {
    this.product._value.splice(i, 1);
    this.updateProduct(this.product._value);
    this.setWishQuantity(this.product._value.length);
  }
}
