import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor() { }
  openNav(){
    document.getElementById('mobileNav')?.classList.replace('hidden','flex');
    document.getElementById('ull')?.scrollBy()
  }
  closeNav(){
    document.getElementById('mobileNav')?.classList.replace('flex','hidden');
  }
  ngOnInit(): void {
  }

}
