import { Component, OnInit } from '@angular/core';
import { AuthRegisterService } from 'src/app/services/auth-register.service';
import { CartService } from 'src/app/services/cart.service';
import { FoodsService } from 'src/app/services/foods.service';
import { WishListService } from 'src/app/services/wish-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private snackBar: MatSnackBar,
    private foodService: FoodsService,
    private cartService: CartService,
    private wishService: WishListService,
    private userService: AuthRegisterService
  ) {}
  loginAlert(msg: string, action: string) {
    this.snackBar.open(msg, action);
  }
  ngOnInit(): void {
    window?.scrollTo(0, 0);
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
    let user = this.userService.getUser();
    if (user) {
      console.log('');
    } else {
      this.loginAlert('Please Login First', 'Ok');
      console.log('not signed In');
      return;
    }
    let prod = this.PRODUCTS.find((product: any) => {
      return product.id == id;
    });
    this.check(prod, this.wishService);
    this.cartService.addToCart(prod);

    this.toastText = `Successfully added ${prod.name} to cart`;
    this.showToast();
  }
  getWishListProduct(id: string) {
    let user = this.userService.getUser();
    if (user) {
      console.log('isSignedIn');
    } else {
      this.loginAlert('Please Login First', 'Ok');
     
      return;
    }
    let prod = this.PRODUCTS.find((product: any) => {
      return product.id == id;
    });
    this.check(prod, this.cartService);
    this.wishService.addToWish(prod);

    this.toastText = `Successfully added ${prod.name} to Wish-list`;
    this.showToast();
  }

  check(prodct: any, service: any) {
    let array = service.product._value;

    let seen = false;

    for (let index = 0; index < array.length; index++) {
      if (array[index].id === prodct.id) {
        seen = true;
        if (service === this.cartService) {
          service.removeFromCart(index);
        } else {
          service.removeFromWish(index);
        }

        setTimeout(() => {
          seen = false;
        }, 500);
      } else if (index === array.length - 1 && seen == false) {
        return;
      }
    }
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
