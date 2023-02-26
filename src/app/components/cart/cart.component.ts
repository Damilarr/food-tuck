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
  number:number=1
  constructor(private cartService:CartService) { }

  ngOnInit(): void {

    this.cartService.getProducts()
    this.cartService.myProductArray$.subscribe((prod: any) =>{
      console.log('cart comp',prod);
      this.PRODUCTS = prod
      this.grandTot()
    })
  console.log(this.PRODUCTS);

  }
  onDelete(i:any){
      this.cartService.removeFromCart(i);
  }
  check:any =[]
  grand: number= 0
  grandTot(){
    for (let index = 0; index < this.PRODUCTS.length; index++) {

        console.log(this.PRODUCTS[index].total);

      this.check.push(Number(this.PRODUCTS[index].total))


    this.grand = this.check.reduce((acc:any,red:any)=>{
      return acc+ red
        })

    }
    console.log(this.check, this.grand);
    this.check=[]

  }

  add(i:any){
   let b=this.PRODUCTS[i].quantity = this.PRODUCTS[i].quantity+1 ;

    this.PRODUCTS[i].total=(this.PRODUCTS[i].price*b)
   this.grandTot()
  }
  sub(i:any){
    if (this.PRODUCTS[i].quantity > 1) {
      let b=this.PRODUCTS[i].quantity = this.PRODUCTS[i].quantity-1 ;

      this.PRODUCTS[i].total=(this.PRODUCTS[i].price*b)
     this.grandTot()
    }
    }

}
