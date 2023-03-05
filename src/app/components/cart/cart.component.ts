import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRegisterService } from 'src/app/services/auth-register.service';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  // items: Product[] = []
  PRODUCTS: any = [];
  number: number = 1;
  check: any = [];
  grand: number = 0;
  paymentHandler: any = null;
  currentUser: any = '';
  private productSub:any;
  private checkoutSub:any;
  constructor(
    private router: Router,
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private user: AuthRegisterService
  ) {}

  ngOnInit(): void {
    this.cartService.getProducts();
    this.productSub = this.cartService.myProductArray$.subscribe((prod: any) => {
      this.PRODUCTS = prod;
    });
    this.invokeStripe();
    this.currentUser = this.user.getUser();
    this.grandTot();
    console.log(this.cartService.myProductArray$);

  }
  onDelete(i: any) {
    this.grandTot()
    this.cartService.removeFromCart(i);
  }

  grandTot() {
    if(this.PRODUCTS.length != 0){
   for (let index = 0; index < this.PRODUCTS.length; index++) {
      this.check.push(Number(this.PRODUCTS[index].total));

       this.grand = this.check.reduce((acc: any, red: any) => {
      return acc + red;
    });

    // this.cartService.updateProduct(this.PRODUCTS);
    }
  // console.log(this.check);
  // console.log(this.grand);
  this.check = [];

  this.cartService.storeCart(this.PRODUCTS)
    }

  }

  add(i: any) {
    let b = (this.PRODUCTS[i].quantity = this.PRODUCTS[i].quantity + 1);

    this.PRODUCTS[i].total = this.PRODUCTS[i].price * b;
    this.grandTot();
  }
  sub(i: any) {
    if (this.PRODUCTS[i].quantity > 1) {
      let b = (this.PRODUCTS[i].quantity = this.PRODUCTS[i].quantity - 1);

      this.PRODUCTS[i].total = this.PRODUCTS[i].price * b;
      this.grandTot();
    }
  }
  checkOut(amount: number) {
   if (this.PRODUCTS.length != 0) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MftATCJPPAhstz08LDnTFwL7tRozpMUk3odNt6tlxOqJBhF8CcEii9VivImYPEhZ2eNP9UPzBpOmmulDstEYXS100xl8RIGUt',
      locale: 'auto',
      token: function (stripeToken: any) {
        paymentStripe(stripeToken);
      },
    });
    const paymentStripe = (stripeToken: any) => {
      this.checkoutSub = this.checkoutService.makePayment(stripeToken).subscribe((data: any) => {
        if (data) {
          this.router.navigate(['/payment-status', data]);
        }
      });
    };
    paymentHandler.open({
      name: this.currentUser.name,
      description: 'payment for product',
      amount: amount * 100,
    });
   }
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MftATCJPPAhstz08LDnTFwL7tRozpMUk3odNt6tlxOqJBhF8CcEii9VivImYPEhZ2eNP9UPzBpOmmulDstEYXS100xl8RIGUt',
          locale: 'auto',
          token: function (stripeToken: any) {
          },
        });
      };

      window.document.body.appendChild(script);
    }
  }
  ngOnDestroy():void{
  }
}
