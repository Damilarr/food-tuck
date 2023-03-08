import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { FoodsService } from 'src/app/services/foods.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
})
export class ShopComponent implements OnInit {
  PRODUCTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 8;
  tableSizes: any = [3, 6, 9, 12];
  toastText: any = '';
  foodType: string = 'best-foods';
  private foodSub: any;
  constructor(
    private foodService: FoodsService,
    private cartService: CartService,
    private wishService: WishListService
  ) {}
  ngOnInit(): void {
    window?.scrollTo(0,0)
    this.fetchFoods();
    document
      .getElementById('sort')
      ?.addEventListener('change', this.setFoodType);
  }
  setFoodType = (event: any) => {
    this.foodType = event.target.value;
    this.fetchFoods();
  };
  fetchFoods(): void {
    this.foodSub = this.foodService.getFoods(this.foodType).subscribe(
      (response) => {
        response.forEach(function (element: any) {
          element.quantity = 1;
          element.total = element.price;
        });
        this.PRODUCTS = response;
      },
      (error) => {}
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
  getFoodProduct(id: string) {
    let prod = this.PRODUCTS.find((product: any) => {
      return product.id == id;
    });
    // let wish = this
    this.cartService.addToCart(prod);

    this.toastText = `Successfully added ${prod.name} to cart`;
    this.showToast();
  }
  getWishListProduct(id: string) {

    let prod = this.PRODUCTS.find((product: any) => {
      return product.id == id;
    });

    this.wishService.addToWish(prod);

    this.toastText = `Successfully added ${prod.name} to Wish-list`;
    this.showToast();
  }
  ngOnDestroy(): void {
    this.foodSub.unsubscribe();
    document
      .getElementById('sort')
      ?.removeEventListener('change', this.setFoodType);
  }
  showToast() {
    document?.getElementById('myToast')?.classList.remove('hidden');
    setTimeout(function () {
      document?.getElementById('myToast')?.classList.add('hidden');
    }, 3000);
  }
}
