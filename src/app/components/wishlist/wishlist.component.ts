import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  PRODUCTS: any = [];
  private productSub:any;
  constructor(
    private wishService: WishListService,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.wishService.getProducts()
    this.productSub = this.wishService.myProductArray$.subscribe((prod: any) => {
      this.PRODUCTS = prod;
    });
    console.log(this.wishService.myProductArray$);

  }
  moveToCart(id:any, i:any){

    let check = this.PRODUCTS.find((prod:any)=>{
      return prod.id == id
    })
   this.cartService.addToCart(check)

  this.remove(i)

  }
  remove(i:any){
    this.wishService.removeFromWish(i)
  }
}
