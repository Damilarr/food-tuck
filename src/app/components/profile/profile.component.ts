import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthRegisterService } from 'src/app/services/auth-register.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { CartService } from 'src/app/services/cart.service';
import { WishListService } from 'src/app/services/wish-list.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  currentUser: any = '';
  toastText: any = '';
  picture: any;
  constructor(
    private user: AuthRegisterService,
    private router: Router,
    private cartService: CartService,
    private wishService: WishListService
  ) {}
  clicked(event: any) {
    let val = event.target.getAttribute('tab');
    if (val !== null) {
      let tabs = document?.querySelectorAll('.tab');
      let btns = document?.querySelectorAll('.btn');
      tabs?.forEach((element: any) => {
        element.classList.remove('active-tab');
      });
      btns?.forEach((element: any) => {
        element.classList.remove('active-button');
      });
      tabs[val - 1].classList.add('active-tab');
      btns[val - 1].classList.add('active-button');
    }
  }
  showToast() {
    document?.getElementById('myToast')?.classList.remove('hidden');
    setTimeout(function () {
      document?.getElementById('myToast')?.classList.add('hidden');
    }, 5000);
  }
  logout() {
    sessionStorage.clear();
    this.toastText = 'logout successful';
    document?.getElementById('toastBtn')?.click();
    this.cartService.getProducts();
    this.wishService.getProducts();
    setTimeout(() => {
      this.router.navigate(['/']);
    }, 3000);
  }
  ngOnInit(): void {
    window?.scrollTo(0, 0);
    document.querySelectorAll('#tabz .btn')?.forEach((element: any) => {
      element.addEventListener('click', this.clicked);
    });
    let one: HTMLElement = document.querySelector('#tabz span') as HTMLElement;
    one.click();
    this.currentUser = this.user.getUser();
    if (this.currentUser.picture != null) {
      this.picture = this.currentUser.picture;
    }
  }
}
