import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  cartQuantity:any = 0
  constructor(private cartService:CartService
    ) { }
  openNav(){
    document.getElementById('mobileNav')?.classList.replace('hidden','flex');
    document.getElementById('ull')?.scrollBy()
  }
  closeNav(){
    document.getElementById('mobileNav')?.classList.replace('flex','hidden');
  }
  ngOnInit(): void {
    this.cartService.myValue$.subscribe((quantity:any)=>{
      this.cartQuantity = quantity
    })
  }

}
