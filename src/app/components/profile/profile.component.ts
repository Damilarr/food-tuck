import { Component, OnInit } from '@angular/core';
import { AuthRegisterService } from 'src/app/services/auth-register.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit { 
  currentUser:any = '' 
  constructor(private user:AuthRegisterService){}
  clicked(event:any){
    let val = event.target.getAttribute('tab');
    if (val !== null) {
      let tabs = document?.querySelectorAll('.tab');
      let btns = document?.querySelectorAll('.btn');
      tabs?.forEach((element: any) => {element.classList.remove('active-tab')});
      btns?.forEach((element: any) => {
        element.classList.remove('active-button');
      });
      tabs[val - 1].classList.add('active-tab');
      btns[val - 1].classList.add('active-button');
    }
  }
  ngOnInit(): void {
    document.querySelectorAll('#tabz .btn')?.forEach((element:any) => {
      element.addEventListener('click',this.clicked);
    });
    let one:HTMLElement = document.querySelector('#tabz span') as HTMLElement;
    one.click()
    this.currentUser = this.user.getUser()
  }
}
