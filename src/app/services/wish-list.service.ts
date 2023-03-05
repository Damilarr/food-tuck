import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

  constructor() {

  }


  private product:any = new BehaviorSubject<string[]>([]);
  myProductArray$ = this.product.asObservable();

  private wishQuantity = new BehaviorSubject<number>(0);
  myValue$ = this.wishQuantity.asObservable();

  setWishQuantity(newValue:number){
    this.wishQuantity.next(newValue);

  }

  storeCart(products:any){
    localStorage.setItem('cart-items',JSON.stringify(products));
  }

  public addToWish(prodct:any){
    if (this.product._value.length > 0) {
      let productArr:any = []
      productArr.push(prodct)


      productArr.forEach((productt: { id: any; }) => {
        let found = this.product._value.find((product: any)=>{return product.id == productt.id })
        if (!found) {
          this.product._value.push(prodct, )
        }
      });
    }else{
      this.product._value.push(prodct)
    }
    this.setWishQuantity(this.product._value.length)
    localStorage.setItem('wish-items',JSON.stringify(this.product._value))
  }

  updateProduct(products:any){
    this.product.next(products);
    localStorage.removeItem('wish-items');
    localStorage.setItem('wish-items',JSON.stringify(products));
  }

  getProducts(){
    let prod = JSON.parse(localStorage.getItem('wish-items') || '{}' );
    
    console.log(this.product);

    if (prod.length > 0) {
      if (this.product._value.length > 0) {
        prod.forEach((productt: { id: any; }) => {
          let found = this.product._value.find((product: any)=>{return product.id == productt.id })
          if (!found) {
            this.product._value.push(productt)
          }
        });
      }else{
        this.updateProduct(prod)
      }
    }
    this.setWishQuantity(this.product._value.length)
  }
}
