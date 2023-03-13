import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthRegisterService } from './auth-register.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http:HttpClient,private regService:AuthRegisterService) { }
  // product:any = []
  // private product  = new  BehaviorSubject<array>([]){

  // }
  url:any = 'http://localhost:3007/cart'
  user:any = this.regService.getUser()
  private product:any = new BehaviorSubject<string[]>([]);
  myProductArray$ = this.product.asObservable();

  private cartQuantity = new BehaviorSubject<number>(0);
  myValue$ = this.cartQuantity.asObservable();

  setCartQuantity(newValue:number){
    this.cartQuantity.next(newValue);
  }
  storeCart(products:any){
    localStorage.setItem('cart-items',JSON.stringify(products));
    console.log(products);
  }
  updateProduct(products:any){
    this.product.next(products);
    // localStorage.removeItem('cart-items');
    // localStorage.setItem('cart-items',JSON.stringify(products));
    let content = {_id:this.user._id,items:products}
    this.http.put<any>(this.url,content).subscribe(resp=>{console.log('putrespp',resp);});
  }
  public addToCart(prodct:any){
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
      this.product._value. push(prodct)
    }
    this.setCartQuantity(this.product._value.length)
    // localStorage.setItem('cart-items',JSON.stringify(this.product._value))
    let content = {_id:this.user._id,items:this.product._value}
    console.log('content',content);
    this.http.post<any>(this.url,content).subscribe(resp=>{console.log('respp',resp);});
  }
  async getProducts(){
   
    // let prod = JSON.parse(localStorage.getItem('cart-items') || '{}' );
    let prod:any;
    const userId = this.user._id
    const userIdd = {_id:userId}
    this.http.get<any>(this.url,userId).subscribe(resp => {
      console.log('getresp', resp);
      prod = resp;
    });
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
    this.setCartQuantity(this.product._value.length)
  }
  removeFromCart(i:any){
    this.product._value.splice(i,1)
    this.updateProduct(this.product._value)
    this.setCartQuantity(this.product._value.length)
  }
}
