import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  // items: Product[] = []
  PRODUCTS: any = []
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts()
    this.cartService.myProductArray$.subscribe((prod: any) =>{
      console.log('cart comp',prod);
      this.PRODUCTS = prod
    })
     
  }
  onDelete(i:any){
      this.cartService.removeFromCart(i);
  }

}
