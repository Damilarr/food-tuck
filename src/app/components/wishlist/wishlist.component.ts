import { Component, OnInit } from '@angular/core';
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
    private wishService: WishListService
  ) { }

  ngOnInit(): void {
    this.wishService.getProducts()
    this.productSub = this.wishService.myProductArray$.subscribe((prod: any) => {
      this.PRODUCTS = prod;
    });
    console.log(this.wishService.myProductArray$);

  }
  
}
