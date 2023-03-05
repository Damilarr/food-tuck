import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { WishListService } from 'src/app/services/wish-list.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartQuantity:any = 0
  wishQuantity:number=0
  private cartquant:any;
  private wishquant:any;
  constructor(private cartService:CartService, private wishService:WishListService
    ) { }
  openNav(){
    document.getElementById('mobileNav')?.classList.replace('hidden','flex');
    document.getElementById('ull')?.scrollBy()
  }
  closeNav(){
    document.getElementById('mobileNav')?.classList.replace('flex','hidden');
  }
  ngOnInit(): void {
    console.log(this.cartService.myValue$);

    this.cartService.getProducts()
    this.cartquant = this.cartService.myValue$.subscribe((quantity:any)=>{
      this.cartQuantity = quantity
    })

    console.log(this.wishService.myValue$);

    this.wishService.getProducts()
    this.wishquant = this.wishService.myValue$.subscribe((quantity:any)=>{
      this.wishQuantity = quantity
    })
  }
  ngOnDestroy(): void {
    this.cartquant.unsubscribe()

  }

}
