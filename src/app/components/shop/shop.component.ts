import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FoodsService } from 'src/app/services/foods.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  PRODUCTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;
  tableSizes: any = [3, 6, 9, 12];
  foodType:string = 'best-foods'
  constructor(private foodService: FoodsService,private cartService:CartService) {}
  ngOnInit(): void {

    this.fetchFoods();
    document.getElementById('sort')?.addEventListener('change',this.setFoodType)
  }
  setFoodType = (event:any) =>{
    this.foodType = event.target.value;
    this.fetchFoods()


  }
  fetchFoods(): void {
    this.foodService.getFoods(this.foodType).subscribe(
      (response) => {

        response.forEach(function (element:any) {
          element.quantity=1
          element.total= element.price

        });
          this.PRODUCTS = response;

      },
      (error) => {
        console.log(error);
      }
    );
  }
  onDataChange(event: any) {
    this.page = event;
    this.fetchFoods();
  }


  onSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchFoods();
  }
  getFoodProduct(id:string){
   let prod =  this.PRODUCTS.find((product: any)=>{return product.id == id })
   this.cartService.addToCart(prod)
   alert( `successfully added ${prod.name} to cart`)
  }

}
